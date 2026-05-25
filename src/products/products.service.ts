import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    async create(createProductDto: CreateProductDto) {
        const product =  this.productRepository.create(createProductDto);
        return await this.productRepository.save(product);
    }
    async getAll(): Promise<Product[]> {
        return await this.productRepository.find({});
    }
    async getById(id: number): Promise<Product | null> {
        return await this.productRepository.findOneBy({id});
    }
    async delete(id: number) {
        return await this.productRepository.delete({id});
    }
    async update(id: number, updateProductDto: UpdateProductDto) {
        return await this.productRepository.update(id, updateProductDto);
    }
    async getProductsByCategory(categoryId: number): Promise<Product[]> {
        return await this.productRepository.find({
            where: {
                categoryId,
            },
        });
    }
}
