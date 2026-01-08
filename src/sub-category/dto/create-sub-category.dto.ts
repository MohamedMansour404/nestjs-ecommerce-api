import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNotEmpty()
  @IsString({ message: 'name must be a string' })
  @MinLength(3, { message: 'name must be at least 3 characters' })
  @MaxLength(30, { message: 'name must be at most 30 characters' })
  name: string;

  @IsNotEmpty()
  @IsInt()
  categoryId: number;
}
