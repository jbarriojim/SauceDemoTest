/// <reference types="cypress" />
/* global cy, Given, When, Then */
import { cartWorkflowSelectors } from "../selectors/cartWorkflowSelectors";
import { Then, When } from "cypress-cucumber-preprocessor/steps";

const firstName = "Testing";
const lastName = "LastName";
const zipCode = 12345;
const paymentLabel = "Payment Information";
const shippingLabel = "Shipping Information";
const thakYouTitle = "THANK YOU FOR YOUR ORDER";
const taxes = 0.08;

/**
 * Assertion to validate that the product added is the expected one and
 * the quantity is one
 * @param productName: The visual name of the product
 */
Then("the {string} product added should be shown", (productName) => {
  for (var theProduct of productName.split("#")) {
    cy.get(cartWorkflowSelectors.itemName)
      .contains(theProduct)
      .parents(cartWorkflowSelectors.itemSquare)
      .as("itemCart")
      .find(cartWorkflowSelectors.quantity)
      .contains(1);
  }
});

/**
 * Clicks on the checkout button to continue the process
 */
When("the user clicks on checkout button", () => {
  cy.get(cartWorkflowSelectors.checkout).click();
});

/**
 * Assertion to validate that the checkout form is visible
 */
Then("the form should be shown", () => {
  cy.get(cartWorkflowSelectors.checkoutInfo).should("be.visible");
});

/**
 * Fills out the checkout form and clicks on continue button
 */
When("the user fills out the form and submit it", () => {
  cy.get(cartWorkflowSelectors.checkOutFirstName).type(firstName);
  cy.get(cartWorkflowSelectors.checkOutLastName).type(lastName);
  cy.get(cartWorkflowSelectors.checkOutPostalCode).type(zipCode);
  cy.get(cartWorkflowSelectors.continueButton).click();
});

/**
 * Assertion to validate that the product name is on the summary page.
 * Also, validate the payment label and shipping sections
 * @param productName: The visual name of the product
 */
Then("the summary should shown the {string} product", (productName) => {
  for (var theProduct of productName.split("#")) {
    cy.get(cartWorkflowSelectors.itemName).contains(theProduct);
  }
  cy.get(cartWorkflowSelectors.summaryInfo).first().contains(paymentLabel);
  cy.get(cartWorkflowSelectors.summaryInfo).eq(1).contains(shippingLabel);
});

/**
 * Clicks on the finish button to complete the process
 */
When("the user finish the payment process", () => {
  cy.get(cartWorkflowSelectors.finishButton).click();
});

/**
 * Assertion to validate the thank you page
 */
Then("the thank you message should appear", () => {
  cy.get(cartWorkflowSelectors.thankYouTitle).contains(thakYouTitle);
  cy.get(cartWorkflowSelectors.thankYouImage).should("be.visible");
  cy.get(cartWorkflowSelectors.backHomeButton).click();
});

/**
 * Assertion to validate the taxes apply and the total amount
 */
And("the taxes are properly calculated", () => {
  var elementCost = 0;
  cy.get(cartWorkflowSelectors.itemPrice)
    .each(($elem) => {
      elementCost =
        elementCost - -parseFloat($elem.text().split("$")[1]).toFixed(2);
    })
    .then(() => {
      var taxValue = parseFloat(elementCost * taxes).toFixed(2);
      const total = (elementCost - -taxValue).toFixed(2);
      cy.get(cartWorkflowSelectors.summaryTaxLabel).contains(taxValue);
      cy.get(cartWorkflowSelectors.summaryTotal).contains(total);
    });
});
