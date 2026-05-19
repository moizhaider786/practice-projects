export class Product {
    constructor(id, name, price, category, rating) {
        this.id = Product.counter;
        Product.counter++;
        this.name = name;
        this.price = price;
        this.category = category;
        this.rating = rating;
    }
}
Product.counter = 1;
