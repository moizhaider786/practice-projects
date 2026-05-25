import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteResult } from 'typeorm/browser';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find({});
  }

  async delete(id: number): Promise<DeleteResult> {
    const category: DeleteResult = await this.categoryRepository.delete({
      id,
    });
    return category;
  }

  async update(id: number, name: string): Promise<UpdateResult> {
    return await this.categoryRepository.update(id, {
      name,
    });
  }
}
