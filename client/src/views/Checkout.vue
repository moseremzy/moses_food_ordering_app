<template>

 <div>

 <OVERLAY/>

 <HEADER/> 
 
 <SUCCESSALERTBOX>{{interactive_store.backend_message}}</SUCCESSALERTBOX>

 <ERRORALERTBOX>{{interactive_store.backend_message}}</ERRORALERTBOX>

 <SEARCHRESULT/>

 <MAINNAV/>

 <MYORDERS/>

 <CHANGEADDRESS></CHANGEADDRESS>

   <div class = "container">

      <h1>Checkout</h1>

      <div class = "grid">

      <div class = "section">

      <div class = "item">

        <h2>Delivery Address</h2>
        
        <p>{{user_store.user.delivery_address}}</p>
         
        <router-link id = "link" to = "/account/profile">[ Change Address ]</router-link>

        <!-- Map Display Section -->
  
        <MAP/>
       
        <!-- Map Display Section -->

      </div> 


      <div class = "item">

        <h2>Select Payment Method</h2>
        
        <form>

        <div>
        <div class = "payment_method">
        <input type = "radio" id = "cash" v-model = "payment_method" value = "cash on delivery"  name = "payment_method">
        <label for = "cash">Cash On Delivery</label>
        </div>

        <div class = "payment_method">
        <input type = "radio" id = "card" v-model = "payment_method" value = "card payment" name = "payment_method">
        <label for = "card">Card Payment</label>
        </div> 
        </div>

        </form>

      </div> 


      <div class = "item" style = "border: 0;">

        <div class = "delivery_pin">
            <h1><font-awesome-icon style = "display: inline-block; margin-right: 10px; float: left;"  class="fa-solid fa-exclamation" id = "exclamation" icon="fa-solid fa-exclamation"/> Delivery includes pin confirmation</h1>
            <p>This will help ensure your order is given to the right person.</p>
        </div>

      </div>

      </div> <!-- section1 -->

      

      <div class = "section">

      <div class = "order_summary"> 
          
        <h2>ORDER SUMMARY</h2>

        <hr>

        <h4>PRODUCT <b>SUBTOTAL</b></h4>
        
         <template v-for = "item in items_store.cart_items" :key = "item.name">
         
         <p>{{`${item.name} x ${item.quantity}`}} <b>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.total)}}</b></p>
         
         </template>
        
        <hr>

        <h4>SUBTOTAL: <b>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(items_store.cart_subtotal_amount)}}</b></h4>
         
        <h4>SERVICE FEE: <b>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(setting_store.service_fee)}}</b></h4>

        <h4>TOTAL: <b>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(items_store.cart_total_amount)}}</b></h4>

        <hr>

         <button id = "checkout" @click.prevent = "checkout"  v-if = "setting_store.market_status === 'open'">Make Payment</button>

      </div>

      </div> <!-- section2 -->

   </div> <!-- grid -->

   </div> <!-- CONTAINER -->

   <WHATSAPP/>

 <FOOTER/>

 </div>
</template>

