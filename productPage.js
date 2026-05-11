(async () => {
  try {
    const getResponse = await fetch("http://localhost:5007/products");
    if (!getResponse.ok) throw new Error(`API error: ${getResponse.status}`);
    const productsJson = await getResponse.json();
    const productList = document.querySelector("ul[name=product_list]");
    
    for(let i = 0; i < productsJson.length; i++){
      const product = productsJson[i];
      const title = product.title;
      const description = product.description;
      const price = product.price;
      const inventory_count = product.inventory_Count;
      const newLi = document.createElement("li");
      newLi.innerText = `title: ${title}, description: ${description},price: ${price},inventory_count: ${inventory_count}`;
      productList.appendChild(newLi);
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
})();

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    console.log(formData.get("inventory_count"));
    const body = {
        Title: formData.get("title"),
        Description: formData.get("description"),
        Price: parseFloat(formData.get("price")),
        Inventory_Count: formData.get("inventory_count")
    }
    try {
      const response = await fetch("http://localhost:5007/products",{
          method: "POST",
          headers: {
              "Content-type": "application/json"
          },
          body: JSON.stringify(body),
      });
      if (response.ok) {
        console.log("Worked");
        window.location.href = "/ProductDisplay";
      } else {
        console.error('POST error:', response.status);
      }
    } catch (error) {
      console.error('Error posting product:', error);
    }

    const card = document.querySelector("card");
    
});

// async function loadProducts() {
//   try {
//     const response = await fetch("http://localhost:5007/products");
//     console.log("are u working?")
//     if (!response.ok) throw new Error(`API error: ${response.status}`);
    
//     const products = await response.json();
//     const productGrid = document.getElementById("product-grid");
    
    
//     productGrid.innerHTML = "";
    
   
//     products.forEach(product => {
//       const card = document.createElement("div");
//       card.className = "product-card";
      
//       card.innerHTML = `
//         <div class="card-header">
//           <h3>${product.title}</h3>
//         </div>
//         <div class="card-body">
//           <p class="description">${product.description}</p>
//           <p class="price">$${parseFloat(product.price).toFixed(2)}</p>
//           <p class="inventory">In Stock: ${product.inventory_Count}</p>
//         </div>
//         <div class="card-footer">
//           <button class="btn-add-to-cart" data-id="${product.id}">Add to Cart</button>
//         </div>
//       `;
      
//       productGrid.appendChild(card);
//     });
    
//   } catch (error) {
//     console.error('Error loading products:', error);
//     document.getElementById("product-grid").innerHTML = `
//       <p class="error-message">Failed to load products. Please try again later.</p>
//     `;
//   }
// }

// // Load products when page loads
// document.addEventListener("DOMContentLoaded", loadProducts);
