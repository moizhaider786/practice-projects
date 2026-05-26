import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Category, CreateCategoryDto } from '../../../core/models/category.model';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  categories = input<Category[]>([]);
  editingCategory = input<Category | null>(null);
  save = output<{id?: number, data: CreateCategoryDto}>();
  cancel = output<void>();

  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    effect(() => {
      this.initForm();
    });
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: [this.editingCategory()?.name || '', Validators.required],
      parentId: [this.editingCategory()?.parentId || '']
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.value;
      const data: CreateCategoryDto = {
        name: formValue.name,
        parentId: formValue.parentId ? Number(formValue.parentId) : undefined
      };
      
      this.save.emit({
        id: this.editingCategory()?.id,
        data
      });
    }
  }
}
