function sortProducts(products, sortType) {
	const sortedProducts = [...products];

	switch (sortType) {
		case "titleAsc":
			sortedProducts.sort((previous, current) => {
				if (previous.title < current.title) {
					return -1;
				} else if (previous.title > current.title) {
					return 1;
				}
				return 0;
			});
			break;
		case "priceAsc":
			sortedProducts.sort((previous, current) => {
				if (previous.price < current.price) {
					return -1;
				} else if (previous.price > current.price) {
					return 1;
				}
				return 0;
			});
			break;
		case "priceDesc":
			sortedProducts.sort((previous, current) => {
				if (previous.price > current.price) {
					return -1;
				} else if (previous.price < current.price) {
					return 1;
				}
				return 0;
			});
			break;
		case "inventoryAsc":
			sortedProducts.sort((previous, current) => {
				if (previous.inventory_count < current.inventory_count) {
					return -1;
				} else if (previous.inventory_count > current.inventory_count) {
					return 1;
				}
				return 0;
			});
			break;
	}

	return sortedProducts;
}
module.exports = sortProducts;
