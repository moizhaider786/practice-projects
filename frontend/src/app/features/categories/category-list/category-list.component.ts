import { Component, EventEmitter, input, output } from '@angular/core';
import { Category } from '../../../core/models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories = input<Category[]>();
  edit = output<Category>();
  delete = output<number>();
  counter: number = 0;

  addCounter(){
    this.counter++;
  }

  onEdit(category: Category) {
    this.edit.emit(category);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.delete.emit(id);
    }
  }

  getParentName(parentId: number | null): string {
    if (!parentId) return 'None';
    const parent = this.categories()?.find(c => c.id === parentId) || undefined;
    return parent ? parent.name : 'Unknown';
  }
}
