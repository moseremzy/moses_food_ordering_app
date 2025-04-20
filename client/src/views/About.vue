<template>

 <div>

 <HEADER/> 

 <SUCCESSALERTBOX>{{interactive_store.backend_message}}</SUCCESSALERTBOX>

 <ERRORALERTBOX>{{interactive_store.backend_message}}</ERRORALERTBOX>

 <SEARCHRESULT/>

 <MAINNAV/>

 <MYORDERS/>

   <div class = "about_us_container">

      <h1>About Us</h1>

      <div class = "about_us">

        <p>At Taste It, we believe great food should be just a tap away. Our mission is to bring flavor, convenience, and satisfaction to your doorstep with every order.

Whether you're craving local favorites, continental dishes, or quick bites, we've got you covered. With a user-friendly platform and fast delivery, your next meal is only minutes away.

We're passionate about food, service, and tech — and it shows in every dish we serve.</p>

      </div>

      <div class = "grid">

      <!-- <div class = "image">

       <img src = "../assets/static_images/kelvin_spice.jpg" alt="">

      </div> -->

      <div class = "story_mission story">

        <h2>Our Story</h2>

        <p>Founded on a passion for food and a love for memorable moments, Taste It was created to bring joy to every table. What started as a small idea quickly grew into a full-fledged food and events service, focused on quality, creativity, and a personal touch.

Our team is driven by the belief that great food and thoughtful service can turn any occasion into something truly special — whether it’s a cozy family dinner or a large-scale event.</p>

      </div>

      <div class = "story_mission mission">

        <h2>Our Mission</h2>

        <p>At Taste It, our mission is simple: to deliver amazing flavors, exceptional service, and unforgettable experiences. We go the extra mile to ensure every order, every bite, and every interaction exceeds expectations.

From everyday meals to special occasions, we’re here to serve with heart and flavor. Let’s create something delicious together.</p>

      </div>

      </div>

    </div> <!-- about_us_container -->

      <div class = "our_services">

        <h1>Our Services</h1>

        <div class = "scroll">

        <router-link to = "/shop" class = "link">
        <div>
          <font-awesome-icon style = "background-color: #8C8989;" class="fa-solid fa-utensils section_icons" icon="fa-solid fa-utensils"/>
          <b>Eatery</b>
          <p>Our team of skilled chefs crafts delicious menus to suit every taste and occasion.</p>
        </div>
        </router-link>

        <router-link to = "/shop?category=bread" class = "link">
        <div>
          <font-awesome-icon style="background-color: pink;" class="fa-solid fa-burger section_icons"  icon="fa-solid fa-burger"/>
          <b>Bakery</b>
          <p>Indulge in our freshly baked bread, pastries, and snacks, perfect for any time of day.</p>
        </div>
        </router-link>

        <router-link to = "/hall-rental" class = "link">
        <div>
          <font-awesome-icon style="background-color: red;" class="fa-solid fa-hotel section_icons" icon="fa-solid fa-hotel"/>
          <b>Hall/Event Centre Rental</b>
          <p>Our state-of-the-art event centers are perfect for weddings, conferences, parties, and more.</p>
        </div>
        </router-link>

       <router-link to = "/event-management" class = "link">
        <div>
          <font-awesome-icon style ="background-color: #663131"  class="fa-solid fa-people-roof section_icons" icon="fa-solid fa-people-roof"/>
          <b>Outdoor Event Management</b>
          <p> Let us take care of every detail, from concept to execution, ensuring your event is stress-free and unforgettable.</p>
        </div>
       </router-link>

       <router-link to = "/catering-institute" class = "link">
        <div>
          <font-awesome-icon style ="background-color: gold" class="fa-solid fa-graduation-cap section_icons" icon="fa-solid fa-graduation-cap"/>
          <b>Catering/Culinary Institution</b>
          <p>At Taste It, we're dedicated to inspiring the next generation of culinary leaders.</p>
        </div>
       </router-link>

        </div>

      </div>

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
import FOOTER from "@/components/Footer.vue";
import { onMounted, onUnmounted, onUpdated, reactive, toRaw, ref, watch} from 'vue'
import MIDDLEWARES from "../middlewares/middlewares"
import { useInteractiveStore } from '@/stores/interactive'
const interactive_store = useInteractiveStore()


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

  div.about_us_container {
      width: 95%;
      margin: 170px auto 0px auto;
  }

  h1 {
      color: #142141;
      text-align: center;
      font-size: 24px;
      font-weight: lighter;
  }

  div.about_us {
      text-align: center;
      margin: 0px 0px 30px 0px;
  }

  div.about_us p{
      line-height: 28px;
      margin: 10px 0;
      font-size: 16px;
      color: rgb(58, 57, 57);
      text-align: center;
  }

  div.image img {
      height: 50vh;
      width: 100%;
      object-fit: cover;
      margin: auto;
      display: block;
  }

  div.story_mission {
      margin: 17px 0 30px 0;
  }

  div.story_mission h2{
      font-size: 18px;
      margin: 10px 0;
  }

  div.story_mission p{
     font-size: 16px;
     line-height: 28px;
     color: rgb(58, 57, 57);
  }

  div.our_services {
     background-repeat: no-repeat;
     background-position: center;
     height: auto;
     padding: 40px 5px 0px 5px;
     margin: 0px 0 100px 0;
 }

 div.our_services h1{
    font-weight: bolder;
    font-size: 25px;
    color: white;
 }

 div.scroll{
    overflow-x: auto;
    white-space: nowrap;
    margin: 0px 0 0px 0;
  }

 .link {
     color: black;
     text-decoration: none;
 }

  div.scroll div{
    text-align: center;
    cursor: pointer;
    white-space: normal;
    word-wrap: break-word;
    display: inline-block;
    text-align: center;
    width: 250px;
    vertical-align: top;
    box-sizing: border-box;
    background-color: white;
    margin: 20px 20px;
    padding: 28px 10px;
    border-radius: 7px;
  }

  div.scroll div p{
    font-size: 16px;
    margin-top: 10px;
  }

  div.scroll div b{
    font-size: 16px;
  }
  .section_icons {
    font-size: 60px;
    padding: 30px;
    color: green;
    border-radius: 50%;
    display: block;
    margin: 0 auto 10px auto;
  }

}



