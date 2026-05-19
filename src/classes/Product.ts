export class Product {
    private static counter = 1;
    readonly id: number
    readonly name: string
    readonly price: number
    readonly category: string
    readonly rating: number

    constructor(id: number, name: string, price: number, category: string, rating: number){
        this.id = Product.counter;
        Product.counter++;
        this.name = name;
        this.price = price;
        this.category = category;
        this.rating = rating;
    }
}