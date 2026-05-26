import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() products: Product[] = [];
  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<number>();

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.delete.emit(id);
    }
  }
}
