export enum FormTypes {
    CREATE, 
    UPDATE
}

export type Expense  = {
    id: number,
    description: string,
    amount: number,
    category: string,
    date: Date
}