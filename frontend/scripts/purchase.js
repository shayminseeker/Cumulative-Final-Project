const params = new URLSearchParams(window.location.search);
const productId = params.get('productId');
const titleEl = document.getElementById('product-title');
const descriptionEl = document.getElementById('product-description');
const priceEl = document.getElementById('product-price');
const inventoryEl = document.getElementById('product-inventory');
const form = document.getElementById('purchase-form');
const quantityInput = document.getElementById('quantity');
const messageEl = document.getElementById('purchase-message');

let currentInventory = 0;

async function loadProduct() {
    if (!productId) {
        titleEl.textContent = 'No product selected';
        form.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`http://localhost:5007/products/${encodeURIComponent(productId)}`);
        if (!response.ok) {
            titleEl.textContent = 'Unable to load product';
            form.style.display = 'none';
            return;
        }

        const product = await response.json();
        titleEl.textContent = product.title || 'Untitled product';
        descriptionEl.textContent = product.description || '';
        priceEl.textContent = product.price?.toFixed(2) ?? '0.00';
        currentInventory = product.inventory_Count ?? 0;
        inventoryEl.textContent = currentInventory;

        if (currentInventory <= 0) {
            form.querySelector('button').textContent = 'Sold Out';
            form.querySelector('button').disabled = true;
            quantityInput.disabled = true;
            quantityInput.value = 0;
            messageEl.textContent = 'This product is sold out.';
            return;
        }

        quantityInput.max = currentInventory;
        quantityInput.value = 1;
        messageEl.textContent = '';
    } catch (error) {
        titleEl.textContent = 'Unable to load product';
        form.style.display = 'none';
        console.error(error);
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const quantity = parseInt(quantityInput.value, 10);
    if (!quantity || quantity < 1) {
        messageEl.textContent = 'Please enter a valid quantity.';
        return;
    }

    if (quantity > currentInventory) {
        messageEl.textContent = `Only ${currentInventory} item${currentInventory === 1 ? '' : 's'} available.`;
        quantityInput.value = currentInventory;
        return;
    }

    try {
        const response = await fetch(`http://localhost:5007/products/${encodeURIComponent(productId)}/purchase`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            messageEl.textContent = errorData?.message || 'Unable to complete purchase.';
            return;
        }

        const updatedProduct = await response.json();
        currentInventory = updatedProduct.inventory_Count ?? 0;
        inventoryEl.textContent = currentInventory;
        messageEl.textContent = `Purchase complete! ${quantity} item${quantity === 1 ? '' : 's'} bought.`;

        if (currentInventory <= 0) {
            form.querySelector('button').textContent = 'Sold Out';
            form.querySelector('button').disabled = true;
            quantityInput.disabled = true;
        } else {
            quantityInput.max = currentInventory;
            quantityInput.value = 1;
        }
    } catch (error) {
        messageEl.textContent = 'Unable to complete purchase. Please try again.';
        console.error(error);
    }
});

loadProduct();
