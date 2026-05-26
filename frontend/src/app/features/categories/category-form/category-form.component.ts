import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Category, CreateCategoryDto } from '../../../core/models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit, OnChanges {
  @Input() categories: Category[] = [];
  @Input() editingCategory: Category | null = null;
  @Output() save = new EventEmitter<{id?: number, data: CreateCategoryDto}>();
  @Output() cancel = new EventEmitter<void>();

  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    if (this.categoryForm) {
      this.initForm();
    }
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: [this.editingCategory?.name || '', Validators.required],
      parentId: [this.editingCategory?.parentId || '']
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
        id: this.editingCategory?.id,
        data
      });
    }
  }
}
