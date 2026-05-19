import { ICartProduct } from "../interface/ICart.js"
import { Product } from "./Product.js"
import { CartTemplate } from "./CartTemplate.js";

export class Cart {
    private static cartInstance: Cart;
    private products: ICartProduct[] = [];
    private cartTemp = new CartTemplate(document.getElementById("cartItems") as HTMLElement);
    totalPrice: number = 0;
    totalProducts: number = 0;
    constructor(){
        if(Cart.cartInstance) return Cart.cartInstance;
        Cart.cartInstance = this;
    }
    addProduct(product: Product){
        const idx = this.products?.findIndex((p)=>p.id===product.id);
        this.totalPrice+=product.price;
        this.totalProducts+=1;
        if(idx>=0) {
            this.products[idx].quantity+=1;
            this.cartTemp.update(this.products[idx], Cart.cartInstance);
        }
        else {
            let cartProduct: ICartProduct = {...product, quantity:1};
            this.products.push(cartProduct);
            this.cartTemp.render(cartProduct, Cart.cartInstance);
        }
    }
    decreaseProduct(product: Product){
        const idx = this.products?.findIndex((p)=>p.id===product.id);
        this.products[idx].quantity-=1;
        this.totalPrice-=product.price;
        this.totalProducts-=1;
        if(this.products[idx].quantity===0) {
            this.cartTemp.remove(this.products[idx], Cart.cartInstance);
            this.products.splice(idx, 1)
        };
        this.cartTemp.update(this.products[idx], Cart.cartInstance);
    }
    removeProduct(product: Product){
        const idx = this.products?.findIndex((p)=>p.id===product.id);
        if(idx>=0){
            const cartProduct = this.products[idx];
            this.totalPrice-=(cartProduct.price*cartProduct.quantity);
            this.totalProducts-=cartProduct.quantity;
            this.cartTemp.remove(this.products[idx], Cart.cartInstance);
            this.products.splice(idx, 1)
        }
    }
    clearCart(){
        this.products = [];
        this.totalPrice = 0;
        this.totalProducts = 0;
    }
    checkout(){
        if(this.products.length<0) alert("No Products found to checkout");
        alert("Order placed Successfully");
    }
}