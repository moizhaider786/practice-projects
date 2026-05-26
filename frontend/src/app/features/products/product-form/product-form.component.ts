import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product, CreateProductDto } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { AmountUnit } from '../../../core/models/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() categories: Category[] = [];
  @Input() editingProduct: Product | null = null;
  @Output() save = new EventEmitter<{id?: number, data: CreateProductDto}>();
  @Output() cancel = new EventEmitter<void>();

  productForm!: FormGroup;
  units = Object.values(AmountUnit);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    if (this.productForm) {
      this.initForm();
    }
  }

  initForm() {
    this.productForm = this.fb.group({
      name: [this.editingProduct?.name || '', Validators.required],
      sku: [this.editingProduct?.sku || '', Validators.required],
      categoryId: [this.editingProduct?.categoryId || '', Validators.required],
      unit: [this.editingProduct?.unit || '', Validators.required],
      costPrice: [this.editingProduct?.costPrice || 0, [Validators.required, Validators.min(0)]],
      sellingPrice: [this.editingProduct?.sellingPrice || 0, [Validators.required, Validators.min(0)]],
      description: [this.editingProduct?.description || ''],
      reorderLevel: [this.editingProduct?.reorderLevel || 0, Validators.min(0)],
      isActive: [this.editingProduct?.isActive ?? true]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const data: CreateProductDto = {
        name: formValue.name,
        sku: formValue.sku,
        categoryId: Number(formValue.categoryId),
        unit: formValue.unit as AmountUnit,
        costPrice: Number(formValue.costPrice),
        sellingPrice: Number(formValue.sellingPrice),
        description: formValue.description,
        reorderLevel: Number(formValue.reorderLevel),
        isActive: formValue.isActive
      };
      
      this.save.emit({
        id: this.editingProduct?.id,
        data
      });
    }
  }
}
