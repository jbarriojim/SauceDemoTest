/// <reference types="cypress" />
/* global cy, Given, When, Then */
import { loginSelectors } from "../selectors/loginSelectors";
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

const username = "standard_user";
const password = "secret_sauce";

/**
 * Navigates to main page
 * - Using a viewport of 1920x1080
 * - Removing the local storage to have a clear new session
 * - Removing the cookies
 */
Given(/^go to main page$/, () => {
  cy.viewport(1920, 1080);
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.visit("www.saucedemo.com");
});

/**
 * This function fillout the login form and click on the submit button.
 */
When("login", () => {
  cy.get(loginSelectors.userName).type(username);
  cy.get(loginSelectors.password).type(password);
  cy.get(loginSelectors.submitButton).click();
});

/**
 * This funcion checks the visibility of user and password fields.
 */
Then("the login form should be shown", () => {
  cy.get(loginSelectors.userName).should("be.visible");
  cy.get(loginSelectors.password).should("be.visible");
});
