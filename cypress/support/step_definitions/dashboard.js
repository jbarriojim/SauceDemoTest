/// <reference types="cypress" />
/* global cy, Given, When, Then */
import { dashboardSelectors } from "../selectors/dashboardSelectors";
import { Then, When } from "cypress-cucumber-preprocessor/steps";

const numElements = 6;
const addToCart = "Add to cart";
var cartNumber = 0;

/**
 * Assertion to validate that all the expected products are shown
 */
Then("the user sees all the products", () => {
  cy.get(dashboardSelectors.listOfElements).should("have.length", numElements);
});

/**
 * Adds the product to the cart. Searching the element by name and after
 * clicking on the add to cart button.
 * Also, the cartNumber variable is incremented.
 * @param productName: The visual name of the product
 */
When("the user adds the {string} product", (productName) => {
  cy.get(dashboardSelectors.itemName)
    .contains(productName)
    .parentsUntil(dashboardSelectors.itemSquare)
    .find(dashboardSelectors.priceButton)
    .contains(addToCart)
    .click();
  cartNumber += 1;
});

/**
 * Assertion to validate that the cart has the expected elements
 */
Then("the cart has one more article", () => {
  cy.get(dashboardSelectors.cartNumber).contains(cartNumber);
});

/**
 * Clicks on the cart to continue the buying process and the 
 * cartNumber variable is reset
 */
When("the user clicks on the cart", () => {
  cy.get(dashboardSelectors.cart).click();
  //reset counter
  cartNumber = 0;
});

/**
 * Performs the actions to logout
 */
When("logout", () => {
  cy.get(dashboardSelectors.userMenu).click();
  cy.get(dashboardSelectors.logoutOption).click();
});
