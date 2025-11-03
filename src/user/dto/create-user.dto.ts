import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderType, UserType } from 'src/utils/enums';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of the user', minLength: 3, maxLength: 30 })
  @IsString({ message: 'Name must be a string' })
  @MinLength(3, { message: 'Name must be at least 3 characters' })
  @MaxLength(30, { message: 'Name must be at most 30 characters' })
  name: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    minLength: 3,
    maxLength: 20,
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(20, { message: 'Password must be at most 20 characters' })
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: UserType,
    required: true,
  })
  @IsEnum(UserType, { message: 'Role must be admin or user' })
  @IsNotEmpty()
  role: UserType;

  @ApiProperty({ description: 'Avatar URL', required: false })
  @IsString({ message: 'Avatar must be a string' })
  @IsUrl({}, { message: 'Avatar must be a valid URL' })
  @IsOptional()
  avatar?: string;

  @ApiProperty({ description: 'Age of the user', required: false })
  @IsNumber({}, { message: 'Age must be a number' })
  @IsOptional()
  age?: number;

  @ApiProperty({ description: 'Phone number of the user', required: false })
  @IsString({ message: 'Phone number must be a string' })
  @IsPhoneNumber('EG', {
    message: 'Phone number must be a valid Egyptian number',
  })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ description: 'Address of the user', required: false })
  @IsString({ message: 'Address must be a string' })
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'Active status', required: false })
  @IsBoolean({ message: 'Active must be a boolean' })
  @IsOptional()
  active?: boolean;

  @ApiProperty({
    description: 'Verification code',
    required: false,
    minLength: 6,
    maxLength: 6,
  })
  @IsString({ message: 'Verification code must be a string' })
  @Length(6, 6, { message: 'Verification code must be 6 characters' })
  @IsOptional()
  verificationCode?: string;

  @ApiProperty({
    description: 'Gender of the user',
    enum: GenderType,
    required: false,
  })
  @IsEnum(GenderType, { message: 'Gender must be male or female' })
  @IsOptional()
  gender?: string;
}
