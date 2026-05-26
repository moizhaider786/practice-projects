import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CategoryService } from 'src/category/category.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    if (
      !(await this.categoryService.validateCategory(
        createProductDto.categoryId,
      ))
    ) {
      throw new NotFoundException('Category not found.');
    }
    const product = await this.productsService.create(createProductDto);
    return {
      message: 'Product created successfully',
      data: product,
    };
  }
  @Get('')
  async getAll() {
    const products = await this.productsService.getAll();
    if (!products.length) throw new NotFoundException('No Proudcts found!');
    return {
      message: 'Products fetched successfully',
      data: products,
    };
  }
  @Get(':id')
  async getById(@Param('id') id: number) {
    const product = await this.productsService.getById(id);
    if (!product) throw new NotFoundException('No Proudcts found!');
    return {
      message: 'Product fetched successfully',
      data: product,
    };
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const delRes = await this.productsService.delete(id);
    if (!delRes.affected) throw new NotFoundException('Product not found.');
    return {
      message: 'Product deleted successfully',
    };
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: CreateProductDto,
  ) {
    if (
      updateProductDto.categoryId &&
      !(await this.categoryService.validateCategory(
        updateProductDto.categoryId,
      ))
    ) {
      throw new NotFoundException('Category not found.');
    }
    const updateRes = await this.productsService.update(id, updateProductDto);
    if (!updateRes.affected) throw new NotFoundException('Product not found.');
    return {
      message: 'Product updated successfully',
    };
  }
  @Get('/category/:categoryId')
  async getProductsByCategory(@Param('categoryId') categoryId: number) {
    const products =
      await this.productsService.getProductsByCategory(categoryId);
    if (!products.length) throw new NotFoundException('No Proudcts found!');
    return {
      message: 'Products fetched successfully',
      data: products,
    };
  }
}
