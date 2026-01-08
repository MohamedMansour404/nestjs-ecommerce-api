import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/sub-category.entity';
import { Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { Category } from 'src/Category/entities/category.entity';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { name: createSubCategoryDto.name },
    });
    if (subCategory)
      throw new BadRequestException(
        `${createSubCategoryDto.name} already exists`,
      );

    const category = await this.categoryRepository.findOne({
      where: { id: createSubCategoryDto.categoryId },
    });
    if (!category) throw new NotFoundException('Category Not Found!');

    const newSubCategory = this.subCategoryRepository.create({
      name: createSubCategoryDto.name,
      category: category,
    });

    return await this.subCategoryRepository.save(newSubCategory);
  }

  async getAllSubCategories() {
    return await this.subCategoryRepository.find({ relations: ['category'] });
  }

  async getOneSubCategory(id: number) {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }

    return subCategory;
  }

  async updateSubCategory(
    id: number,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }

    if (updateSubCategoryDto.name) {
      subCategory.name = updateSubCategoryDto.name;
    }

    if (updateSubCategoryDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateSubCategoryDto.categoryId },
      });

      if (!category) throw new NotFoundException('Category not found');

      subCategory.category = category;
    }

    return await this.subCategoryRepository.save(subCategory);
  }

  async deleteSubCategory(id: number) {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id },
    });

    if (!subCategory) {
      throw new NotFoundException('SubCategory not found');
    }

    await this.subCategoryRepository.remove(subCategory);

    return {
      message: 'SubCategory deleted successfully',
    };
  }
}
