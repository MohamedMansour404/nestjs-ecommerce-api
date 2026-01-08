import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
export class VerifyCodeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  code: string;
}
export class ChangePasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Length(6, 6, { message: 'Verification code must be exactly 6 digits' })
  code: string;
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  newPassword: string;
}
