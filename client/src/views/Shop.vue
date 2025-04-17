<template>

 <div>

 <HEADER/> 

 <SUCCESSALERTBOX>Item added Successfully</SUCCESSALERTBOX>

 <ERRORALERTBOX>Error occured, try again.</ERRORALERTBOX>

 <SEARCHRESULT/>

 <SOUPSELECTION/>

 <MAINNAV/>

 <MYORDERS/>

   <div class = "container">
   
       <div class = "open">

        <h1 style = "color: white; background-color: green;" v-if = "settingStore.market_status === 'open'">WE ARE OPEN. PLACE YOUR ORDERS.</h1>

        <h1 style = "color: white; background-color: red;" v-else>CLOSED. OPEN AT 8:00 AM.</h1>

       </div>

       <h2>Taste It <small>8:00 am - 10:00 pm</small></h2>
       <span>
           <router-link to = "/shop?category=meals/sides" class="link">meals/sides</router-link>
           <router-link to = "/shop?category=africana" class="link">Africana Dishes</router-link>
           <router-link to = "/shop?category=snacks" class="link">snacks</router-link>
           <router-link to = "/shop?category=drinks" class="link">drinks</router-link>
           <router-link to = "/shop?category=cakes" class="link">cakes</router-link>
       </span>

      <div class = "dish_categories">
      
        <router-link to = "" @click.prevent = "overall_func('all')" id = 'all' class = "router_link" style>all</router-link>

        <router-link to = "" @click.prevent = "overall_func('meals/sides')" id = "meals/sides" class = "router_link" style>meals/sides</router-link>

        <router-link to = "" @click.prevent = "overall_func('africana')" id = "africana" class = "router_link" style>africana Dishes</router-link>

        <router-link to = "" @click.prevent = "overall_func('drinks')" class = "router_link" id = "drinks" style>drinks</router-link>

        <router-link to = "" @click.prevent = "overall_func('bread')" id = "bread" class = "router_link" style>bread</router-link>

        <router-link to = "" @click.prevent = "overall_func('cakes')" id = "cakes" class = "router_link">cakes</router-link>

        <router-link to = "" @click.prevent = "overall_func('snacks')" id = "snacks" class = "router_link">snacks</router-link>

      </div>

      <p style="margin-top: 20px;">Showing {{filteredItems.length > 0 ? 1 : 0}}–{{paginatedOrders.length}} of {{filteredItems.length}} results</p>

      <div class="dishes-section">

        <DISHES :items="paginatedOrders" :market_status="settingStore.market_status" />
      
      </div>

      <PAGINATION 
          :currentPage="currentPage" 
          :totalPages="totalPages" 
          @update:currentPage="currentPage = $event" 
          v-if = "paginatedOrders.length > 0"
      />

   
    <WHATSAPP/>
 
    <FOOTER/>

     </div> <!-- CONTAINER -->

 </div>
</template>

<script setup>
import COPYRIGHT from "@/components/Copyright.vue";
import WHATSAPP from "../components/Whatsapp.vue"
import PAGINATION from '../components/Pagination.vue';
import SEARCHRESULT from "@/components/SearchResult.vue";
import HEADER from "@/components/Header.vue";
import FOOTER from "@/components/Footer.vue";
import DISHES from "@/components/DishList.vue";
import SOUPSELECTION from "../components/modals/soup_selection_modal.vue";
import MAINNAV from "@/components/navigation_bars/MainNav.vue";
import MYORDERS from "@/components/navigation_bars/MyOrders.vue";
import SUCCESSALERTBOX from "@/components/alert_box/success.vue";
import ERRORALERTBOX from "@/components/alert_box/error.vue";
import { onMounted, onUnmounted, onUpdated, computed, reactive, toRefs, ref, watch} from 'vue'
import MIDDLEWARES from "../middlewares/middlewares"
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useItemStore } from '@/stores/items'
import { useSettingStore } from '@/stores/settings'

const route = useRoute()
const router = useRouter()




const settingStore = useSettingStore()

const items_store = useItemStore()

const items = reactive(items_store.items)

let tab_clicked = ref("");



// Pagination State
const currentPage = ref(1);
const itemsPerPage = 10;



watch( // Reset pagination
  [() => tab_clicked.value],
  () => {
    currentPage.value = 1; 
  }
);



