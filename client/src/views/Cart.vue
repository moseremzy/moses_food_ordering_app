<template>

 <div>

 <HEADER/> 

 <SUCCESSALERTBOX>{{interactive_store.backend_message}}</SUCCESSALERTBOX>

 <ERRORALERTBOX>{{interactive_store.backend_message}}</ERRORALERTBOX>

 <SEARCHRESULT/>

 <MAINNAV/>

 <MYORDERS/>

   <div class = "container" v-if = "items_store.cart_items.length > 0">

      <h1>Your Cart</h1>

      <div class = "grid">
       
       <template v-for = "item in items_store.cart_items" :key = "item.name">
       
       <div class = "item">

        <hr>

        <p>Product: <b style = "font-weight: lighter; font-size: 16px;">{{ item.soup ? `${item.name} and ${item.soup}` : item.name}}</b></p>
         
         <hr>

        <p>Price: <b>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.price)}}</b></p>

         <hr>

        <p>Quantity: 
        <b>
            <button id = "plus" @click = "increment_quantity(item)">+</button>
              <input type = "number" id = "quantity" v-model = "item.quantity"  min="1" max="" name="quantity" readonly>
            <button id = "minus" @click = "decrement_quantity(item)">-</button>
        </b>
        </p>

        <hr>

        <p style = "color: green;">Total: <b style="color: green; font-weight: lighter;">{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.total)}}</b></p>

         <hr style = "margin-bottom: 0;">

        <font-awesome-icon @click = "items_store.remove_from_cart(item)" style ="color: #663131"  class="fa-solid fa-trash" id = "trash" icon="fa-solid fa-trash"/>

      </div> 

    </template>   

    </div> <!-- grid -->


      <div class = "cart_total"> 
          
        <h2>CART TOTALS</h2>

        <hr>

        <p>Subtotal: <b>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(items_store.cart_subtotal_amount)}}</b></p>

        <hr>
          
        <p>Service Fee: <b>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(setting_store.service_fee)}}</b></p>
         
        <hr>

        <p>Total: <b>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(items_store.cart_total_amount)}}</b></p>

         <hr>

      </div>


      <router-link to = "/account/checkout" id = "checkout" v-if = "setting_store.market_status === 'open'">Proceed to Checkout</router-link>

        
   </div> <!-- CONTAINER -->

   <div class = "container" v-else> <!-- CART EMPTY -->
 
      <h1>Your Cart</h1>

      <EMPTYCART/>

   </div>
   
   <WHATSAPP/>

 <FOOTER/>

 </div>
</template>

<script setup>
import SEARCHRESULT from "@/components/SearchResult.vue";
import EMPTYCART from "@/components/EmptyCart.vue";
import COPYRIGHT from "@/components/Copyright.vue";
import HEADER from "@/components/Header.vue";
import MAINNAV from "@/components/navigation_bars/MainNav.vue";
import MYORDERS from "@/components/navigation_bars/MyOrders.vue";
import FOOTER from "@/components/Footer.vue";
import { useItemStore } from '@/stores/items'
import { onMounted, onUnmounted, onUpdated, reactive, toRaw, ref, watch} from 'vue'
import MIDDLEWARES from "../middlewares/middlewares"
import { useInteractiveStore } from '@/stores/interactive'
import { useSettingStore } from '@/stores/settings'

const items_store = useItemStore()
const interactive_store = useInteractiveStore()
const setting_store = useSettingStore()

/* Hooks */

onMounted(() => {

    MIDDLEWARES.allowScroll()
    
})


onUpdated(() => {

    MIDDLEWARES.allowScroll()
    
})


// Function to increment item quantity
function increment_quantity(item) {
  const targetItem = items_store.cart_items.find(cartItem => cartItem.name === item.name);
  if (targetItem) {
    targetItem.quantity++;
    targetItem.total = targetItem.price * targetItem.quantity; // Update total
  }
  items_store.save_cart_to_Lstorage() //store cart items for localstorage
}


// Function to decrement item quantity
function decrement_quantity(item) {
  const targetItem = items_store.cart_items.find(cartItem => cartItem.name === item.name);
  if (targetItem) {
    targetItem.quantity > 1 ? targetItem.quantity-- : null
    targetItem.total = targetItem.price * targetItem.quantity; // Update total
  }
  items_store.save_cart_to_Lstorage() //store cart items for localstorage
}

