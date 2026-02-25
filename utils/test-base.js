const { test: base } = require('@playwright/test');

const customtest = base.extend({
  testdataFororders: {
    userinput: "maki123@gmail.com",
    password: "User@123",
    prodname: "ZARA COAT 3"
  }
});

module.exports = {customtest};

