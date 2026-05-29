import { StockMovementReason } from "src/types";
export class StockMovementDto {
    productId!: number;
    quantity!: number;
    unitPrice!: number;
    reason!: StockMovementReason;
    referenceNote?: string;
}