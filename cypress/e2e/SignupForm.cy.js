import { faker } from "@faker-js/faker";

describe("Signup Form", () => {
	it("allows users to enter and submit signup details", () => {
		cy.visit("http://localhost:5173/signup.html");

		const firstName = faker.person.firstName();
		const email = faker.internet.email();
		const password = faker.internet.password({ length: 8 });
		const repeatPassword = password;

		cy.get('input[name="firstname"]').should("be.visible").and("have.value", "");
		cy.get('input[name="email"]').should("be.visible").and("have.value", "");
		cy.get('input[name="password"]').should("be.visible").and("have.value", "");

		cy.get('input[name="firstname"]').type(firstName).should("have.value", firstName);
		cy.get('input[name="email"]').type(email).should("have.value", email);
		cy.get('input[name="password"]').type(password).should("have.value", password);
		cy.get('input[name="repeat-password"]')
			.type(password)
			.should("have.value", repeatPassword);

		cy.get('button[type="submit"]').click();

		cy.contains("Signup successful").should("be.visible");
	});

	it('blocks product page access when not logged in and allows it after login', () => {
		cy.visit('http://localhost:5173/productPage.html');
		cy.url().should('include', '/Login/LoginApi/login.html');

		const firstName = faker.person.firstName();
		const email = faker.internet.email();
		const password = faker.internet.password({ length: 8 });

		cy.visit('http://localhost:5173/signup.html');
		cy.get('input[name="firstname"]').type(firstName);
		cy.get('input[name="email"]').type(email);
		cy.get('input[name="password"]').type(password);
		cy.get('input[name="repeat-password"]').type(password);
		cy.get('button[type="submit"]').click();

		cy.url().should('include', '/Login/LoginApi/login.html');
		cy.get('input[name="email"]').type(email);
		cy.get('input[name="password"]').type(password);
		cy.get('button[type="submit"]').click();

		cy.url().should('include', '/dashboard.html');
		cy.visit('http://localhost:5173/productPage.html');
		cy.url().should('eq', 'http://localhost:5173/productPage.html');
		cy.get('h1').should('have.text', 'Products');
	});
});
