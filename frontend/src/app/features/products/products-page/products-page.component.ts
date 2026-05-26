import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { Product, CreateProductDto } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductListComponent, ProductFormComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  showForm = false;
  editingProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getAll().subscribe({
      next: (res) => {
        this.products = res.data || [];
      },
      error: (err) => console.error(err)
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => {
        this.categories = res.data || [];
      },
      error: (err) => console.error(err)
    });
  }

  onAddNew() {
    this.editingProduct = null;
    this.showForm = true;
  }

  onEdit(product: Product) {
    this.editingProduct = product;
    this.showForm = true;
  }

  onDelete(id: number) {
    this.productService.delete(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error(err)
    });
  }

  onSave(event: {id?: number, data: CreateProductDto}) {
    if (event.id) {
      this.productService.update(event.id, event.data).subscribe({
        next: () => {
          this.showForm = false;
          this.loadProducts();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.productService.create(event.data).subscribe({
        next: () => {
          this.showForm = false;
          this.loadProducts();
        },
        error: (err) => console.error(err)
      });
    }
  }

  onCancel() {
    this.showForm = false;
    this.editingProduct = null;
  }
}
