export class ProductTemplate {
    constructor(container) {
        this.container = container;
    }
    render(product) {
        const name = document.createElement("h3");
        name.className = "product-name";
        name.innerText = product.name;
        const price = document.createElement('span');
        price.className = "product-price";
        price.innerText = product.price.toFixed(2).toString();
        const rating = document.createElement('span');
        rating.className = "product-rating";
        rating.innerText = product.rating.toString();
        const cartButton = document.createElement('button');
        cartButton.className = "btn-add";
        cartButton.setAttribute('data-id', product.id.toString());
        cartButton.innerText = 'Add to Cart';
        cartButton.addEventListener('click', () => {
        });
        const metaContainer = document.createElement("div");
        metaContainer.className = "product-meta";
        metaContainer.append(price, rating);
        const infoContainer = document.createElement("div");
        infoContainer.className = "product-info";
        infoContainer.append(name, metaContainer, cartButton);
        const prodContainer = document.createElement("article");
        prodContainer.className = 'product-card';
        prodContainer.append(infoContainer);
        this.container.append(prodContainer);
    }
}
