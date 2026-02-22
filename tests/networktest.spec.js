const { test, expect } = require('@playwright/test');

test("Unauthorized test", async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill("maki123@gmail.com");
    await page.locator('#userPassword').fill("User@123");
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('networkidle');
    await page.locator("[routerlink*='myorders']").click(); 
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6" })
    )
    await page.getByRole('button', { name: 'View' }).first().click();
    console.log(await page.locator('.blink_me').textContent());
    await expect(page.locator('.blink_me')).toHaveText("You are not authorize to view this order");
    await page.pause();






});