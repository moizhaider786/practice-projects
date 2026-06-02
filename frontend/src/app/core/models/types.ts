export enum AmountUnit {
  PCS = 'pcs',
  KG = 'kg',
  G = 'g',
  LITRE = 'litre',
  ML = 'ml',
  BOX = 'box',
  DOZEN = 'dozen'
}

export enum StockMovementType {
    IN = 'IN',
    OUT = 'OUT'
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

export enum StockMovementReason {
    PURCHASE = 'PURCHASE',
    DAMAGED = 'DAMAGED',
    SALE = 'SALE',
    RETURN = 'RETURN',
    ADJUSTMENT = 'ADJUSTMENT'
}
