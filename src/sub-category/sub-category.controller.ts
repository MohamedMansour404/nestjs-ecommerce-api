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
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { Roles } from 'src/shared/decorators/user-role.decorator';
import { UserType } from 'src/utils/enums';
import { AuthRolesGuard } from 'src/shared/guards/auth-roles.guard';

@Controller('sub-categories')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Post()
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  async createSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.createSubCategory(createSubCategoryDto);
  }

  @Get()
  async allSubCategories() {
    return await this.subCategoryService.getAllSubCategories();
  }

  @Get(':id')
  async getSubCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.subCategoryService.getOneSubCategory(id);
  }

  @Patch(':id')
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  async updateSubCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return await this.subCategoryService.updateSubCategory(
      id,
      updateSubCategoryDto,
    );
  }

  @Delete(':id')
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  async deleteSubCategory(@Param('id', ParseIntPipe) id: number) {
    return await this.subCategoryService.deleteSubCategory(id);
  }
}
