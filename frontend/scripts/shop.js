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
            const inventoryLabel = product.inventory_Count > 0 ? product.inventory_Count : 'Sold out';
            card.innerHTML = `
                <h4>${product.title}</h4>
                <p>${product.description}</p>
                <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                <p><strong>Inventory:</strong> ${inventoryLabel}</p>
            `;

            const purchaseButton = document.createElement('button');
            purchaseButton.textContent = product.inventory_Count > 0 ? 'Purchase' : 'Sold Out';
            purchaseButton.disabled = product.inventory_Count <= 0;
            purchaseButton.addEventListener('click', () => {
                window.location.href = `purchase.html?productId=${encodeURIComponent(product.id)}`;
            });

            card.appendChild(purchaseButton);
            productsGrid.appendChild(card);
        }
    } catch (error) {
        console.error(error);
        productsGrid.innerHTML = '';
        emptyMessage.textContent = 'Unable to load products at this time.';
    }
}

loadProducts();