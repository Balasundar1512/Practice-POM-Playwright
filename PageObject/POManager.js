const {LoginPage} = require('./LoginPage');    
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');    
const {PaymentPage} = require('./PaymentPage');   
const {OrdersPage} = require('./OrdersPage');


class POManager{

    constructor(page){

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardpage = new DashboardPage(this.page);
        this.cartpage = new CartPage(this.page);
        this.paymentpage = new PaymentPage(this.page);
        this.ordersPage = new OrdersPage(this.page);

    }

    getLoginpage(){
        return this.loginPage;
    }

    getDashboardpage(){
        return this.dashboardpage;
    }

    getCartpage(){
        return this.cartpage;
    }

    getPaymentpage(){
        return this.paymentpage;
    }

    getOrderspage(){
        return this.ordersPage;
    }







}

module.exports = {POManager}