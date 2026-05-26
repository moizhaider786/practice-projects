import { Component, OnInit, signal } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Category, CreateCategoryDto } from '../../../core/models/category.model';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [CommonModule, CategoryListComponent, CategoryFormComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent implements OnInit {
  categories = signal<Category[]>([]);
  showForm = false;
  editingCategory: Category | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => {
        this.categories.set(res.data || []);
      },
      error: (err) => console.error(err)
    });
  }

  onAddNew() {
    this.editingCategory = null;
    this.showForm = true;
  }

  onEdit(category: Category) {
    this.editingCategory = category;
    this.showForm = true;
  }

  onDelete(id: number) {
    this.categoryService.delete(id).subscribe({
      next: () => this.loadCategories(),
      error: (err) => console.error(err)
    });
  }

  onSave(event: {id?: number, data: CreateCategoryDto}) {
    if (event.id) {
      this.categoryService.update(event.id, event.data.name).subscribe({
        next: () => {
          this.showForm = false;
          this.loadCategories();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.categoryService.create(event.data).subscribe({
        next: () => {
          this.showForm = false;
          this.loadCategories();
        },
        error: (err) => console.error(err)
      });
    }
  }

  onCancel() {
    this.showForm = false;
    this.editingCategory = null;
  }
}
