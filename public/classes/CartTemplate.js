import { CartItemActions } from "../enum/index.js";
export class CartTemplate {
    constructor(container) {
        this.container = container;
    }
    render(element, cart) {
        // Cart Nav
        const cartNavQty = document.getElementById("cartCount");
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
        decQuantityBtn.addEventListener('click', () => {
            cart.decreaseProduct(element);
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
        incQuantityBtn.addEventListener('click', () => {
            cart.addProduct(element);
        });
        const removeItemBtn = document.createElement("button");
        removeItemBtn.innerText = "Remove";
        removeItemBtn.className = "btn-remove";
        removeItemBtn.setAttribute("data-id", element.id.toString());
        removeItemBtn.addEventListener('click', () => {
            cart.removeProduct(element);
        });
        const qtyControlsContainer = document.createElement("div");
        qtyControlsContainer.className = "qty-controls";
        qtyControlsContainer.append(decQuantityBtn, qtyValue, incQuantityBtn);
        const controlsContainer = document.createElement("div");
        controlsContainer.className = "cart-item-controls";
        controlsContainer.append(qtyControlsContainer, removeItemBtn);
        const cartItem = document.createElement('div');
        cartItem.className = "cart-item";
        cartItem.setAttribute("data-id", element.id.toString());
        cartItem.append(cartItemDetailsContainer, controlsContainer);
        this.container.append(cartItem);
    }
    update(element, cart) {
        const cartNavQty = document.getElementById("cartCount");
        cartNavQty.innerText = cart.totalProducts.toString();
        const itemQtyVals = document.getElementsByClassName("qty-value");
        for (const item of itemQtyVals) {
            if (item.getAttribute("data-id") === element.id.toString()) {
                item.innerText = element.quantity.toString();
            }
        }
    }
    remove(element, cart) {
        const cartNavQty = document.getElementById("cartCount");
        cartNavQty.innerText = cart.totalProducts.toString();
        const cartItems = document.getElementsByClassName("cart-item");
        for (const item of cartItems) {
            if (item.getAttribute("data-id") === element.id.toString()) {
                this.container.removeChild(item);
            }
        }
    }
}
