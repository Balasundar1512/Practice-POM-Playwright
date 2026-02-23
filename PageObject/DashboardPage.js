const {expect} = require('@playwright/test')
class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator('.card-body');
        this.cart = page.locator("[routerlink*='cart']")

    }

    async searchPrdAddcart(prodname) {

        await this.products.first().waitFor();                              //wait for page to load
        await expect(this.page.getByText(' User can only see maximum 9 products on a page')).toBeVisible();   //to checking the blink text is visible or not
        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === prodname) {

                await this.products.nth(i).getByRole('button', { name: ' Add To Cart' }).click();
                break;
            }
        }
        await expect(this.page.getByText(' Product Added To Cart ')).toBeVisible();
        await this.cart.click();



    }

}

module.exports = {DashboardPage}