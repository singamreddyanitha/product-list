document.addEventListener("DOMContentLoaded", function () {
    showProducts('Men'); // Show Men products by default
});

async function showProducts(category) {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = ''; // Clear previous products

    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();

        const categoryProducts = data.categories.find(cat => cat.category_name === category)?.category_products;

        if (categoryProducts) {
            categoryProducts.forEach(product => {
                const productCard = createProductCard(product);
                productContainer.appendChild(productCard);
            });
        } else {
            console.error('Category not found:', category);
        }
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;
    image.className = 'product-image';
    card.appendChild(image);

    if (product.badge_text) {
        const badge = document.createElement('div');
        badge.innerText = product.badge_text;
        badge.className = "offer";
        card.appendChild(badge);
    }

    const title = document.createElement('h3');
    title.innerText = product.title;
    title.className = "title";
    card.appendChild(title);

    const vendor = document.createElement('span');
    vendor.innerText = product.vendor;
    vendor.className = "span-vendor";
    title.appendChild(vendor);

    const price = document.createElement('p');
    price.innerText = 'Rs.' + product.price; 
    price.className = "price";
    card.appendChild(price);

    const comparePrice = document.createElement('span');
    comparePrice.innerText = 'Rs.' + product.compare_at_price;
    comparePrice.className = "compare-price";
    price.appendChild(comparePrice);

    const discount = document.createElement('span');
    discount.innerText =  ' 50% Off';
    discount.className = "discount"; 
    price.appendChild(discount);

    const addToCartButton = document.createElement('button');
    addToCartButton.innerText = 'Add to Cart';
    addToCartButton.className = "button-cart";
    card.appendChild(addToCartButton);

    return card;
}
