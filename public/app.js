import { products } from "./data/products.js";
import { ProductTemplate } from "./classes/ProductTemplate.js";
const shopSection = document.querySelector('.shop-section');
console.log("shop section element ", shopSection);
const productsContainer = document.createElement('div');
productsContainer.className = 'product-grid';
const prodTemp = new ProductTemplate(productsContainer);
for (const product of products) {
    prodTemp.render(product);
}
shopSection === null || shopSection === void 0 ? void 0 : shopSection.append(productsContainer);
