export class ProductTemplate {
    constructor(container) {
        this.container = container;
    }
    render(product) {
        const name = document.createElement("h3");
        name.innerText = product.name;
        const price = document.createElement('span');
        price.innerText = product.price.toFixed(2).toString();
        const rating = document.createElement('span');
        rating.innerText = product.rating.toString();
        const cartButton = document.createElement('button');
        cartButton.setAttribute('data-id', product.id.toString());
        cartButton.innerText = 'Add to Cart';
        const metaContainer = document.createElement("div");
        metaContainer.append(price, rating);
        const prodContainer = document.createElement("article");
        prodContainer.className = 'product-card';
        prodContainer.append(name, metaContainer, cartButton);
        this.container.append(prodContainer);
    }
}
