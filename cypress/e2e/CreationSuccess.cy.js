import { faker } from '@faker-js/faker';

describe('Product', () => {
  it('displays product information', () => {
    cy.visit('http://localhost:5173/productSuccess.html')

    cy.get("h1").should("have.text", "Product Created!");

    

   

    const title = faker.commerce.productName()
    const description = faker.commerce.productDescription()
    const price = faker.commerce.price()
    const inventory_count = faker.number.int({min: 0, max: 5})


    cy.get("form").should("be.visible");
     cy.get("table").should("be.visible")
     cy.get("tr").should("be.visible")
     
     

     cy.get('form button[type="button"]')
    .should("be.visible")
    .and("have.text", "Go back")
    .click();
  })



    


  });
