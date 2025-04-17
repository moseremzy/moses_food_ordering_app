<template>

 <div>

 <HEADER/> 

 <SUCCESSALERTBOX>{{interactive_store.backend_message}}</SUCCESSALERTBOX>

 <ERRORALERTBOX>{{interactive_store.backend_message}}</ERRORALERTBOX>

 <SEARCHRESULT/>

 <MAINNAV/>

 <MYORDERS/>

   <div class = "catering_institute">

      <h1>CATERING/CULINARY INSTITUTE</h1>

      <div class = "about_us">

        <p>At Taste It,  lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois.</p>

      </div>

      <div class = "grid">

      <div class = "image">

        <div id="myCarousel" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner">
            <div class="item active">
            <img src="../assets/static_images/catering_school1.jpg" alt="Los Angeles" style="width:100%;">
            </div>

            <div class="item">
            <img src="../assets/static_images/cakes.jpg" alt="Chicago" style="width:100%;">
            </div>

            <div class="item">
            <img src="../assets/static_images/catering_school2.jpg" alt="New york" style="width:100%;">
            </div>
        </div>

        <!-- Left and right controls -->
        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <font-awesome-icon class="glyphicon glyphicon-chevron-left fa-solid fa-chevron-left" icon="fa-solid fa-chevron-left"/>
            <span class="sr-only">Previous</span>
        </a>

        <a class="right carousel-control" href="#myCarousel" data-slide="next">
            <font-awesome-icon class="glyphicon glyphicon-chevron-right fa-solid fa-chevron-right" icon="fa-solid fa-chevron-right"/>
            <span class="sr-only">Next</span>
        </a>
        </div>


      </div>

      <div class = "story_mission story">

        <h2>Our Facilities</h2>

        <p> lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois.</p>

      </div>

      <div class = "story_mission mission">

        <h2>Our Mission</h2>

        <p> lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois</p>

      </div>

      <div class = "story_mission faculty">

        <h2>Our Faculty</h2>

        <p> lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois.</p>

      </div>

      <div class = "story_mission programs">

        <h2>Our Programs</h2>

        <p>We offer a range of programs designed to meet the needs of aspiring caterers, from beginner to advanced levels. Our programs include:

        <b> lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois</b></p>

      </div>


      </div>

    </div> <!-- catering_institute -->
    
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

  div.catering_institute {
      width: 95%;
      margin: 170px auto 80px auto;
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

  ol.carousel-indicators {
      left: 22%;
      z-index: unset;
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
}



/* DESKTOP */
@media only screen and (min-width: 800px) {
  * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

  div.catering_institute {
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
      width: 80%;
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
      width: 70%;
      justify-self: center;
      grid-column: 1 / 3;
  }

  ol.carousel-indicators {
      left: 22%;
      z-index: unset;
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
      margin: 0px 0 0px 0;
  }

  div.story_mission h2{
      font-size: 22px;
      margin: 10px 0;
  }

  div.story_mission p{
     line-height: 28px;
     font-size: 17px;
     color: rgb(58, 57, 57);
  }
}
</style>