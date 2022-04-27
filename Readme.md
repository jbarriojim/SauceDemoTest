# SAUCEDEMO - RETO QA

## Cypress + Cucumber

This challenge was performed using [Cypress](https://www.cypress.io/) and [Cucumber](https://cucumber.io/).

### Requirements
1. Install [Node](https://nodejs.org/es/download/)
2. Install [Chrome](https://www.google.com/intl/es_es/chrome/) browser 

### How to install

Run `npm install` and all the dependencies should be installed automatically.

### Open cypress

Run `npx cypress open` and the cypress interface is going to be shown. Clicking on the feature, the browser should be open executing the complete feature.

### Run Headless mode

Run `npm run cy:run` is going to execute the command under package json. This command has the Chrome broser set.

### What does the feature?
This feature access to https://www.saucedemo.com/ and perform a complete buy workflow and after the user logout. Also, during the process I added several assertions to ensure the correct application functionalities.

The test case is executed 3 times, one per product in the examples table.

The cucumber feature sees like this:

```cucumber
    Feature: Buy one article
    
    Background:
        Given go to main page
        When login
    
    Scenario Outline: Buy one article
        Then the user sees all the products
        When the user adds the "<product>" product
        Then the cart has one more article
        When the user clicks on the cart
        Then the "<product>" product added should be shown
        When the user clicks on checkout button
        Then the form should be shown
        When the user fills out the form and submit it
        Then the summary should shown the "<product>" product
        And the taxes are properly calculated
        When the user finish the payment process
        Then the thank you message should appear
        And logout
        Then the login form should be shown
    
    Examples:
    |product|
    |Sauce Labs Backpack|
    |Sauce Labs Bike Light|
    |Sauce Labs Bolt T-Shirt|
```

## IMPORTANT
As the main page has a redirect in the home page, I had to add this specific configuration to cypress.json
```
"chromeWebSecurity": false
```

This is not supported by Firefox. Then the test case is not working with this browser. You can read more about [chromeWebSecurity](https://docs.cypress.io/guides/guides/web-security).

