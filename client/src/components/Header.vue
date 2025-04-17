<template>

 <div class = "header_container">

 <div class = "header">

    <div><font-awesome-icon class="fa-solid fa-navicon" @click = "interactive_store.toggle_main_nav(true)" id="hamburger" icon="fa-solid fa-navicon"/></div>

    <div class="logo"><a href="#"><img src="../assets/static_images/logo.png" id="logo" alt="Logo"></a></div> 

    <div><router-link to = "/cart"><font-awesome-icon  class="fa-solid fa-cart-shopping" id = "cart" icon="fa-solid fa-cart-shopping"/><b id = "cart_length" v-if = "items_store.total_cart_items > 0">{{items_store.total_cart_items}}</b></router-link></div>
    
 </div>

 <SEARCHBOX/> 

 </div>

</template>

<script setup>
import SEARCHBOX from "@/components/SearchBox.vue";   
import { onMounted, onUnmounted, onUpdated, reactive, toRaw, ref, watch} from 'vue'
import { useInteractiveStore } from '@/stores/interactive'
import { useItemStore } from '@/stores/items'

const interactive_store = useInteractiveStore()

const items_store = useItemStore()

</script>

<style scoped>
/* MOBILE DEVICES */
@media only screen and (max-width: 765px) {
* {
      margin: 0;
      padding: 0;
      font-family: 'Nuosu SIL';
  }

  div.header_container {
      position: fixed;
      z-index: 2;
      top: 0;
      left: 0;
      padding: 0;
      background-color: rgb(255, 254, 254);
      width: 100%;
  }

  div.header {
      display: flex;
      padding: 5px 10px;
      align-items: center;
      justify-content: space-between;
  }

  #hamburger {
      font-size: 20px;
  }

  div.logo a img {
      display: block;
      width: 120px;
      height: 70px;
  }

  #cart {
      color: rgb(36, 35, 35);
      font-size: 20px;
  }

  #cart_length {
    color:white; 
    font-weight: lighter; 
    border-radius: 50%; 
    font-size: 11px; 
    background-color: #00aeff; 
    padding: 0px 4px;
}

}
/* MOBILE DEVICES */



/* DESKTOP DEVICES */
@media only screen and (min-width: 765px) {
 * {
      margin: 0;
      padding: 0;
      font-family: 'Nuosu SIL';
  }

  div.header_container {
      position: fixed;
      z-index: 2;
      top: 0;
      left: 0;
      padding: 0;
      background-color: rgb(255, 254, 254);
      width: 100%;
  }

  div.header {
      display: flex;
      padding: 5px 50px;
      align-items: center;
      justify-content: space-between;
  }

  #hamburger {
      cursor: pointer;
      font-size: 20px;
  }

  div.logo a img {
      display: block;
      width: 120px;
      height: 70px;
  }

  #cart {
      color: rgb(36, 35, 35);
      font-size: 20px;
      cursor: pointer;
  }

    #cart_length {
    color:white; 
    font-weight: lighter; 
    border-radius: 50%; 
    font-size: 11px; 
    background-color: #00aeff; 
    padding: 0px 4px;
}

}
</style>