</script>

<style scoped>
/* MOBILE DEVICES */
@media only screen and (max-width: 765px) {
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

  .item {
      margin-bottom: 70px;
  }

  hr {
      margin: 18px 0px;
  }

  .item p {
      font-size: 17px;
      font-weight: bold;
  }

  .item b {
      font-size: 16px;
      float: right;
  }

  button#plus {
      cursor: pointer;
      padding: 1px 4px 1px 4px;
      border: 2px solid #14FF8E;
      background-color: #14FF8E;
      font-size: 15px;
      color: white;
      font-weight: bold;
  }

   button#minus {
      cursor: pointer;
      text-align: center;
      padding: 1px 9px 1px 9px;
      border: 1px solid #A8151B;
      background-color: #A8151B;
      font-size: 16px;
      color: white;
      font-weight: bold;
  }

  input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }

    input[type=number] {
        -moz-appearance: textfield; 
    }

  #quantity {
      width: 34px;
      font-weight: lighter;
      text-align: center;
      padding: 1px 0;
      border-right: 0;
      font-size: 15px;
      border-left: 0;
      border-top: 2px solid rgb(209, 206, 206);
      border-bottom: 2px solid rgb(209, 206, 206);
  }

  #quantity:focus {
      outline: 0;
  }

  #trash {
      float: right;
      font-size: 17px;
      margin-top: 10px;
      cursor: pointer;
  }

  div.cart_total {
      margin-top: 70px;
  }

  div.cart_total h2{
      color: #12673E;
      font-weight: lighter;
      font-size: 16px;
  }

  div.cart_total p{
      font-size: 17px;
      font-weight: bold;
  }

  div.cart_total b{
      float: right;
  }

  #checkout {
      text-align: center;
      text-decoration: none;
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
@media only screen and (min-width: 765px) {
  * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

  div.container {
      width: 95%;
      padding: 40px 0px 40px 30px;
      border: 1px solid rgb(201, 199, 199);
      margin: 170px auto;
  }

  h1 {
      margin-bottom: 30px;
      color: #3F6B56;
      font-size: 24px;
      font-weight: lighter;
  }

  div.grid {
      display: grid;
      grid-template-columns: auto auto;
      column-gap: 40px;
      row-gap: 40px;
  }

  .item {
      padding: 50px;
      border: 1px solid rgb(179, 177, 177);
      margin: 0px;
  }

  hr {
      margin: 18px 0px;
  }

  .item p {
      font-size: 17px;
      font-weight: bold;
  }

  .item b {
      font-size: 16px;
      float: right;
  }

  button#plus {
      cursor: pointer;
      padding: 1px 4px 1px 4px;
      border: 2px solid #14FF8E;
      background-color: #14FF8E;
      font-size: 15px;
      color: white;
      font-weight: bold;
  }

   button#minus {
      cursor: pointer;
      text-align: center;
      padding: 1px 9px 1px 9px;
      border: 1px solid #A8151B;
      background-color: #A8151B;
      font-size: 16px;
      color: white;
      font-weight: bold;
  }

  input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }

    input[type=number] {
        -moz-appearance: textfield; 
    }

  #quantity {
      width: 34px;
      font-weight: lighter;
      text-align: center;
      padding: 1px 0;
      border-right: 0;
      font-size: 15px;
      border-left: 0;
      border-top: 2px solid rgb(209, 206, 206);
      border-bottom: 2px solid rgb(209, 206, 206);
  }


  #quantity:focus {
      outline: 0;
  }

  #trash {
      float: right;
      font-size: 17px;
      margin-top: 10px;
      cursor: pointer;
  }

  div.cart_total {
      width: 50%;
      margin: 70px auto 70px auto;
  }

  div.cart_total h2{
      color: #12673E;
      font-weight: lighter;
      font-size: 16px;
  }

  div.cart_total p{
      font-size: 17px;
      font-weight: bold;
  }

  div.cart_total b{
      float: right;
  }

  #checkout {
      color: white;
      text-align: center;
      text-decoration: none;
      border: 0;
      padding: 10px;
      display: block;
      width: 40%;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 17px;
      cursor: pointer;
      margin: 40px auto 0px auto;
      background-color: #14FF8E;
  }
}
</style>