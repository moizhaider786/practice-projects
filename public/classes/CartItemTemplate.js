import { CartItemActions } from "../enum/index.js";
export class RenderCart {
    constructor(container) {
        this.container = container;
    }
    render(element) {
        console.log(this.container);
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
        decQuantityBtn.addEventListener('click', () => { });
        const qtyValue = document.createElement("span");
        qtyValue.innerText = element.quantity.toString();
        qtyValue.className = "qty-value";
        const incQuantityBtn = document.createElement("button");
        incQuantityBtn.innerText = "+";
        incQuantityBtn.className = "qty-btn";
        incQuantityBtn.setAttribute("data-id", element.id.toString());
        incQuantityBtn.setAttribute('data-action', CartItemActions.INCREASE.toString());
        incQuantityBtn.addEventListener('click', () => { });
        const removeItemBtn = document.createElement("button");
        removeItemBtn.innerText = "Remove";
        removeItemBtn.className = "btn-remove";
        removeItemBtn.setAttribute("data-id", element.id.toString());
        removeItemBtn.addEventListener('click', () => { });
        const qtyControlsContainer = document.createElement("div");
        qtyControlsContainer.className = "qty-controls";
        qtyControlsContainer.append(decQuantityBtn, qtyValue, incQuantityBtn);
        const controlsContainer = document.createElement("div");
        controlsContainer.className = "cart-item-controls";
        controlsContainer.append(qtyControlsContainer, removeItemBtn);
        const cartItem = document.createElement('div');
        cartItem.className = "cart-item";
        cartItem.append(cartItemDetailsContainer, controlsContainer);
        this.container.append(cartItem);
    }
    update(element) {
    }
}
