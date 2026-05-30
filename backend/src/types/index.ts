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

export enum StockMovementReason {
    PURCHASE = 'PURCHASE',
    DAMAGED = 'DAMAGED',
    SALE = 'SALE',
    RETURN = 'RETURN',
    ADJUSTMENT = 'ADJUSTMENT'
}

export enum AlertType {
    REORDER_LEVEL = 'REORDER_LEVEL',
    STOCK_OUT = 'STOCK_OUT'
}