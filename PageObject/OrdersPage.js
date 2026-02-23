const {expect} = require('@playwright/test')
class OrdersPage {

    constructor(page) {

        this.page = page
        this.ordersbtn = page.locator("button[routerlink*='myorders']");
        this.secload = page.locator('.table');                                   //section load
        this.orderrows = page.locator("tbody tr");
        this.ordersummary = page.locator('.email-wrapper');
        this.getorderiddtls = page.locator('.col-text')

    }

    async address(addrstype, email, country) {                        

            const section = this.page.locator('.address').filter({ hasText: addrstype });

            await expect(section).toBeVisible();
            await expect(section).toContainText(email);
            await expect(section).toContainText(`Country - ${country}`);


        }


    async orderPage(orderid, userinput) {

        await this.ordersbtn.click();
        await this.secload.waitFor();
        const rowcount = await this.orderrows.count();
        for (let i = 0; i < rowcount; ++i) {

            const orderrowid = await this.orderrows.nth(i).locator("th").textContent();
            if (orderid.includes(orderrowid)) {

                await this.orderrows.nth(i).locator("button").first().click();
                break;

            }
        }

        
        await this.ordersummary.waitFor();
        const orderiddtls = await this.getorderiddtls.textContent();
        await expect(orderid.includes(orderiddtls)).toBeTruthy();

        

        await this.address(' Billing Address ', userinput, 'India');                  //After we need to give details for the work
        await this.address(' Delivery Address ', userinput, 'India');


    }


}

module.exports = {OrdersPage}