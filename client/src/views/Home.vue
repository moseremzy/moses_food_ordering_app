<template>
  <div>
    <HEADER/> 
    <SUCCESSALERTBOX>{{interactive_store.backend_message}}</SUCCESSALERTBOX>
    <ERRORALERTBOX>{{interactive_store.backend_message}}</ERRORALERTBOX>
    <SEARCHRESULT/>
    <MAINNAV/>
    <MYORDERS/>

    <div class="home_container">
      <!-- EXPLORE CATEGORIES -->
      <div class="sections_category">
        <h2>Explore Categories</h2>
        <div class="scroll">
          <router-link to="/shop">
            <div style="background-color: #E7DAA9;">
              <font-awesome-icon style="color: #8C8989;" class="fa-solid fa-utensils section_icons" icon="fa-solid fa-utensils"/>
              <p>Eatery</p>
            </div>
          </router-link>
          <router-link to="/hall-rental">
            <div style="background-color: #9BD1C2;">
              <font-awesome-icon style="color: black;" class="fa-solid fa-hotel section_icons" icon="fa-solid fa-hotel"/>
              <p>Hall/Event Centre Rental</p>
            </div>
          </router-link>
          <router-link to="/shop?category=bread">
            <div style="background-color: #f59842;">
              <font-awesome-icon style="color: pink;" class="fa-solid fa-burger section_icons" icon="fa-solid fa-burger"/>
              <p>Bakery</p>
            </div>
          </router-link>
          <router-link to="/event-management">
            <div style="background-color: #4287f5;">
              <font-awesome-icon style="color: #663131" class="fa-solid fa-people-roof section_icons" icon="fa-solid fa-people-roof"/>
              <p>Outdoor Event Management</p>
            </div>
          </router-link>
          <router-link to="/catering-institute">
            <div style="background-color: gold;">
              <font-awesome-icon style="color: #509ea1" class="fa-solid fa-graduation-cap section_icons" icon="fa-solid fa-graduation-cap"/>
              <p>Catering/Culinary School</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- DISH CATEGORIES -->
      <div class="dish_category">
        <h2>Dish Categories <router-link to="/shop" class="link">All</router-link></h2>
        <div class="scroll1">
          <router-link to="/shop?category=meals/sides">
            <div>
              <img src="../assets/static_images/meals_sides.jpg">
              <p>Meals/Sides</p>
            </div>
          </router-link>
          <router-link to="/shop?category=africana">
            <div>
              <img src="../assets/static_images/africana.jpg">
              <p>Africana Dishes</p>
            </div>
          </router-link>
          <router-link to="/shop?category=snacks">
            <div>
              <img src="../assets/static_images/snacks.jpg">
              <p>Snacks</p>
            </div>
          </router-link>
          <router-link to="/shop?category=bread">
            <div>
              <img src="../assets/static_images/bakery.jpg">
              <p>Bread</p>
            </div>
          </router-link>
          <router-link to="/shop?category=cakes">
            <div>
              <img src="../assets/static_images/cakes.jpg">
              <p>Cakes</p>
            </div>
          </router-link>
          <router-link to="/shop?category=drinks">
            <div>
              <img src="../assets/static_images/drinks.jpg">
              <p>Drinks</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- POPULAR DISHES SECTION -->
      <div class="popular_dishes">
        <h2>Popular Dishes</h2>
        <div class="dishes_grid" v-if = "popularDishes.length > 0">
          <div class="dish_card" v-for="dish in popularDishes" :key="dish.name">
            <img :src= "'https://kelvinspice.com.ng/images/'+dish.image" :alt="dish.name">
            <h3>{{ dish.name }}</h3>
            <p>{{ dish.description }}</p>
            <router-link :to="`/view-dish/${dish.name}`" class="order_button">Order Now</router-link>
          </div>
        </div>
        <ITEMSNOTFOUND v-else/>
      </div>


      <!-- HOW IT WORKS -->
      <div class="steps_section">
        <h2>How It Works</h2>
        <h1>Get Started With 4 Simple Steps</h1>
        <div class="grid">
          <div class="step">
            <div class="step_img">
              <img src="../assets/static_images/icon__step-1.svg">
            </div>
            <div class="step_info">
              <h3><b>01.</b> Search</h3>
              <p>Search for your desired dish</p>
            </div>
          </div>
          <div class="step">
            <div class="step_img">
              <img src="../assets/static_images/icon__step-2.svg">
            </div>
            <div class="step_info">
              <h3><b>02.</b> Choose</h3>
              <p>Select your favorite dish and order from a host of menus readily available</p>
            </div>
          </div>
          <div class="step">
            <div class="step_img">
              <img src="../assets/static_images/icon__step-3.svg">
            </div>
            <div class="step_info">
              <h3><b>03.</b> Make Payment</h3>
              <p>Select a payment option that is convenient for you via debit/credit card or cash on delivery</p>
            </div>
          </div>
          <div class="step">
            <div class="step_img">
              <img src="../assets/static_images/icon__step-4.svg">
            </div>
            <div class="step_info">
              <h3><b>04.</b> Enjoy</h3>
              <p>Get your ordered food right at your doorstep within minutes and enjoy its delicious taste</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="menu">
      <img src="../assets/static_images/menu.png">
    </div> -->

    <WHATSAPP/>

    <COPYRIGHT/>
    <FOOTER/>
  </div>
