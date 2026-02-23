const {expect} = require('@playwright/test')
class CartPage
{
    
    constructor(page){
        this.page = page;
        this.parent = page.locator("div li");     //parent tag
        this.proditem = page.locator("li")        //child tag

    }

    async checkoutprd(prodname){

        await this.parent.first().waitFor();
        const item = this.proditem.filter({hasText: prodname})
        await expect(item).toBeVisible(); 
        await item.getByRole('button', {name: "Buy Now"}).click();


    }


}
module.exports ={CartPage}