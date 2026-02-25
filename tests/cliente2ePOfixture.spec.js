//Using POM (Page object method)
const {test, expect} = require('@playwright/test');
const { text, json } = require('node:stream/consumers');
//to access class and methods from js file
const {POManager} = require('../PageObject/POManager');      //POManager contains classes of all pages 
//dataset -> stringigying the json file -> again converting to json to prevent any confusion in that json file
//const dataset = JSON.parse(JSON.stringify(require('../utils/cliente2ePOjson.json')));     //This file contain the test data in json format
const {customtest} = require('../utils/test-base');

customtest('End to End client app', async ({page, testdataFororders}) => {

        // const userinput= "maki123@gmail.com";
        // const password = "User@123"
        // const prodname = "ZARA COAT 3"

        const poManager = new POManager(page)

        //calling js class from LoginPage.js
        const loginPage = poManager.getLoginpage();

        //calling methods from LoginPage.js class
        await loginPage.goTo();
        await loginPage.loginCred(testdataFororders.userinput, testdataFororders.password);
        
        //calling DashboardPage.js class
        const dashboardpage = poManager.getDashboardpage();

        //calling method from Dashboard.js class to search the specific product and add to cart 
        await dashboardpage.searchPrdAddcart(testdataFororders.prodname);
        
        //calling CartPage.js class
        const cartpage = poManager.getCartpage();

        //calling method from CartPage.js class to verify whether the added product present in cart and click checkout or BuyNow
        await cartpage.checkoutprd(testdataFororders.prodname);

        //calling PaymentPage.js class
        const paymentpage = poManager.getPaymentpage();

        //calling methods from paymentpage.js class to fill all the payment details
        await paymentpage.personalInfo();
        await paymentpage.shippingInfo(testdataFororders.userinput);
        
        //Verifying text and took orderid
        await expect(page.locator("h1")).toHaveText(" Thankyou for the order. ");
        const orderid =  await page.locator('label.ng-star-inserted').textContent();

        //calling OrdersPage.js class
        const ordersPage = poManager.getOrderspage();

        //calling method from OrdersPage.js class to view and verify the details
        await ordersPage.orderPage(orderid, testdataFororders.userinput);
        
});

