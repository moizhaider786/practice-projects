import { Component, input, output } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products = input<Product[]>([]);
  edit = output<Product>();
  delete = output<number>();
  openStockForm = output<Product>();

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.delete.emit(id);
    }
  }
}
