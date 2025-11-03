import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsUrl,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GenderType } from 'src/utils/enums';

export class RegisterDto {
  @ApiProperty({ description: 'Name of the user', minLength: 3, maxLength: 30 })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    minLength: 6,
    maxLength: 20,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty({ description: 'Avatar URL', required: false })
  @IsUrl()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ description: 'Phone number (Egyptian)', required: false })
  @IsPhoneNumber('EG')
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Gender of the user',
    enum: GenderType,
    required: false,
  })
  @IsEnum(GenderType)
  @IsOptional()
  gender?: GenderType;
}
