import { Renderable } from "../interface/UI.js";
import { ICartProduct } from "../interface/ICart.js";
import { CartItemActions } from "../enum/index.js";
import { Cart } from "./Cart.js";

export class CartTemplate implements Renderable<ICartProduct, Cart>{

    constructor(private container: HTMLElement){}
    render(element: ICartProduct, cart: Cart) {
        // Cart Nav
        const cartNavQty = document.getElementById("cartCount") as HTMLSpanElement;
        cartNavQty.innerText = cart.totalProducts.toString();

        // Cart Item
        const cartItemName = document.createElement("span");
        cartItemName.innerText = element.name;
        cartItemName.className = "cart-item-name";

        const cartItemPrice = document.createElement("span");
        cartItemPrice.innerText = element.price.toFixed(2).toString();
        cartItemPrice.className = "cart-item-price";

        const cartItemDetailsContainer = document.createElement("div");
        cartItemDetailsContainer.className = "cart-item-details";
        cartItemDetailsContainer.append(cartItemName, cartItemPrice);

        const decQuantityBtn = document.createElement("button");
        decQuantityBtn.innerText = "−";
        decQuantityBtn.className = "qty-btn";
        decQuantityBtn.setAttribute("data-id", element.id.toString());
        decQuantityBtn.setAttribute('data-action', CartItemActions.DECREASE.toString());
        decQuantityBtn.addEventListener('click', ()=>{
            cart.removeProduct(element)
        });

        const qtyValue = document.createElement("span");
        qtyValue.innerText = element.quantity.toString();
        qtyValue.setAttribute("data-id", element.id.toString());
        qtyValue.className = "qty-value";

        const incQuantityBtn = document.createElement("button");
        incQuantityBtn.innerText = "+";
        incQuantityBtn.className = "qty-btn";
        incQuantityBtn.setAttribute("data-id", element.id.toString());
        incQuantityBtn.setAttribute('data-action', CartItemActions.INCREASE.toString());
        incQuantityBtn.addEventListener('click', ()=>{
            cart.addProduct(element);
        });

        const removeItemBtn = document.createElement("button");
        removeItemBtn.innerText = "Remove";
        removeItemBtn.className = "btn-remove";
        removeItemBtn.setAttribute("data-id", element.id.toString());
        removeItemBtn.addEventListener('click', ()=>{});
        
        const qtyControlsContainer = document.createElement("div");
        qtyControlsContainer.className = "qty-controls";
        qtyControlsContainer.append(decQuantityBtn, qtyValue, incQuantityBtn)

        const controlsContainer = document.createElement("div");
        controlsContainer.className = "cart-item-controls";
        controlsContainer.append(qtyControlsContainer, removeItemBtn);

        const cartItem = document.createElement('div');
        cartItem.className = "cart-item";
        cartItem.setAttribute("data-id", element.id.toString())
        cartItem.append(cartItemDetailsContainer, controlsContainer);

        this.container.append(cartItem)
    }
    update(element: ICartProduct, cart: Cart) {
        const cartNavQty = document.getElementById("cartCount") as HTMLSpanElement;
        cartNavQty.innerText = cart.totalProducts.toString();

        const itemQtyVals = document.getElementsByClassName("qty-value") as HTMLCollectionOf<HTMLSpanElement>;
        for(const item of itemQtyVals){
            if(item.getAttribute("data-id")===element.id.toString()){
                item.innerText = cart.totalProducts.toString();
            }
        }
    }   

    remove(element: ICartProduct, cart: Cart) {
        const cartNavQty = document.getElementById("cartCount") as HTMLSpanElement;
        cartNavQty.innerText = cart.totalProducts.toString();

        const cartItems = document.getElementsByClassName("cart-item") as HTMLCollectionOf<HTMLDivElement>;
        for(const item of cartItems){
            if(item.getAttribute("data-id")===element.id.toString()){
                this.container.removeChild(item);
            }
        }
    }   
}