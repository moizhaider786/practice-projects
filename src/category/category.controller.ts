import { Controller, Post, Body, Get, NotFoundException, Delete, Param, Patch } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post()
    async create(@Body() createCategoryDto: CreateCategoryDto){
        const category = await this.categoryService.create(createCategoryDto);
        return {
            message: "Category created successfully",
            data: category
        };
    }
    
    @Get("getAll")
    async getAll(){
        const categories = await this.categoryService.getAll();
        if(!categories.length) throw new NotFoundException("Categories not found");
        return {
            message: "Categories found",
            data: categories
        }
    }

    @Delete(":id")
    async delete(@Param("id") id: number){
        const delCategory = await this.categoryService.delete(id);
        if(!delCategory.affected) throw new NotFoundException("Category not found.")
        return {message: "Category deleted successfully"};
    }

    @Patch(":id")
    async patch(@Param("id") id: number, @Body() updateCategoryDto:UpdateCategoryDto ){
        const category = await this.categoryService.update(id, updateCategoryDto.name);
        if(!category.affected) throw new NotFoundException("Category not found.");
        return {
            message: "Category updated successfully",
            data: category
        }
    }
}
