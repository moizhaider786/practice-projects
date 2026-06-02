import { StockMovementType, StockMovementReason } from './types';
export interface StockMovement {
    id: number;
    productId: number;
    quantity: number;
    unitPrice: number;
    type: StockMovementType;
    reason: StockMovementReason;
    referenceNote?: string;
    movedAt: Date;
}

export interface StockMovementDto extends Omit<StockMovement, 'id' | 'movedAt'> {}