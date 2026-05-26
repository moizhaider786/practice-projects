import { AmountUnit } from './types';
import { Category } from './category.model';

export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  categoryId: number;
  category?: Category;
  unit: AmountUnit;
  costPrice: number;
  sellingPrice: number;
  reorderLevel: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductDto {
  name: string;
  sku: string;
  categoryId: number;
  unit: AmountUnit;
  costPrice: number;
  sellingPrice: number;
  description?: string;
  reorderLevel?: number;
  isActive?: boolean;
}
