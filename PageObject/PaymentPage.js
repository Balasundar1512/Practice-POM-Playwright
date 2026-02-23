const { expect } = require('@playwright/test')
class PaymentPage {

    constructor(page) {
        this.page = page;
        this.expdate = page.locator('.input.ddl');
        this.countryinput = page.locator("input[placeholder*='Select Country']");
        this.optdropdown = page.locator('.ta-results');
        this.placeorder = page.locator('.action__submit')
        this.fcinput = page.locator('div.field, div.field.small')

    }
    async fillfield(lableText, value) 
        {
            const input = await this.fcinput
                .filter({ hasText: lableText })
                .locator('input');

            await expect(input).toBeVisible();
            await input.fill(value);

        }

    async personalInfo() {


        await this.expdate.first().selectOption('10');
        await this.expdate.last().selectOption('27');

       

        await this.fillfield('CVV Code ', '321');
        await this.fillfield('Name on Card ', 'Bala');
        await this.fillfield('Apply Coupon ', 'rahulshettyacademy');

        await this.page.getByRole('button', { name: 'Apply Coupon' }).click();

        await expect(this.page.locator('.mt-1').filter({ hasText: '* Coupon Applied' })).toBeVisible();


    }

    async shippingInfo(userinput) {

        await expect(this.page.locator('.user__name.mt-5 label')).toHaveText(userinput);
        
        await this.countryinput.click();
        await this.countryinput.type("ind", { delay: 150 });
    
        await this.optdropdown.waitFor();
        const optcount = await this.optdropdown.locator("button").count();
        for (let i = 0; i < optcount; ++i) {

            const text = await this.optdropdown.locator("button").nth(i).textContent();
            if (text === " India") {

                await this.optdropdown.locator("button").nth(i).click();
                break;
            }
        }

        await this.placeorder.click();




    }

}

module.exports = {PaymentPage}