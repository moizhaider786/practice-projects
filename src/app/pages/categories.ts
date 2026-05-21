import { Component, signal } from '@angular/core';
import { CategoryForm } from '../components/category/category-form';
import { CategoryService } from '../services/category-service';
import { inject } from '@angular/core';
@Component({
  selector: 'app-categories',
  imports: [CategoryForm],
  template: `
    <main>
      <app-category-form></app-category-form>
      @for(category of categoryService.categories(); track $index){
        <li>
          <p>{{category}}</p>
          <button (click)="categoryService.deleteCategory(category)">Delete</button>
        </li>
      }
    </main>
  `,
  styles: ``,
})
export class Categories {
  categoryService = inject(CategoryService);
}
