const productsGrid = document.querySelector('.products-grid');
const emptyMessage = document.querySelector('#products .empty-message');

async function loadProducts() {
    try {
        const response = await fetch('http://localhost:5007/products');
        if (!response.ok) throw new Error(`Failed to load products: ${response.status}`);

        const products = await response.json();
        productsGrid.innerHTML = '';

        if (products.length === 0) {
            emptyMessage.textContent = 'No products are available right now.';
            return;
        }

        emptyMessage.style.display = 'none';

        for (const product of products) {
            const card = document.createElement('article');
            card.className = 'card-item';
            card.innerHTML = `
                <h4>${product.title}</h4>
                <p>${product.description}</p>
                <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                <p><strong>Inventory:</strong> ${product.inventory_Count}</p>
            `;
            productsGrid.appendChild(card);
        }
    } catch (error) {
        console.error(error);
        productsGrid.innerHTML = '';
        emptyMessage.textContent = 'Unable to load products at this time.';
    }
}

loadProducts();