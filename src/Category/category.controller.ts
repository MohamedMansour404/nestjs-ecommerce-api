import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from 'src/shared/decorators/user-role.decorator';
import { UserType } from 'src/utils/enums';
import { AuthRolesGuard } from 'src/shared/guards/auth-roles.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  async createCategory(
    @Body()
    createCategoryDto: CreateCategoryDto,
  ) {
    const category =
      await this.categoryService.createCategory(createCategoryDto);

    return {
      message: 'Category created successfully',
      data: category,
    };
  }

  @Get()
  async getAllCategories() {
    const categories = await this.categoryService.getAllCategories();

    return {
      length: categories.length,
      data: categories,
    };
  }

  @Get(':id')
  async getOneCategory(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.getOneCategory(id);

    return {
      data: category,
    };
  }

  @Patch(':id')
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const updatedCategory = await this.categoryService.updateCategory(
      id,
      updateCategoryDto,
    );

    return {
      message: 'Category updated successfully',
      data: updatedCategory,
    };
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.categoryService.deleteCategory(id);
  }
}
