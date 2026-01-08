import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (category) throw new BadRequestException('Category already exists');

    const newCategory = this.categoryRepository.create(createCategoryDto);

    return await this.categoryRepository.save(newCategory);
  }

  async getAllCategories() {
    return this.categoryRepository.find();
  }

  async getOneCategory(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found!');

    return category;
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found!');

    if (updateCategoryDto.name) {
      const exists = await this.categoryRepository.findOne({
        where: { name: updateCategoryDto.name },
      });

      if (exists && exists.id !== id) {
        throw new BadRequestException('Category name already exists');
      }
    }

    Object.assign(category, updateCategoryDto);

    const updatedCategory = await this.categoryRepository.save(category);

    return updatedCategory;
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found!');

    await this.categoryRepository.remove(category);

    return {
      message: 'Category deleted successfully',
    };
  }
}
