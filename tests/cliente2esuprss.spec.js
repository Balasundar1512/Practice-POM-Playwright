

const {test, expect, selectors} = require('@playwright/test');
const { text } = require('node:stream/consumers');





test('End to End client app suppressed code', async ({page}) => {

        const userinput= "maki123@gmail.com";
        const username = page.getByPlaceholder('email@example.com');
        const pwd = page.getByPlaceholder('enter your passsword');
        const products = page.locator('.card-body');
        const prodname = "ZARA COAT 3"
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        
        await username.fill(userinput);
        await pwd.fill('User@123');
        await page.getByRole('button' , {name : 'Login'}).click();
        await page.waitForLoadState('networkidle');
        await products.first().waitFor();                              //wait for page to load
        await expect(page.getByText(' User can only see maximum 9 products on a page')).toBeVisible();   //to checking the blink text is visible or not
        await products.filter({hasText: prodname}).getByRole('button', {name: "Add To Cart"}).click();   //Checking whether the searching product available in UI and click add to cart
        await expect(page.getByText(' Product Added To Cart ')).toBeVisible();
        await page.getByRole("listitem").getByRole('button', {name:"Cart"}).click();
        await page.locator('.cart').waitFor();
        await expect(page.locator('.cart').filter({hasText: prodname})).toBeVisible();
        await page.getByRole('button', {name: "Checkout"}).click();
        
        //personal information    //coupen code-rahulshettyacademy
        const expdate = page.locator('.input.ddl');
        await expdate.first().selectOption('10');
        await expdate.last().selectOption('27');
        async function fillfield(page, lableText, value) {
            const input=await page.locator('div.field, div.field.small')
            .filter({hasText: lableText})
            .locator('input');

        await expect(input).toBeVisible();
        await input.fill(value);
            
        }

        await fillfield(page, 'CVV Code ', '321');
        await fillfield(page, 'Name on Card ', 'Bala');
        await fillfield(page, 'Apply Coupon ', 'rahulshettyacademy');
        await page.getByRole('button', {name: 'Apply Coupon'}).click();
        
        await expect(page.getByText("* Coupon Applied")).toBeVisible();

        await expect(page.locator('.user__name.mt-5 label')).toHaveText(userinput);
        await page.getByPlaceholder("Select Country").type("ind", { delay: 150 });
        await page.locator('.ta-results').waitFor();
        await page.getByRole('button', {name: 'India'}).nth(1).click();

        await page.getByText("PLACE ORDER").click();

        await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
        const raworderid =  await page.locator('label.ng-star-inserted').textContent();
        const orderid = raworderid.replace(/\|/g, '');
        await page.getByText(" Orders History Page ").click();
        const ordhistry = page.locator('tr');
        await ordhistry.first().waitFor();
        await ordhistry.filter({hasText: orderid}).getByRole('button', {name: "View"}).click();

        const ordersummary = page.locator('.email-wrapper');
        await ordersummary.waitFor();
        const orderiddtls = await page.locator('.col-text').textContent();
        await expect(orderid.includes(orderiddtls)).toBeTruthy();

        async function address(page, addrstype, email, country) {                        //For function we need to give work
                                                                                    
            const section = page.locator('.address').filter({hasText: addrstype});                    

            await expect(section).toBeVisible();
            await expect(section).toContainText(email);
            await expect(section).toContainText(`Country - ${country}`);
    
            
        }                                                                           
                                                                                        
        await address(page, ' Billing Address ', userinput, 'India');                  //After we need to give details for the work
        await address(page, ' Delivery Address ', userinput, 'India');


        
        
        
        
        
        
        
        
        
        
        
        
        //await page.pause();
        
});