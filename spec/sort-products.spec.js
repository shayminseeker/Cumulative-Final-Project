const sortProducts = require("../util/sort-products");

describe("sortProducts", () => {
	const unsortedProducts = [
		{ title: "Rocket Ship", description: "Super Fast!", price: 10, inventory_count: 5 },
		{
			title: "Skateboard",
			description: "Rides with ease",
			price: 20,
			inventory_count: 10,
		},
		{ title: "Toy Truck", description: "So fun!", price: 15, inventory_count: 8 },
	];

	it("sorts products by title alphabetically", () => {
		const expectedSorting = [
			{ title: "Rocket Ship", description: "Super Fast!", price: 10, inventory_count: 5 },
			{
				title: "Skateboard",
				description: "Rides with ease",
				price: 20,
				inventory_count: 10,
			},
			{ title: "Toy Truck", description: "So fun!", price: 15, inventory_count: 8 },
		];

		const actualSorting = sortProducts(unsortedProducts, "titleAsc");
		expect(actualSorting).toEqual(expectedSorting);
	});

	it("sorts products by increasing price", () => {
		const expectedSorting = [
			{ title: "Rocket Ship", description: "Super Fast!", price: 10, inventory_count: 5 },
			{ title: "Toy Truck", description: "So fun!", price: 15, inventory_count: 8 },
			{
				title: "Skateboard",
				description: "Rides with ease",
				price: 20,
				inventory_count: 10,
			},
		];

		const actualSorting = sortProducts(unsortedProducts, "priceAsc");
		expect(actualSorting).toEqual(expectedSorting);
	});

	it("sorts products by decreasing price", () => {
		const expectedSorting = [
			{
				title: "Skateboard",
				description: "Rides with ease",
				price: 20,
				inventory_count: 10,
			},
			{ title: "Toy Truck", description: "So fun!", price: 15, inventory_count: 8 },
			{ title: "Rocket Ship", description: "Super Fast!", price: 10, inventory_count: 5 },
		];

		const actualSorting = sortProducts(unsortedProducts, "priceDesc");
		expect(actualSorting).toEqual(expectedSorting);
	});

	it("sorts products by increasing inventory count", () => {
		const expectedSorting = [
			{ title: "Rocket Ship", description: "Super Fast!", price: 10, inventory_count: 5 },
			{ title: "Toy Truck", description: "So fun!", price: 15, inventory_count: 8 },
			{
				title: "Skateboard",
				description: "Rides with ease",
				price: 20,
				inventory_count: 10,
			},
		];

		const actualSorting = sortProducts(unsortedProducts, "inventoryAsc");
		expect(actualSorting).toEqual(expectedSorting);
	});
});
