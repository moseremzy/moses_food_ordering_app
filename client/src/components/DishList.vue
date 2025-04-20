<template>
    <div>
        <div class = "all_items" v-if = "items.length > 0"> 
        <template v-for = "item in items" :key = "item.name">
          <div class = "item">
            <router-link :to = "'/view-dish/'+item.name" id = 'link'>
            <div class = "item_info">
            <h2>{{item.name}}</h2>
            <p>{{ item.description.length > 50 ? item.description.slice(0, 50) + '...' : item.description}}</p>
            <h3>{{new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(item.price)}}</h3>
            </div>
            </router-link>

            <div class = "image_cart">
            <router-link :to = "'/view-dish/'+item.name" id = 'link'><img :src= "'http://mosesfoodorderingapp.kelvinspice.com.ng/images/'+item.image"></router-link> 
            <button @click = "AddToCart(item, 1)" v-if = "market_status === 'open'">Add to Cart</button>
            </div>
        </div>
        </template>
      </div>

    <ITEMSNOTFOUND v-else/>

    </div>
</template>

<script setup>

import ITEMSNOTFOUND from "@/components/ItemsNotFound.vue";

import { computed, reactive, toRefs, ref} from 'vue'

import { useItemStore } from '@/stores/items'

import { useInteractiveStore } from '@/stores/interactive'

const items_store = useItemStore()

const interactive_store = useInteractiveStore()

const props = defineProps({

  items: Object,

  market_status: String,

})


const { items, market_status } = toRefs(props)

console.log(items.value)

function AddToCart(item, quantity) {

    if (item.sub_category === "swallow") { //if the item dem wan add to cart na swallow

        items_store.selectedSwallow = item //save the swallow for store first

        items_store.selectedSwallow.temporal_quantity = quantity //save the quantity also
        
        interactive_store.toggle_soup_selection_modal(true) //display am

    } else {

       items_store.add_to_cart(item, quantity)

    }

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

  div.all_items {
      margin-top: 30px;
      display: block;
  }

  div.item {
      display: flex;
      justify-content: space-between;
      border-radius: 7px;
      margin-bottom: 30px;
      padding: 0px 0px 10px 15px;
      background-color: #D9D9D9;
  }

  div.image_cart img{
      width: 40vw;
      height: 20vh;
      object-fit: cover;
      border-top-right-radius: 7px;
      display: block;
      margin-bottom: 20px;
      float: right;
  }

  div.image_cart button{
      display: block;
      clear: both;
      color: white;
      background-color: green;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 15px;
      border: 0px;
  }

  #link {
      text-decoration: none;
      display: block;
      width: 100%;
      color: rgb(41, 40, 40);
  }

  div.item_info {
      width: 70%;  
  } 

  div.item_info h2 {
      margin: 20px 0 10px 0;
      font-size: 18px;
  } 

  div.item_info p {
      margin: 0 0 10px 0;
      color: #5A4F4F; 
  } 

  div.item_info h3 {
      font-size: 17px;
      font-weight: bold;
      color: #1E6643; 
  } 
   
}



/* DESKTOP */
@media only screen and (min-width: 765px) {
    * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }
  
  div.all_items {
      margin-top: 30px;
      display: grid;
      column-gap: 20px;
      grid-template-columns: auto auto;
  }

  div.item {
      display: flex;
      justify-content: space-between;
      border-radius: 7px;
      margin-bottom: 30px;
      padding: 0px 0px 10px 15px;
      background-color: #D9D9D9;
  }

  div.image_cart img{
      width: 200px;
      height: 160px;
      object-fit: cover;
      border-top-right-radius: 7px;
      display: block;
      margin-bottom: 20px;
      float: right;
  }

#link {
      text-decoration: none;
      display: block;
      width: 100%;
      color: rgb(41, 40, 40);
  }

  div.image_cart button{
      display: block;
      clear: both;
      color: white;
      background-color: green;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 15px;
      border: 0px;
  }

  div.item_info {
      width: 50%;  
  } 

  div.item_info h2 {
      margin: 20px 0 10px 0;
      font-size: 18px;
  } 

  div.item_info p {
      margin: 0 0 10px 0;
      color: #5A4F4F; 
  } 

  div.item_info h3 {
      font-weight: bold;
      font-size: 18px;
      color: #1E6643; 
  } 
}

</style>