<script setup>
import SEARCHRESULT from "@/components/SearchResult.vue";
import COPYRIGHT from "@/components/Copyright.vue";
import HEADER from "@/components/Header.vue";
import MAINNAV from "@/components/navigation_bars/MainNav.vue";
import MYORDERS from "@/components/navigation_bars/MyOrders.vue";
import OVERLAY from '../components/modals/loading_overlay.vue';
import CHANGEADDRESS from "@/components/ChangeAddress.vue";
import FOOTER from "@/components/Footer.vue";
import { onMounted, onUnmounted, onUpdated, reactive, toRaw, ref, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MIDDLEWARES from "../middlewares/middlewares"
import { useUserStore } from '@/stores/user'
import { useInteractiveStore } from '@/stores/interactive'
import { useSettingStore } from '@/stores/settings'
import MAP from "@/components/Map.vue";
import API from '../api'
import { useItemStore } from '@/stores/items' 
import { useOrdersStore } from '@/stores/orders'


const items_store = useItemStore()
const user_store = useUserStore()
const setting_store = useSettingStore()
const interactive_store = useInteractiveStore()
const orders_store = useOrdersStore()

const route = useRoute()
const router = useRouter()

let payment_method = ref("")


if (!user_store.isAuthenticated) { //if user no get session redirect to login

    interactive_store.set_page_to_go('checkout')

    router.push({ name: "login" })

}


watch( () => user_store.isAuthenticated,

  (isAuthenticated) => { //i dey confirm if user still dey authenticated

    if (!isAuthenticated) {

        interactive_store.backend_message = "session expired"

        interactive_store.display_success_alert_box(true)

        setTimeout(() => {

           router.push({ path: "/login" })
            
        }, 1000);

    }
  }, 
);


async function checkout() {

    if (validateAddress() && validate_payment_method() && validate_items()) {

        interactive_store.toggle_loading_overlay(true)

        let order = {

            order_id: null,

            user_id: null,

            customer_name: `${user_store.user.firstname} ${user_store.user.lastname}`,

            phone: `${user_store.user.phone}`,

            email: `${user_store.user.email}`,

            payment_method: payment_method.value,

            delivery_address: `${user_store.user.delivery_address}`,

            sub_total_order_cost: items_store.cart_subtotal_amount,

            total_order_cost: items_store.cart_total_amount,

            items: JSON.stringify(items_store.cart_items),

            status: '',

            description: '',

            confirmation_pin: null,

            date_created: null,

        }

       const response = await API.submit_order(order)

       if (response.message === 'error occured') { //if there is an error

           interactive_store.backend_message = "An error occured, please try again"

           interactive_store.display_error_alert_box()

           return
           
       }  

       if (response.message === 'success' && response.authorization_info) { //if na card payment
           
          window.location.replace(response.authorization_info.data.authorization_url);

       } else { //if na cash on delivery

         await orders_store.fetch_orders() //refetch orders

         localStorage.setItem('cart_items', JSON.stringify([])); //empty cart for localstorage

         items_store.cart = [] //empty cart items for store

         router.push({path: `/account/payment-verification`, query:{trxref: response.reference, reference: response.reference, type: 'cash', confirmation_pin: response.confirmation_pin}})

       }

    }

    interactive_store.toggle_loading_overlay(false)

}

function validateAddress() {

    if (user_store.user.delivery_address == "") {

        interactive_store.backend_message = "Address cannot be empty"

        interactive_store.display_error_alert_box()

        return false

    } else {

        return true

    }
    
}



function validate_payment_method() {

    if (payment_method.value == "") {

        interactive_store.backend_message = "Select Payment Method"

        interactive_store.display_error_alert_box()

        return false

    } else {

        return true

    }
    
}


function validate_items() {

    if (items_store.cart_items.length == 0) {

        interactive_store.backend_message = "No Items to Checkout"

        interactive_store.display_error_alert_box()

        return false

    } else {

        return true

    }
    
}



/* Hooks */

onMounted(() => {

    MIDDLEWARES.allowScroll()
    
})


onUpdated(() => {

    MIDDLEWARES.allowScroll()
    
})

</script>

<style scoped>
/* MOBILE DEVICES */
@media only screen and (max-width: 800px) {
  * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

  div.container {
      width: 95%;
      margin: 170px auto;
  }

  h1 {
      color: #3F6B56;
      font-size: 24px;
      font-weight: lighter;
  }

  div.item {
      margin: 25px 0px;
      border-top-right-radius: 12px;
      border-top-left-radius: 12px;
      border: 1px solid rgb(201, 199, 199);
  }

  div.item h2 {
      font-size: 17px;
      font-weight: bold;
      padding: 12px 20px;
      color: rgb(77, 76, 76);
      border-top-right-radius: 12px;
      border-top-left-radius: 12px;
      background-color: #e9f3f8;
  }

  div.item p {
      color: rgb(102, 101, 101);
      font-size: 16px;
      word-break: break-all;
      font-weight: lighter;
      margin: 15px 20px;
  }

  div.item #link {
      color: rgb(190, 22, 22);
      text-decoration: none;
      font-size: 16px;
      cursor: pointer;
      margin: 13px 20px 17px 20px;
  }

  div.payment_method {
      color: rgb(65, 64, 64);
      margin: 20px 20px;
  }

  div.payment_method label{
      margin: 0px 10px;
      font-size: 16px;
      font-weight: lighter;
      vertical-align: top;
  }

  div.delivery_pin {
      padding: 20px 10px;
      border-radius: 7px;
      background-color: #CFECDE;
  }

  div.delivery_pin h1{
      color: black;
      font-size: 16px;
      margin: 5px 20px;
  }

  #exclamation {
      padding: 3px 8px;
      border-radius: 50%;
      color: white;
      background-color: green;
  }

  hr {
      margin: 10px 0;
  }

  div.order_summary {
      margin-top: 70px;
  }

  div.order_summary h2{
      color: #12673E;
      font-weight: bold;
      font-size: 16px;
  }

  div.order_summary h4{
      font-size: 16px;
      margin: 20px 0px;
      font-weight: bold;
  }

  div.order_summary p{
      font-size: 17px;
      margin: 14px 0px;
      font-weight: lighter;
  }

  div.order_summary b{
      float: right;
      font-size: 16px;
  }

  button#checkout {
      color: white;
      border: 0;
      padding: 10px;
      display: block;
      width: 60%;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 17px;
      cursor: pointer;
      margin: 40px auto 0px auto;
      background-color: #14FF8E;
  }
  
}



