import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {
  ChangePasswordDto,
  ResetPasswordDto,
  VerifyCodeDto,
} from './dto/password-reset.dto';
import { UserType } from 'src/utils/enums';
import { JWTPayloadType } from 'src/utils/types';
import { hashPassword, comparePassword } from 'src/utils/hash';
import { MailerService } from '@nestjs-modules/mailer';
import { resetPasswordTemplate } from 'src/templates/reset-password.template';
import { randomInt } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,
  ) {}

  // ---------------------------
  // REGISTER
  // ---------------------------
  async register(registerDto: RegisterDto) {
    const user = await this.userService.createUser({
      ...registerDto,
      role: UserType.USER, // default role
    });

    const accessToken = await this.generateJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return {
      message: 'User registered successfully',
      user,
      accessToken,
    };
  }

  // ---------------------------
  // LOGIN
  // ---------------------------
  async login(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const accessToken = await this.generateJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return {
      message: 'Login successful',
      accessToken,
      user,
    };
  }

  async resetPassword({ email }: ResetPasswordDto) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return {
        status: 200,
        message: 'If this email is registered, a reset code has been sent.',
      };
    }

    const code = randomInt(0, 1000000).toString().padStart(6, '0');

    await this.userService.setVerificationCode(email, code);

    const htmlMessage = resetPasswordTemplate(code, new Date().getFullYear());

    await this.mailService.sendMail({
      to: email,
      subject: 'Reset Password Code',
      html: htmlMessage,
    });

    return {
      status: 200,
      message: 'If this email is registered, a reset code has been sent.',
    };
  }

  async verifyResetCode(verifyCodeDto: VerifyCodeDto) {
    await this.userService.verifyResetCode(
      verifyCodeDto.email,
      verifyCodeDto.code,
    );

    return {
      message: 'Code is valid',
    };
  }

  async changePassword({ email, code, newPassword }: ChangePasswordDto) {
    const user = await this.userService.verifyResetCode(email, code);

    await this.userService.updateUser(user.id, {
      password: newPassword,
    });

    await this.userService.clearVerificationCode(user.id);

    return {
      message: 'password changed successfully',
    };
  }

  // ---------------------------
  // JWT Helper
  // ---------------------------
  private async generateJWT(payload: JWTPayloadType) {
    return this.jwtService.signAsync(payload);
  }
}
