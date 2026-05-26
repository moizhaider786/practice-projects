import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product, CreateProductDto } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { AmountUnit } from '../../../core/models/types';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  categories = input<Category[]>([]);
  editingProduct = input<Product | null>(null);
  save = output<{id?: number, data: CreateProductDto}>();
  cancel = output<void>();

  productForm!: FormGroup;
  units = Object.values(AmountUnit);

  constructor(private fb: FormBuilder) {
    effect(() => {
      console.log("categories in form", this.categories());
      this.initForm();
    });
  }

  initForm() {
    this.productForm = this.fb.group({
      name: [this.editingProduct()?.name || '', Validators.required],
      sku: [this.editingProduct()?.sku || '', Validators.required],
      categoryId: [this.editingProduct()?.categoryId || '', Validators.required],
      unit: [this.editingProduct()?.unit || '', Validators.required],
      costPrice: [this.editingProduct()?.costPrice || null, [Validators.required, Validators.min(0)]],
      sellingPrice: [this.editingProduct()?.sellingPrice || null, [Validators.required, Validators.min(0)]],
      description: [this.editingProduct()?.description || ''],
      reorderLevel: [this.editingProduct()?.reorderLevel || null, Validators.min(0)],
      isActive: [this.editingProduct()?.isActive ?? true]
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
        id: this.editingProduct()?.id,
        data
      });
    }
  }
}