/* DESKTOP */
@media only screen and (min-width: 800px) {
  * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

  div.container {
      width: 95%;
      margin: 170px auto;
  }

  h1 {
      color: #3F6B56;
      font-size: 24px;
      font-weight: lighter;
  }

  div.grid {
      display: grid;
      margin-top: 50px;
      column-gap: 50px;
      align-items: flex-start;
      grid-template-columns: 50% auto;
  }

  div.section {
      padding: 20px;
      border: 1px solid rgb(201, 199, 199);
  }

  div.item {
      margin: 25px 0px;
      border-top-right-radius: 12px;
      border-top-left-radius: 12px;
      border: 1px solid rgb(201, 199, 199);
  }

  div.item h2 {
      font-size: 17px;
      font-weight: bold;
      padding: 12px 20px;
      color: rgb(77, 76, 76);
      border-top-right-radius: 12px;
      border-top-left-radius: 12px;
      background-color: #e9f3f8;
  }

  div.item p {
      color: rgb(102, 101, 101);
      font-size: 16px;
      word-break: break-all;
      font-weight: lighter;
      margin: 15px 20px;
  }

  div.item #link {
      color: rgb(190, 22, 22);
      text-decoration: none;
      font-size: 16px;
      cursor: pointer;
      margin: 13px 20px 17px 20px;
  }

  div.payment_method {
      color: rgb(65, 64, 64);
      margin: 3px 20px;
  }

  div.payment_method label{
      margin: 10px;
      font-weight: lighter;
      font-size: 16px;
  }

  div.delivery_pin {
      padding: 20px 10px;
      border-radius: 7px;
      background-color: #CFECDE;
  }

  div.delivery_pin h1{
      color: black;
      font-size: 16px;
      margin: 5px 20px;
  }

  #exclamation {
      padding: 3px 8px;
      border-radius: 50%;
      color: white;
      background-color: green;
  }

  hr {
      margin: 10px 0;
  }

  div.order_summary {
      margin-top: 0px;
  }

  div.order_summary h2{
      color: #12673E;
      font-weight: bold;
      font-size: 17px;
  }

  div.order_summary h4{
      font-size: 16px;
      margin: 20px 0px;
      font-weight: bold;
  }

  div.order_summary p{
      font-size: 17px;
      margin: 14px 0px;
      font-weight: lighter;
  }

  div.order_summary b{
      float: right;
      font-size: 16px;
  }

  button#checkout {
      color: white;
      border: 0;
      padding: 10px;
      display: block;
      width: 60%;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 17px;
      cursor: pointer;
      margin: 40px auto 0px auto;
      background-color: #14FF8E;
  }
}
</style>