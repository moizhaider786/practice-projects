import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
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
    private readonly dataSource: DataSource
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

  async validateCategory(id: number): Promise<boolean> {
    const isFound = await this.categoryRepository.exists({
      where: { id },
    });
    return isFound;
  }

  async getChildCategories(parentId: number){
    return await this.dataSource.query(`
      WITH RECURSIVE category_path AS (
        SELECT id, name, parentId FROM category WHERE id = ?
        UNION ALL
        SELECT c.id, c.name, c.parentId FROM category c
        JOIN category_path cp ON cp.id = c.parentId
      )
      SELECT * FROM category_path;
      `,[parentId]);
  }
}
