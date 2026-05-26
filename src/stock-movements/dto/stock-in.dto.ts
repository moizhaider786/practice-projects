import { StockMovementReason } from "src/types";
export class StockInDto {
    productId!: number;
    quantity!: number;
    unitPrice!: number;
    reason!: StockMovementReason;
    referenceNote?: string;
}