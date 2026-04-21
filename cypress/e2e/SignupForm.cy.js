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
});
