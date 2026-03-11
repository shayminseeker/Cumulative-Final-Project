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
      const newLi = document.createElement("li");
      newLi.innerText = `title: ${title}, description: ${description},price: ${price}`;
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
    const body = {
        Title: formData.get("title"),
        Description: formData.get("description"),
        Price: parseFloat(formData.get("price")),
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
        location.reload();
      } else {
        console.error('POST error:', response.status);
      }
    } catch (error) {
      console.error('Error posting product:', error);
    }
});