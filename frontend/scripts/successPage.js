(async () => {
  try {
    const getResponse = await fetch("http://localhost:5007/products");
    if (!getResponse.ok) throw new Error(`API error: ${getResponse.status}`);
    const productsJson = await getResponse.json();
    console.log(productsJson);
    const productInfo = document.querySelector("table[name='product_info']");
    
    const product = productsJson[productsJson.length - 1];
    const title = product.title;
    const description = product.description;
    const price = product.price;
    const inventory_count = product.inventory_Count;
    const newRow = document.createElement('tr');
    newRow.innerText = `title: ${title}, description: ${description}, price: ${price}, inventory_count: ${inventory_count}`;
    productInfo.appendChild(newRow);
    
  } catch (error) {
    console.error('Error loading products:', error);
  }
})();