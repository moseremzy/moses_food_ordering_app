import axios from "axios"
 

export default class API {

    //POST REQUESTS

    //Register
    static async register(formdata) {
        const res = await axios.post("/api/register", formdata)
        return res.data
    }

    //Resend Confirmation Email
    static async ResendConfirmationMail(info) {
        const res = await axios.post('/api/resend-email-confirmation', info)
        return res.data
    }
    

    //Login
    static async login(formdata) {
        const res = await axios.post("/api/login", formdata)
        return res.data
    }

    //contact us email
     static async contact_us(info) {
        const res = await axios.post("/api/contact_us", info)
        return res.data
    }


    //cancel order
     static async cancel_order(info) {
        const res = await axios.post("/api/cancel_order", info)
        return res.data
    }

    
    //fetch geo info for home recommendations
    static async fetch_geo_info(geo_info) {
        const res = await axios.post("/api/fetch_geo_info", geo_info)
        return res.data
     }

    //submit order
    static async submit_order(info) {
    const res = await axios.post("/api/submit_order", info)
    return res.data
    }

    //webhook 
    static async paystack_webhook(reference) {
        const res = await axios.post("/paystack_webhook", reference)
        return res.data
    }

    //send reset password email to user
     static async send_reset_pass_email(info) {
        const res = await axios.post("/api/send_reset_pass_email", info)
        return res.data
     }

    //Reset password
    static async reset_password(info) {
    const res = await axios.post("/api/reset_password", info)
    return res.data
    }

    //contact us email
    static async contact_us(info) {
        const res = await axios.post("/api/contact_us", info)
        return res.data
    }

    
    //GET REQUESTS

    //Verify Email
    static async emailVerification(id) {
        const res = await axios.get(`/api/confirm-email/${id}`)
        return res.data
    }


    //fetch user
    static async fetch_user() {
        const res = await axios.get(`/api/fetch_user`)
        return res.data
    }

    
    //fetch items
    static async fetch_items() {
        const res = await axios.get(`/api/fetch_items`)
        return res.data
    }

    //fetch orders
    static async fetch_orders() {
        const res = await axios.get(`/api/fetch_orders`)
        return res.data
    }

    //verify user card payment
    //fetch orders
    static async verify_payment(reference) {
        const res = await axios.get(`/api/verify_payment/${reference}`)
        return res.data
    }

     //fetch site settings
     static async fetch_settings() {
        const res = await axios.get("/api/fetch_settings")
        return res.data
    }

    //logout users
    static async logout() {
        const res = await axios.get("/api/logout_user");
        return res.data
     }



    //PATCH REQUEST

    //update user account details
     static async update_user_info(info) {
        const res = await axios.patch(`/api/update_user_info`, info)
        return res.data
    }

    //update password
    static async update_password(info) {
        const res = await axios.patch(`/api/update_password`, info)
        return res.data
    }


}