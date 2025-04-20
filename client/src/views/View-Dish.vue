<template>

 <div>

 <HEADER/> 

 <SUCCESSALERTBOX>Item added Successfully</SUCCESSALERTBOX>

 <ERRORALERTBOX>Error occured, try again.</ERRORALERTBOX>

 <SEARCHRESULT/>

 <SOUPSELECTION/>

 <MAINNAV/>

 <MYORDERS/>

   <div class = "container" v-if = "item[0]" :key = "item[0].name">

       <div class = "grid">

       <div class = "image"> 

        <img :src= "'https://mosesfoodorderingapp.kelvinspice.com.ng/images/'+item[0].image" :alt="item[0].name">

       </div>

       <div class = "info">

        <h1>{{item[0].name}}</h1>

        <p>{{item[0].description}}</p>

        <h3>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item[0].price)}}</h3>
        
        <p style = "font-weight: bold; font-size: 17px; color: rgb(48, 47, 47);">Quantity: 
        <b>
            <button id = "plus" @click = "quantity++">+</button>
              <input type = "number" id = "quantity" v-model = "quantity"  min="1" max="" name="quantity" readonly>
            <button id = "minus" @click = "quantity > 1 ? quantity-- : null">-</button>
        </b>
        </p>

        <button @click = "AddToCart(item[0], quantity)" v-if = "settingStore.market_status === 'open'" id = "checkout" >Add to Cart</button>

       </div>  

       </div>

       <div class = "related_product">

         <hr>

        <h1>You Might Also Like</h1>

        <DISHES :items = "paginatedOrders"/>

       </div>

     <PAGINATION 
          :currentPage="currentPage" 
          :totalPages="totalPages" 
          @update:currentPage="currentPage = $event" 
          v-if = "paginatedOrders.length > 0"
      />

   
    <WHATSAPP/>

   </div> <!-- CONTAINER -->

 <FOOTER/>

 </div>
</template>

<script setup>
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import SEARCHRESULT from "@/components/SearchResult.vue";
import WHATSAPP from "../components/Whatsapp.vue"
import PAGINATION from '../components/Pagination.vue'
import COPYRIGHT from "@/components/Copyright.vue";
import HEADER from "@/components/Header.vue";
import FOOTER from "@/components/Footer.vue";
import SOUPSELECTION from "../components/modals/soup_selection_modal.vue";
import MAINNAV from "@/components/navigation_bars/MainNav.vue";
import MYORDERS from "@/components/navigation_bars/MyOrders.vue";
import { onMounted, onUnmounted, onUpdated, watch, computed, reactive, toRefs, ref} from 'vue'
import DISHES from "@/components/DishList.vue";
import MIDDLEWARES from "../middlewares/middlewares"

import { useItemStore } from '@/stores/items'
import { useSettingStore } from '@/stores/settings'
import { useInteractiveStore } from '@/stores/interactive'
const interactive_store = useInteractiveStore()
      
const route = useRoute()

const router = useRouter()

const items_store = useItemStore()

const settingStore = useSettingStore()

const items = reactive(items_store.items)

const item_name = route.params.item

const item = ref([])

const relatedItems = ref([]);

let quantity = ref(1)



// Pagination State
const currentPage = ref(1);

const itemsPerPage = 7;



function AddToCart(item, quantity) {

    if (item.sub_category === "swallow") { //if the item dem wan add to cart na swallow

        items_store.selectedSwallow = item //save the swallow for store first

        items_store.selectedSwallow.temporal_quantity = quantity //save the quantity also

        interactive_store.toggle_soup_selection_modal(true) //display am

    } else {

       items_store.add_to_cart(item, quantity)

    }

}


/* Hooks */

onMounted(() => {

    MIDDLEWARES.allowScroll()
    
})


onUpdated(() => {

    MIDDLEWARES.allowScroll()
    
})


function getItems(item_name) { 

 item.value = items.filter((product) => { //get individual item

    return product.name.toLowerCase() === item_name.toLowerCase();

  })

  
if (item.value.length < 1 ) { //if item nor dey. redirect to page not found

   router.push({name: "home"})
    
}

relatedItems.value = items.filter((product) => { //get related items

    return product.category.toLowerCase() === item.value[0].category.toLowerCase() && product.name != item_name.toLowerCase() && product.sub_category != 'soup';

})

   
}

getItems(item_name)


// Paginated Orders
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return relatedItems.value.slice(start, end);
});



// Total Pages
const totalPages = computed(() => Math.ceil(relatedItems.value.length / itemsPerPage));
    
 

/* Route Guards */

onBeforeRouteUpdate(to => {

    getItems(to.params.item)

});

/* Route Guards */




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
      margin: 170px auto 120px auto;
  }

  div.image {
      border: 1px solid rgb(211, 211, 211);
      padding: 20px;
      margin: auto;
      display: block;
  }

  div.image img{
      display: block;
      width: 100%;
      height: 250px;
      object-fit: cover;
      margin: auto;
  }

  div.info {
      margin: 20px 0 0 0;
  }

  div.info h1{
      font-size: 22px;
      font-weight: bolder;
      margin: 0px 0 10px 0;
  }

  div.info p{
      line-height: 25px;
      color: rgb(48, 47, 47);
      font-size: 17px;
  }

  div.info h3{
      line-height: 25px;
      margin: 10px 0;
      color: green;
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
      padding: 1px 9px 3px 9px;
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
      background-color: green;
  }

  div.related_product {
      margin-top: 30px;
  }

  div.related_product h1{
      font-size: 21px;
      color: rgb(66, 66, 66);
      margin: 20px 0 0 0;
      text-align: center;
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
      width: 80%;
      margin: 170px auto 120px auto;
  }

  div.grid {
      display: grid;
      align-items: flex-start;
      column-gap: 30px;
      grid-template-columns: 60% auto;
  }

  div.image {
      border: 1px solid rgb(211, 211, 211);
      padding: 20px;
      margin: 0;
      display: block;
  }

  div.image img{
      display: block;
      width: 100%;
      height: 400px;
      object-fit: cover;
      margin: auto;
  }

  div.info {
      margin: 0px 0 0 0;
  }

  div.info h1{
      font-size: 23px;
      font-weight: bolder;
      margin: 0px 0 10px 0;
  }

  div.info p{
      font-size: 17px;
      line-height: 25px;
      color: rgb(48, 47, 47);
  }

  div.info h3{
      line-height: 25px;
      margin: 10px 0;
      font-size: 20px;
      color: green;
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
      padding: 1px 9px 3px 9px;
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

  button#checkout {
      color: white;
      border: 0;
      padding: 10px;
      display: block;
      width: 100%;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 17px;
      cursor: pointer;
      margin: 40px 0 0px 0;
      background-color: green;
  }

  div.related_product {
      margin-top: 50px;
  }

  div.related_product h1{
      font-size: 21px;
      color: rgb(66, 66, 66);
      margin: 20px 0 0 0;
      text-align: center;
  }
}
</style>