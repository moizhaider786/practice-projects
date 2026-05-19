import { products } from "./data/products.js";
import { ProductTemplate } from "./classes/ProductTemplate.js";
import { Cart } from "./classes/Cart.js";

// Products Logic
const shopSection = document.querySelector('.shop-section') as HTMLElement;

const productsContainer = document.createElement('div');
productsContainer.className = 'product-grid';

const prodTemp = new ProductTemplate(productsContainer);

for(const product of products){
    prodTemp.render(product);
}

shopSection.append(productsContainer);

// Cart Sidebar Logic
const cartSidebar = document.querySelector('.cart-sidebar') as HTMLElement;
const cartNavBtn = document.getElementById("cartToggle") as HTMLButtonElement;
const cartOverlay = document.getElementById("cartOverlay") as HTMLDivElement;
const cartCloseBtn = document.getElementById("cartClose") as HTMLButtonElement;


cartNavBtn.addEventListener('click', (event)=>{
    cartSidebar.classList.add("open")
    cartOverlay.classList.add('active')
});

cartCloseBtn.addEventListener('click', (event)=>{
    cartSidebar.classList.remove("open")
    cartOverlay.classList.remove('active')
})

// Core Cart Logic
