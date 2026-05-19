import { CartTemplate } from "./CartTemplate.js";
export class Cart {
    constructor() {
        this.products = [];
        this.cartTemp = new CartTemplate(document.getElementById("cartItems"));
        this.totalPrice = 0;
        this.totalProducts = 0;
        if (Cart.cartInstance)
            return Cart.cartInstance;
        Cart.cartInstance = this;
    }
    addProduct(product) {
        var _a;
        const idx = (_a = this.products) === null || _a === void 0 ? void 0 : _a.findIndex((p) => p.id === product.id);
        this.totalPrice += product.price;
        this.totalProducts += 1;
        if (idx >= 0) {
            this.products[idx].quantity += 1;
            this.cartTemp.update(this.products[idx], Cart.cartInstance);
        }
        else {
            let cartProduct = Object.assign(Object.assign({}, product), { quantity: 1 });
            this.products.push(cartProduct);
            this.cartTemp.render(cartProduct, Cart.cartInstance);
        }
    }
    removeProduct(product) {
        var _a;
        const idx = (_a = this.products) === null || _a === void 0 ? void 0 : _a.findIndex((p) => p.id === product.id);
        this.products[idx].quantity -= 1;
        this.totalPrice -= product.price;
        this.totalProducts -= 1;
        if (this.products[idx].quantity === 0) {
            this.cartTemp.remove(this.products[idx], Cart.cartInstance);
            this.products.splice(idx, 1);
        }
        ;
        this.cartTemp.update(this.products[idx], Cart.cartInstance);
    }
    clearCart() {
        this.products = [];
        this.totalPrice = 0;
        this.totalProducts = 0;
    }
    checkout() {
        if (this.products.length < 0)
            alert("No Products found to checkout");
        alert("Order placed Successfully");
    }
}
