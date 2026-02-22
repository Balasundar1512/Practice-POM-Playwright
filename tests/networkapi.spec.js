//with API Authentication we are bypassing login page and order page



const { test, expect, request } = require("@playwright/test")
const { ApiUtils } = require('./utils/ApiUtils');

const apipayload = { userEmail: "maki123@gmail.com", userPassword: "User@123" }
const orderpayload = { orders: [{ country: "Canada", productOrderedId: "6960eac0c941646b7a8b3e68" }] }
const fakeorderpayload = { data: [], message: "No Orders" }

let response;
test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiutils = new ApiUtils(apiContext, apipayload);
    response = await apiutils.createOrders(orderpayload);





});


test('End to End client app suppressed code', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
       async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakeorderpayload);
            await route.fulfill({

                response, body,

            });


        });

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
    //await page.pause();

});