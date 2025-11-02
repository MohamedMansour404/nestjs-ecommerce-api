import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumberString, IsIn } from 'class-validator';

export class GetUsersQueryDto {
  @ApiPropertyOptional({
    description: 'Current page number (default: 1)',
    example: 1,
  })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiPropertyOptional({
    description: 'Number of items per page (default: 10)',
    example: 10,
  })
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Field used for sorting (default: name)',
    example: 'name',
  })
  @IsOptional()
  @IsString()
  sortField?: string;

  @ApiPropertyOptional({
    description: 'Sort direction (asc or desc)',
    enum: ['asc', 'desc'],
    example: 'asc',
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({
    description: 'Filter users by name (case-insensitive)',
    example: 'Mohamed',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter users by email (case-insensitive)',
    example: 'mohamed@gmail.com',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    description: 'Filter users by role',
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  role?: string;
}