let filteredItems = computed(() => { //search for item

    return items.filter((item) => {

    return (tab_clicked.value === 'all' ? item : item.category.toLowerCase() === tab_clicked.value.toLowerCase()) && item.sub_category != 'soup' ;

  })

})


// Paginated Orders
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItems.value.slice(start, end);
});



// Total Pages
const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));


/* Hooks */

onMounted(() => {

    MIDDLEWARES.allowScroll()

    route.query.category ? overall_func(route.query.category) : overall_func('all') //if category dey link use am, otherwise make all be default
    
})


onUpdated(() => { 

    MIDDLEWARES.allowScroll()
    
})


/* Route Guards */

onBeforeRouteUpdate(to => {

    to.query.category ? overall_func(to.query.category) : overall_func('all') //if category dey link use am, otherwise make all be default

});

/* Route Guards */




/* methods */

function overall_func(category) {

  tab_clicked.value = category;

  const all_tabs = document.querySelectorAll(".router_link");

  all_tabs.forEach((tab) => {
  
  tab.style = tab.id === tab_clicked.value ? "background-color: green; color: white" : "";
  
  });

  window.innerWidth <= 550 ? scrollTo() : null
  
}

function scrollTo() {
  const scroll_to_section = document.querySelectorAll(".dishes-section");
  if (scroll_to_section.length > 0) {
    scroll_to_section[0].scrollIntoView({ behavior: "smooth", block: "start" });
  }
}


/* event hooks */
 


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

  div.open {
      text-align: center;
      padding: 20vw 20px;
      background-image: url('../assets/static_images/open.jpg');
      background-size: 100%;
      background-repeat: no-repeat;
      border-radius: 12px;
      filter: brightness(0.7);
  }

  div.open h1{
       color: white;
       padding: 8px;
       display: inline-block;
       border-radius: 12px;
       background-color:green;
       font-weight: lighter;
       font-size: 16px;
  }

  h2 {
      margin: 4px 0;
      font-size: 22px;
      font-weight: 500;
  }

  small {
      align-items: flex-end;
      display: inline-block;
      margin-top: 8px;
      float: right;
      font-weight: lighter;
      font-size: 14px;
  }

  span {
      display: inline-block;
      width: 40%;
  }

  span .link{
      color: green;
      display: inline-block;
      margin: 0px 5px 5px 0px;
      font-size: 14px;
      text-decoration: none;
  }

  div.dish_categories{
       overflow-x: auto;
       white-space: nowrap;
       margin: 25px 0 0 0;
  }

  div.dish_categories .router_link{
      cursor: pointer;
      white-space: normal;
      display: inline-block;
      text-align: center;
      padding: 20px;
      font-size: 13px;
      margin: 0px 20px 10px 0px;
      background-color: #D5EFE3;
      border-radius: 7px;
      text-transform: uppercase;
      text-decoration: none;
  }

  div.dish_categories .router_link:hover{
      background-color: green;
      color: white;
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
      padding: 70px;
      border: 1px solid rgb(201, 199, 199);
      margin: 170px auto;
  }

  div.open {
      text-align: center;
      padding: 10vw 20px;
      background-image: url('../assets/static_images/open.jpg');
      background-size: 100%;
      background-repeat: no-repeat;
      border-radius: 12px;
      filter: brightness(0.7);
  }

  div.open h1{
       color: white;
       padding: 8px;
       display: inline-block;
       border-radius: 12px;
       background-color:green;
       font-weight: lighter;
       font-size: 16px;
  }

  h2 {
      margin: 4px 0;
      font-size: 25px;
      font-weight: 500;
  }

  small {
      align-items: flex-end;
      display: inline-block;
      margin-top: 8px;
      float: right;
      font-weight: lighter;
      font-size: 16px;
  }

  span {
      display: inline-block;
      width: 40%;
  }

  span .link{
      color: green;
      display: inline-block;
      margin: 0px 5px 5px 0px;
      font-size: 16px;
      text-decoration: none;
  }

  div.dish_categories{
       overflow-x: auto;
       white-space: nowrap;
       margin: 25px 0 0 0;
  }

  div.dish_categories .router_link{
      cursor: pointer;
      white-space: normal;
      display: inline-block;
      text-align: center;
      padding: 20px;
      font-size: 14px;
      margin: 0px 20px 10px 0px;
      background-color: #D5EFE3;
      border-radius: 7px;
      text-transform: uppercase;
      text-decoration: none;
  }

  div.dish_categories .router_link:hover{
      background-color: green;
      color: white;
  }

}
</style>