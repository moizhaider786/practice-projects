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
    IN = 'in',
    OUT = 'out'
}

export enum StockMovementReason {
    PURCHASE = 'purchase',
    DAMAGED = 'damaged',
    SALE = 'sale',
    RETURN = 'return',
    ADJUSTMENT = 'adjustment'
}