</template>

<script setup>
import COPYRIGHT from "@/components/Copyright.vue";
import HEADER from "@/components/Header.vue";
import SEARCHRESULT from "@/components/SearchResult.vue";
import MAINNAV from "@/components/navigation_bars/MainNav.vue";
import MYORDERS from "@/components/navigation_bars/MyOrders.vue";
import FOOTER from "@/components/Footer.vue";
import ITEMSNOTFOUND from "@/components/ItemsNotFound.vue";
import { onMounted, onUnmounted, onUpdated, reactive, toRaw, ref, watch} from 'vue'
import MIDDLEWARES from "../middlewares/middlewares"
import { useInteractiveStore } from '@/stores/interactive'
import { useItemStore } from '@/stores/items'
const interactive_store = useInteractiveStore()

const items_store = useItemStore()

const popularDishes = items_store.items.filter((item) => {

       return item.sub_category != 'soup'

}).slice(0, 5)

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
@media only screen and (max-width: 765px) {
  * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

  .tawk-min-container {
      display: none !important; /* Adjust distance from the right */
    }

  div.home_container {
      width: 95%;
      margin: 170px auto;
  }

   div.sections_category{
      margin-bottom: 60px;
  }


  div.sections_category h2{
      font-size: 18px;
      font-weight: lighter;
  }

  div.sections_category h2 .link{
      font-size: 18px;
      float: right; 
      text-decoration: none; 
      color: red; 
      font-weight: lighter;
  }

  div.scroll{
       overflow-x: auto;
       white-space: nowrap;
       scrollbar-width: none;
       margin: 25px 0 0 0;
  }

  div.scroll div{
      cursor: pointer;
      white-space: normal;
      word-wrap: break-word;
      display: inline-block;
      text-align: center;
      width: 120px;
      vertical-align: bottom;
      height: 140px;
      margin-right: 14px;
      padding: 28px 5px;
      border-radius: 7px;
  }

  div.scroll div img{
      display: block;
      width: 100%;
  }

  .section_icons{
      margin-bottom: 10px;
      font-size: 35px;
      color: #8C8989;
  }

  div.scroll div p{
    font-size: 15px;
    color: #484848;
  }
 

 /* dish categories */
 div.dish_category{
      margin-bottom: 60px;
  }


  div.dish_category h2{
      font-size: 18px;
      font-weight: lighter;
  }

  div.dish_category h2 .link{
      font-size: 18px;
      float: right; 
      text-decoration: none; 
      color: red; 
      font-weight: lighter;
  }

  div.scroll1{
       overflow-x: auto;
       white-space: nowrap;
       scrollbar-width: none;
       margin: 25px 0 0 0;
  }

  div.scroll1 div{
      cursor: pointer;
      white-space: normal;
      word-wrap: break-word;
      display: inline-block;
      text-align: center;
      width: 120px;
      vertical-align: bottom;
      height: 120px;
      margin-right: 14px;
      padding: 0px 0px 35px 0px;
      border-radius: 7px;
  }

  div.scroll1 div img{
      display: block;
      height: 100%;
      width: 100%;
  }

  div.scroll1 div p{
    font-size: 15px;
    color: #484848;
  }

  /* steps_section */
  div.steps_section h2{
      font-weight: lighter;
      color: green;
      font-size: 21px;
      margin-bottom: 8px;
  }

  div.steps_section h1{
      font-size: 21px;
  }

  div.step {
      margin: 16px 0px;
      display: flex;
      align-items: center;
  }

  div.step_img {
      margin-right: 10px;
  }

  div.step_img img{
     width: 70px;
  }

  div.step_info h3{
      font-weight: bold;
      color: #484848;
      font-size: 16px;
  }

  div.step_info b{
      color: red;
      margin-right: 5px;
      font-weight: lighter;
      font-size: 16px;
  }

  div.step_info p{
      margin-top: 5px;
      color: gray;
      font-size: 16px;
  }

  /* menu */
  div.menu {
      background-color: green;
      margin: 50px 0px;
      width: 100%;
      padding: 20px 0px;
  }

   div.menu img{
      display: block;
      background-color: green;
      width: 90%;
      border-radius: 12px;
      margin: 0 auto;
  }
    
  .dishes_grid {
      display: block;
  }

  
  .dish_card {
      background-color: white;
      padding: 15px;
      border-radius: 8px;
      margin: 30px 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
  }

  .dish_card img{
      width: 100%;
      object-fit: cover;
      height: 250px;
  }


}

