import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { CategoryService } from '../../services/category-service';
@Component({
  selector: 'app-category-form',
  imports: [FormsModule],
  template: `
      <label for="category"></label>
      <input id="category" type="text" [(ngModel)]="category" required minlength="3" #categoryVar="ngModel">
      @if(categoryVar.invalid && (categoryVar.dirty || categoryVar.touched)){
        @if(categoryVar.hasError('required')){
          <p>Category is Required</p>
        }
        @if(categoryVar.hasError('minlength')){
          <p>Minimum 3 length required</p>
        }
      }

      <button (click)="categoryService.addCategory(category)">Add</button>
  `,
  styles: ``,
})
export class CategoryForm {
  categoryService = inject(CategoryService);
  category: string = ''

}
