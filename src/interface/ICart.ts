import { Product } from "../classes/Product.js"

export interface ICartProduct extends Product {
    quantity: number
}
