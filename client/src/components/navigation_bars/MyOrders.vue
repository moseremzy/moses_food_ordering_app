<template>
  
  <div class = "myorders_container" v-if = "store.display_myorders_nav">
    
    <div class = "header">
    <p @click.prevent = "store.toggle_myorders_nav(false)"><font-awesome-icon class="fa-solid fa-xmark" id = "xmark" icon="fa-solid fa-xmark"/> Close</p>
    </div>

    <div class = "info">
    <h1>Orders</h1>
    </div>

    <div v-if = "orders_store.orders.length > 0"> <!-- if order dey -->
    <template v-for = "order in orders_store.orders" :key = "order.id">
    <div class = "orders" @click.prevent = "view_order(order.order_id)">
    <div class = "first_flex">
    <h2>Taste It</h2>
    <p>{{MIDDLEWARES.formatted_date(order.date_created)}}</p>
    </div>

    <div class = "second_flex">
    <h3>Order {{order.order_id}}</h3>
    <small>View order 
        <b :style = "
        order.status === 'Payment Pending' ? {'color': 'gray'} : order.status === 'Payment Failed' ? {'color': '#DC3545'} : 
        order.status === 'Payment Abandoned' ? {'color': '#B0BEC5'} : order.status === 'Payment Reversed' ? {'color': '#FF5722'} :
        order.status === 'Pending' ? {'color': 'gray'} : order.status === 'Confirmed' ? {'color': '#007BFF'} : 
        order.status === 'Preparing' ? {'color': '#FD7E14'} : order.status === 'Out for Delivery' ? {'color': '#6F42C1'} : 
        order.status === 'Delivered' ? {'color': '#28A745'} : {'color': '#DC3545'}">
        ({{order.status}})
        </b>
    </small>
    </div>
    </div>
    </template>
    </div>

    <div v-else>
        <h1 style="margin: 200px auto 0 auto; font-size: 2rem; text-align: center;">No Order Found</h1>
    </div>

   <div v-if = "orders_store.current_order && store.display_vieworders_nav">

    <VIEWORDER/>

   </div>

  </div>
</template>

<script setup>

import VIEWORDER from "@/components/navigation_bars/ViewOrder.vue";
import { computed, reactive, toRefs, ref, onMounted, watch} from 'vue'
import { useInteractiveStore } from '@/stores/interactive'
import MIDDLEWARES from '../../middlewares/middlewares'
import { useOrdersStore } from '@/stores/orders'

const store = useInteractiveStore()

const orders_store = useOrdersStore()


function view_order(id) {

    orders_store.current_order_id = id

    store.toggle_vieworders_nav(true) //display the nav
    
}



 

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
    z-index: 7;
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
hr {
    margin: 0;
}
#xmark {
    display: inline-block;
    vertical-align: -10%;
    margin: 0px 7px 0px 0;
    font-size: 18px;
}
div.info {
    margin: 30px 0 0 0;
}
div.info h1{
    font-size: 19px;
    color: rgb(3, 43, 3);
    margin: 15px 0 10px 0;
}
div.orders {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    margin: 10px 0 ;
    justify-content: space-between;
}
div.first_flex h2 {
    font-weight: bold;
    font-size: 15px;
}
div.second_flex h3 {
    font-weight: lighter;
    font-size: 13px;
    text-align: right;
    margin-bottom: 5px;
}
div.second_flex small {
    color: green;
    cursor: pointer;
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
hr {
    margin: 0;
}
#xmark {
    display: inline-block;
    vertical-align: -10%;
    margin: 0px 7px 0px 0;
    font-size: 18px;
}
div.info {
    margin: 30px 0 0 0;
}
div.info h1{
    font-size: 19px;
    color: rgb(3, 43, 3);
    margin: 15px 0 10px 0;
}
div.orders {
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    margin: 10px 0 ;
    justify-content: space-between;
}
div.first_flex h2 {
    font-weight: bold;
    font-size: 15px;
}
div.second_flex h3 {
    font-weight: lighter;
    font-size: 13px;
    text-align: right;
    margin-bottom: 5px;
}
div.second_flex small {
    color: green;
    cursor: pointer;
}
}

</style>