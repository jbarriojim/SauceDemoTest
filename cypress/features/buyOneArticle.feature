Feature: Buy one article

Background:

Scenario Outline: Buy one article
    Then the user sees all the products
    When the user adds the "<products>" product
    Then the cart has one more article
    When the user clicks on the cart
    Then the "<products>" product added should be shown
    When the user clicks on checkout button
    Then the form should be shown
    When the user fills out the form and submit it
    Then the summary should shown the "<products>" product
    And the taxes are properly calculated
    When the user finish the payment process
    Then the thank you message should appear

Examples:
|products|
|Sauce Labs Backpack|
|Sauce Labs Bike Light|
|Sauce Labs Bolt T-Shirt|
|Sauce Labs Backpack#Sauce Labs Bike Light|


Scenario: Login-Logout



