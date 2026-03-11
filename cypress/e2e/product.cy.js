import { faker } from '@faker-js/faker';

describe('Products', () => {
  it('list products', () => {
    cy.visit('http://localhost:5173/productPage.html')

    cy.get("h1").should("have.text", "Products");

    

    cy.get('ul[name="product_list"]').should("be.visible");


  });

  it("creates products", ()=>{
    cy.visit('http://localhost:5173/productPage.html')

    const title = faker.commerce.productName()
    const description = faker.commerce.productDescription()
    const price = faker.commerce.price()

    cy.get("form").should("be.visible");
    cy.get('form input[name="title"]').should("be.visible").type(title);
    cy.get('form input[name="description"]').should("be.visible").type(description);
    cy.get('form input[name="price"]').should("be.visible").type(price);
    cy.get('form button[type="submit"]')
    .should("be.visible")
    .and("have.text", "Create Product")
    .click();


    cy.get('ul[name="product_list"] li:last')
    .should("be.visible")
    .and("have.text",`title: ${title}, description: ${description},price: ${price}`)



    cy.url("eq", "http://localhost:5173/productPage.html");
    




  })
})