/***** Add new styles for popular dishes and testimonials *****/
.popular_dishes {
  margin-bottom: 60px;
  padding: 20px;
  background-color: #f9f9f9;
}

.popular_dishes h2 {
  color: #c76515;
  margin-bottom: 20px;
  text-align: center;
}

.dish_card img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
}

.dish_card h3 {
  color: #333;
  font-size: 19px;
  margin-bottom: 10px;
}

.dish_card p {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
}

.order_button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #c76515;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.order_button:hover {
  background-color: #a85412;
}

/* DESKTOP */
@media only screen and (min-width: 765px) {
  * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

  div.home_container {
      width: 95%;
      margin: 170px auto;
  }

   div.sections_category{
      margin-bottom: 60px;
  }


  div.sections_category h2{
      font-size: 23px;
      font-weight: lighter;
  }

  div.sections_category h2 .link{
      font-size: 18px;
      float: right; 
      text-decoration: none; 
      color: red; 
      font-weight: lighter;
  }

  div.scroll{
       overflow-x: auto;
       white-space: nowrap;
       scrollbar-width: none;
       margin: 25px 0 0 0;
  }

  div.scroll div{
      cursor: pointer;
      white-space: normal;
      word-wrap: break-word;
      display: inline-block;
      text-align: center;
      width: 140px;
      vertical-align: bottom;
      height: 140px;
      margin-right: 14px;
      padding: 28px 5px;
      border-radius: 7px;
  }

  div.scroll div img{
      display: block;
      width: 100%;
  }

  .section_icons{
      margin-bottom: 10px;
      font-size: 35px;
      color: #8C8989;
  }

  div.scroll div p{
    font-size: 16px;
    color: #484848;
  }
 

 /* dish categories */
 div.dish_category{
      margin-bottom: 60px;
  }


  div.dish_category h2{
      font-size: 23px;
      font-weight: lighter;
  }

  div.dish_category h2 .link{
      font-size: 18px;
      float: right; 
      text-decoration: none; 
      color: red; 
      font-weight: lighter;
  }

  div.scroll1{
       overflow-x: auto;
       white-space: nowrap;
       scrollbar-width: none;
       margin: 25px 0 0 0;
  }

  div.scroll1 div{
      cursor: pointer;
      white-space: normal;
      word-wrap: break-word;
      display: inline-block;
      text-align: center;
      width: 180px;
      vertical-align: bottom;
      height: 150px;
      margin-right: 14px;
      padding: 0px 0px 35px 0px;
      border-radius: 7px;
  }

  div.scroll1 div img{
      display: block;
      height: 100%;
      width: 100%;
  }

  div.scroll1 div p{
    color: #484848;
    font-size: 17px;
  }

  /* steps_section */
  div.steps_section h2{
      font-weight: lighter;
      color: green;
      font-size: 21px;
      margin-bottom: 8px;
  }

  div.steps_section h1{
      font-size: 21px;
  }

  div.grid {
      display: grid;
      grid-template-columns: auto auto;
      column-gap: 30px;
  }

  div.step {
      margin: 16px 0px;
      display: flex;
      align-items: center;
  }

  div.step_img {
      margin-right: 10px;
  }

  div.step_img img{
     width: 70px;
  }

  div.step_info h3{
      font-weight: bold;
      color: #484848;
      font-size: 18px;
  }

  div.step_info b{
      color: red;
      margin-right: 5px;
      font-weight: lighter;
      font-size: 18px;
  }

  div.step_info p{
      margin-top: 5px;
      color: gray;
      font-size: 18px;
  }

  /* menu */
  div.menu {
      background-color: green;
      margin: 50px 0px;
      width: 100%;
      padding: 20px 0px;
  }

   div.menu img{
      display: block;
      background-color: green;
      width: 30%;
      border-radius: 12px;
      margin: 0 auto;
  }

  .dishes_grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* Fixed to 3 columns */ /* Responsive grid with a minimum column width */
  }

  .dish_card {
      background-color: white;
      padding: 15px;
      border-radius: 8px;
      margin: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
  }

  .dish_card img{
      width: 100%;
      object-fit: cover;
      height: 250px;
  }

}
</style>