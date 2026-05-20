import { products } from "./data/products.js";
import { ProductTemplate } from "./classes/ProductTemplate.js";
import { Cart } from "./classes/Cart.js";
const cart = new Cart();
// Products Logic
const shopSection = document.querySelector('.shop-section');
const productsContainer = document.createElement('div');
productsContainer.className = 'product-grid';
const prodTemp = new ProductTemplate(productsContainer);
for (const product of products) {
    prodTemp.render(product);
}
shopSection.append(productsContainer);
// Cart Sidebar Logic
const cartSidebar = document.querySelector('.cart-sidebar');
const cartNavBtn = document.getElementById("cartToggle");
const cartOverlay = document.getElementById("cartOverlay");
const cartCloseBtn = document.getElementById("cartClose");
cartNavBtn.addEventListener('click', (event) => {
    cartSidebar.classList.add("open");
    cartOverlay.classList.add('active');
});
cartCloseBtn.addEventListener('click', (event) => {
    cartSidebar.classList.remove("open");
    cartOverlay.classList.remove('active');
});
// Cart Logic
const cartClearBtn = document.getElementById("clearCartBtn");
cartClearBtn.addEventListener('click', () => {
    cart.clearCart();
});
const cartCheckoutBtn = document.getElementById("checkoutBtn");
cartCheckoutBtn.addEventListener('click', () => {
    cart.checkout();
});
