import { fakePerson, fakeAddress } from "../fixtures/sure";

// helper function to dry up the code
// would likely move this to a top level file
// if I had more than one test suite
const testMUIInput = (dataTest, value, errorText) => {
  it("fills " + dataTest, () => {
    // trigger error state
    cy.getTestId(dataTest).type(value);
    cy.getTestId(dataTest).clear();
    if (errorText) {
      // confirm error shows
      cy.get(".MuiFormHelperText-root").contains(errorText);
    }
    cy.getTestId(dataTest).type(value);
    cy.getTestId(dataTest).within(() => {
      cy.get(".MuiInputBase-input").should("have.value", value);
    });
  });
};

const confirmEmptyInputs = () => {
  cy.get(".MuiInputBase-input").each(($el, _num, _$list) => {
    cy.wrap($el).should("have.value", "");
  });
};

describe("Sure App tests", () => {
  it("loads the page", () => {
    // my actual domain where I hosted this
    //cy.visit("http://abogle.com/");
    cy.visit("localhost:3000");
  });
  it("Has correct header text", () => {
    cy.getTestId("header-text").contains("Tell us about you");
  });
  testMUIInput(
    "first-name",
    fakePerson.first_name,
    "A first name is required."
  );
  testMUIInput("last-name", fakePerson.last_name, "A last name is required.");
  testMUIInput("address-line-1", fakeAddress.line_1, "An address is required.");
  testMUIInput("address-line-2", fakeAddress.line_2, "");
  testMUIInput("address-city", fakeAddress.city, "A city is required.");
  testMUIInput("address-region", fakeAddress.region, "A region is required.");
  testMUIInput(
    "address-postal",
    fakeAddress.postal,
    "A valid US postal code is required."
  );

  it("Clears all inputs", () => {
    cy.getTestId("clear-form").click();
    confirmEmptyInputs();
  });

  it("Fetches a quote", () => {
    cy.getTestId("example-submit").click();
    // this effectively waits for the load up to 30s
    // historically, I've written custom couldBeLoading
    // utilities that check for the disappearance of a
    // global loading spinner.
    cy.getTestId("start-over", { timeout: 30000 });
  });

  it("Starts with data", () => {
    cy.getTestId("policy-holder").contains(
      fakePerson.first_name + " " + fakePerson.last_name[0]
    );
    cy.getTestId("policy-postal").contains(fakeAddress.postal);
    cy.getTestId("policy-premium").contains("$");
  });

  // TODO: Add dropdown tests

  it("returns to the form", () => {
    cy.getTestId("start-over").click();
    confirmEmptyInputs();
  });
});
