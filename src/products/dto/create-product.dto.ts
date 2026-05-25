import { AmountUnit } from "src/types";
export class CreateProductDto {
    name!: string;
    sku!: string;
    categoryId!: number;
    unit!: AmountUnit;
    costPrice!: number;
    sellingPrice!: number;
    description?: string;
    reorderLevel?: number;
    isActive?: boolean;
}