/* DESKTOP */
@media only screen and (min-width: 800px) {
  * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

  div.about_us_container {
      width: 85%;
      margin: 170px auto 0px auto;
  }

  h1 {
      color: #142141;
      text-align: center;
      font-size: 28px;
      font-weight: bolder;
  }

  div.about_us {
      text-align: center;
      width: 60%;
      margin: 0px auto 70px auto;
  }

  div.grid {
      display: grid;
      column-gap: 60px;
      row-gap: 40px;
      margin: 60px 0px;
      align-items: flex-start;
      grid-template-columns: auto auto;
  }

  div.about_us p{
      line-height: 28px;
      margin: 10px 0;
      font-size: 18px;
      color: rgb(58, 57, 57);
      text-align: center;
  }

  div.image {
      grid-column: 1 / 3;
  }

  div.image img {
      height: 50vh;
      width: 100%;
      object-fit: cover;
      margin: auto;
      display: block;
  }

  .story {
      grid-column: 1 / 2;
  }

  .mission {
      grid-column: 2 / 3;
  }

  div.story_mission {
      margin: 17px 0 30px 0;
  }

  div.story_mission h2{
      font-size: 22px;
      margin: 10px 0;
  }

  div.story_mission p{
     font-size: 17px;
     line-height: 28px;
     color: rgb(58, 57, 57);
  }

  div.our_services {
     background-repeat: no-repeat;
     background-position: center;
     height: auto;
     padding: 40px 5px 0px 5px;
     margin: 0px 0 100px 0;
 }

 div.our_services h1{
    font-weight: bolder;
    font-size: 26px;
    color: white;
 }

 div.scroll{
    overflow-x: auto;
    white-space: nowrap;
    margin: 0px 0 0px 0;
    scrollbar-width: none;
  }

 .link {
     color: black;
     text-decoration: none;
 }

  div.scroll div{
    text-align: center;
    cursor: pointer;
    white-space: normal;
    word-wrap: break-word;
    display: inline-block;
    text-align: center;
    width: 250px;
    vertical-align: top;
    box-sizing: border-box;
    background-color: white;
    margin: 20px 20px;
    padding: 28px 10px;
    border-radius: 7px;
  }

  div.scroll div p{
    font-size: 17px;
    margin-top: 10px;
  }

  div.scroll div b{
    font-size: 18px;
  }

  .section_icons {
    font-size: 70px;
    padding: 30px;
    color: green;
    border-radius: 50%;
    display: block;
    margin: 0 auto 10px auto;
  }
}
</style>