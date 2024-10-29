Feature: WebdriverUiversity.com - Contact Us Page
    Scenario: Valid Contact Us form submission
        Given I navigate the WebdriverUiversity homepage
        When I click on the contact us button
        And I type a first name
        And I type a last name
        And I enter an email address
        And I type a comment
        And I click on the submit button
        Then I should be presented with a succesful contact us submissoin message