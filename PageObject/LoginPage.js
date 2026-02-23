class LoginPage
{

    constructor(page)
    {
        this.page = page;
        this.signInbtn= page.getByRole('button' , {name : 'Login'});
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');


    }

    async goTo()
    {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async loginCred(userinput, password)
    {
        await this.userName.fill(userinput);
        await this.password.fill(password);
        await this.signInbtn.click();
        await this.page.waitForLoadState('networkidle');

    }


}
module.exports = {LoginPage}