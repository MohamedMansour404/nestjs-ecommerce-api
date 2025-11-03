import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserType } from 'src/utils/enums';
import { JWTPayloadType } from 'src/utils/types';
import { hashPassword, comparePassword } from 'src/utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

  // ---------------------------
  // JWT Helper
  // ---------------------------
  private async generateJWT(payload: JWTPayloadType) {
    return this.jwtService.signAsync(payload);
  }
}
