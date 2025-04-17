<template>

  <div class = "myorders_container">

    <CANCELORDERMODAL :id  = orders_store.current_order[0].order_id />
    
    <div class = "header">
    <p @click.prevent = "store.toggle_vieworders_nav(false)"><font-awesome-icon class="fa-solid fa-xmark" id = "xmark" icon="fa-solid fa-xmark"/> Close</p>
    </div>

    <div class = "info">
    <h1 @click.prevent = "store.toggle_vieworders_nav(false)"><font-awesome-icon class="fa-solid fa-arrow-left-long" id = "arrow" icon="fa-solid fa-arrow-left-long"/> Order #{{orders_store.current_order[0].order_id}}</h1>
    <p style = "margin: 20px 0 10px 0;">Delivery PIN <b>{{orders_store.current_order[0].confirmation_pin}}</b></p>
    <hr>
    </div>

    <div class = "order">
    <h2>Items</h2>
    <template v-for = "item in JSON.parse(orders_store.current_order[0].items)" :key = "item.name"> 
    <p>{{item.name}} x {{item.quantity}} <small>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.total)}}</small></p>
    </template>
    <hr>
    </div>

    <div class = "summary">
    <p>Sub Total <small>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(orders_store.current_order[0].total_order_cost)}}</small></p>
    <p>Service Fee <small>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(setting_store.service_fee)}}</small></p>
    <p>Total <small>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(orders_store.current_order[0].total_order_cost)}}</small></p>
    <hr>
    </div>

    <div class="status">
     <h2>Order Status</h2>
     <h3 :style = "order_color">{{orders_store.current_order[0].status}}</h3>
     <p>{{status_writeup}}</p>
     <button v-if = "orders_store.current_order[0].status !== 'Cancelled' && orders_store.current_order[0].status !== 'Delivered' && orders_store.current_order[0].status !== 'Payment Failed' && orders_store.current_order[0].status !== 'Payment Abandoned' && orders_store.current_order[0].status !== 'Payment Reversed'" @click.prevent = "store.toggle_cancel_order_modal(true)">Cancel Order</button>
    </div>

    

  </div>
</template>

<script setup>

import { useInteractiveStore } from '@/stores/interactive'

import { computed, reactive, toRefs, ref, onMounted, watch, onUpdated} from 'vue'

import CANCELORDERMODAL from "@/components/modals/cancel_order_modal.vue";

import { useSettingStore } from '@/stores/settings'

import { useOrdersStore } from '@/stores/orders'

const orders_store = useOrdersStore()

const store = useInteractiveStore()

const setting_store = useSettingStore()

 
const order_color = computed(() =>  {

    switch (orders_store.current_order[0].status) {

        case "Payment Pending":

            return {'color': 'gray'}
             
            break;

        case "Payment Failed":

            return {'color': '#DC3545'}
             
            break;

        case "Payment Abandoned":

            return {'color': '#B0BEC5'}
             
            break;

        case "Payment Reversed":

            return {'color': '#FF5722'}
             
            break;


         case "Pending":

            return {'color': 'gray'}
             
            break;
         
         case "Confirmed":

            return {'color': '#007BFF'}

            break;

        case "Preparing":

            return {'color': '#FD7E14'}

            break;

        case "Out for Delivery":

            return {'color': '#6F42C1'}

            break; 

        case "Delivered":

            return {'color': '#28A745'}

        break;
        
        case "Cancelled":

            return {'color': '#DC3545'}

        break;
     
         default:

        break;

     }


})


const status_writeup = computed(() =>  {

    return orders_store.current_order[0].description

})


 


</script>

<style scoped>
/* MOBILE DEVICES */
@media only screen and (max-width: 800px) {
* {
    font-family: 'Nuosu SIL';
}
div.myorders_container {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 3;
    top: 0;
    left: 0;
    overflow-y: auto;
    margin: 0;
    padding: 15px;
    background-color: white;
}
div.header {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    padding: 5px 0 0px 15px;
    background-color: white;
}
div.header p{
    cursor: pointer;
    font-size: 16px;
}
div.header h1{
    font-size: 16px;
    color: rgb(3, 43, 3);
    margin: 15px 0 10px 0;
}
#arrow {
    margin-right: 10px;
}
div.info {
    margin: 30px 0 0 0;
}
div.info b{
    float: right;
    letter-spacing: 4px;
}
div.info p{
    cursor: pointer;
    font-size: 17px;
}
div.info h1{
    font-size: 16px;
    color: rgb(3, 43, 3);
    margin: 15px 0 10px 0;
}
div.order h2 {
    font-size: 19px;
    margin-bottom: 12px;
}
div.order p {
    font-size: 15px;
}
div.order small {
    font-size: 15px;
    float: right;
}
div.summary {
    margin: 20px 0;
}
div.summary p {
    font-size: 15px;
}
div.summary small {
    font-size: 15px;
    float: right;
}
hr {
    margin: 0;
}
#xmark {
    display: inline-block;
    vertical-align: -10%;
    margin: 0px 7px 0px 0;
    font-size: 18px;
}
div.status h2{
   font-size: 20px;
}
div.status h3{
   color: green;
   font-size: 19px;
   font-weight: bolder;
   margin: 0;
}
div.status p{
   text-transform: lowercase;
   font-size: 16px;
   margin: 4px 0;
}
div.status button {
   display: block;
   background-color: rgb(182, 31, 31);
   color: white;
   font-weight: bold;
   border: 0;
   border-radius: 12px;
   padding: 8px 20px;
   margin: 60px auto 0px auto;
}
}


/* DESKTOP */
@media only screen and (min-width: 800px) {
* {
    font-family: 'Nuosu SIL';
}
div.myorders_container {
    position: fixed;
    width: 40%;
    height: 100vh;
    z-index: 3;
    top: 0;
    left: 0;
    overflow-y: auto;
    margin: 0;
    padding: 15px;
    background-color: white;
}
div.header {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    padding: 5px 0 0px 15px;
    background-color: white;
}
div.header p{
    cursor: pointer;
    font-size: 16px;
}
div.header h1{
    font-size: 16px;
    color: rgb(3, 43, 3);
    margin: 15px 0 10px 0;
}
#arrow {
    margin-right: 10px;
}
div.info {
    margin: 30px 0 0 0;
}
div.info b{
    float: right;
    letter-spacing: 4px;
}
div.info p{
    cursor: pointer;
    font-size: 17px;
}
div.info h1{
    font-size: 16px;
    color: rgb(3, 43, 3);
    margin: 15px 0 10px 0;
}
div.order h2 {
    font-size: 19px;
    margin-bottom: 12px;
}
div.order p {
    font-size: 15px;
}
div.order small {
    font-size: 15px;
    float: right;
}
div.summary {
    margin: 20px 0;
}
div.summary p {
    font-size: 15px;
}
div.summary small {
    font-size: 15px;
    float: right;
}
hr {
    margin: 0;
}
#xmark {
    display: inline-block;
    vertical-align: -10%;
    margin: 0px 7px 0px 0;
    font-size: 18px;
}
div.status h2{
   font-size: 20px;
}
div.status h3{
   color: green;
   font-size: 19px;
   font-weight: bolder;
   margin: 0;
}
div.status p{
   text-transform: lowercase;
   font-size: 16px;
   margin: 4px 0;
}
div.status button {
   display: block;
   background-color: rgb(182, 31, 31);
   color: white;
   font-weight: bold;
   border: 0;
   border-radius: 12px;
   padding: 8px 20px;
   margin: 60px auto 0px auto;
}
}

</style>