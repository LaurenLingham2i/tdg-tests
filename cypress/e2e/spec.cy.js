describe("template spec", () => {

  beforeEach(() => {
    cy.visit("https://develop.d3nylssqqiptjw.amplifyapp.com/"); 
    // cy.fixture("logins").as("data");
    // cy.get("@data").then(passedData => {
    //   cy.get("#email-input").type(passedData.username);
    //   cy.get("#password-input").type(passedData.password);
    // })
    // cy.contains("Login").click();
  });

  it.skip("Generates data using a template", () => {
    cy.generateFromExistingTemplate("Personal");
    cy.get(".page").should("contain", "File is ready!");
  });

  it.skip("Saves generated data to the history", () => {
    cy.generateFromExistingTemplate("Personal");

    let fileName;
    cy.get("#file-name-input").invoke("val").then((val) => {
      fileName = val;
      // console.log("Value.text: ", fileName);
      cy.get("#upload-button").click();
      cy.get("#modal-ok-button").click();
      cy.wait(1000); // The file would only show after a wait
      cy.contains("HISTORY").click();
      cy.contains(`${fileName}.zip`);
    });
  });

  it("Generates 100 data examples with first name, last name, email address and full address", () => {
    cy.contains("DATA").click();
    cy.get(".entries-input").type("00"); // Number of entries field is prepopulated with 1 so add 00 to requetst 100 entries
    cy.selectMultipleDataTypesFromDropdown("#personal", [1, 3, 10]);  // Selects First name, Last name and Email address from Personal Data 
    cy.selectMultipleDataTypesFromDropdown("#residentialAddress", [0]); // Selects Full address from Residential Address
    cy.get("#submit-selected").click();
    cy.get("#json-btn").click();
    cy.get("#generate-values").click();
    cy.get("#download-button").click();
    
    cy.readFile("cypress/downloads/GENERIC-AKG96s.zip", "binary", { timeout: 1000 }).should("exist")
      .then((downloadedFile) => {
        console.log(`downloaded file: ${downloadedFile}`);
        console.log("test");
      });
  });

  it.skip("Generates data using a template, downloads it and uploads the downloaded file for editing", () => {
    cy.generateFromExistingTemplate("Personal");

    let fileName;

    cy.get("#file-name-input").invoke("val").then((val) => {
      fileName = val;
      console.log(`Name of file downloaded: ${fileName}`);

      cy.get("#download-button").click();
      cy.get(".nav-links-container a").eq(0).click();
      cy.get(".nav-links-container a").eq(1).click();
      cy.contains("Next").click();
      cy.get("input[type=file]").selectFile(`cypress/downloads/${fileName}.zip`, { force: true });
    });
  });

});
