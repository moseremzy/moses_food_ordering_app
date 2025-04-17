<template>

 <div>

 <HEADER/> 
 
 <SUCCESSALERTBOX>{{interactive_store.backend_message}}</SUCCESSALERTBOX>

 <ERRORALERTBOX>{{interactive_store.backend_message}}</ERRORALERTBOX>

 <SEARCHRESULT/>

 <MAINNAV/>

 <MYORDERS/>

   <div class = "event_rental_container">

      <!-- <MYORDERS/> -->

      <!-- <ORDER/> -->

      <h1>HALL/EVENT CENTRE RENTAL</h1>

      <div class = "about_us">

        <p>At Taste It,  lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois lorem pois.</p>

      </div>

      <div class = "grid">

      <div class="lightbox" id = "mobile"> <!-- show for mobile devices -->
      <img :src = "pictures[0].src"  @click= "showMultiple(0)"/>
      <font-awesome-icon @click = "showMultiple(0)" icon="fa-solid fa-arrow-right-long" id="arrow_right"/>
      <b id="pix_indicator" @click = "showMultiple(0)">1 of {{pictures.length}}</b>
      <vue-easy-lightbox
        :visible= "visibleRef"
        :imgs= "pictures"
        :index= "indexRef"
        @hide= "onHide"
      ></vue-easy-lightbox>
      </div>

      <div class="lightbox" id = "desktop"><!--  show for desktops/laptops devices  -->
      <template v-for = "(picture, index) in pictures">
      <div class="grid-item"><img :src = "picture.src" @click = "showMultiple(index)"></div>
      </template>
      <vue-easy-lightbox
        :visible= "visibleRef"
        :imgs= "pictures"
        :index= "indexRef"
        @hide= "onHide"
      ></vue-easy-lightbox>
      </div> 


      <div class = "details">

        <h2>Details</h2>

        <div>
        <p> lorem pois lorem pois lorem pois lorem pois</p>
        <h3>PROPERTY ADDRESS</h3>
        <hr>
        </div>

        <div>
        <p>40</p>
        <h3>CAPACITY</h3>
        <hr>
        </div>

       <div>
        <p>Air Conditioner, Chairs, Internet, Microphones, Power Generator, Projector, Sound Speakers, Tables</p>
        <h3>FACILITIES</h3>
        <hr>
       </div>

       <div>
        <p>HALL</p>
        <h3>TYPE</h3>
        <hr>
       </div>

      <div class = "contact_us">
        <b>For more information and booking contact us:</b>
        <p> lorem pois lorem pois lorem pois lorem pois</p>
        <p>+234 (0)802223046336</p>
        <p>Mail: support@tasteit.com</p>
      </div>

      </div> <!-- DETAILS -->

      </div> <!-- GRID -->

    </div> <!-- event_rental_container -->

    <WHATSAPP/>

    <COPYRIGHT/>

 <FOOTER/>

 </div>
</template>

<script setup>
import SEARCHRESULT from "@/components/SearchResult.vue";
import COPYRIGHT from "@/components/Copyright.vue";
import HEADER from "@/components/Header.vue";
import MAINNAV from "@/components/navigation_bars/MainNav.vue";
import FOOTER from "@/components/Footer.vue";
import MYORDERS from "@/components/navigation_bars/MyOrders.vue"
import VueEasyLightbox from 'vue-easy-lightbox';
import { onMounted, onUnmounted, onUpdated, reactive, toRaw, ref, watch} from 'vue'
import MIDDLEWARES from "../middlewares/middlewares"
import { useInteractiveStore } from '@/stores/interactive'
const interactive_store = useInteractiveStore()

let pictures = ref(['https://lh3.googleusercontent.com/p/AF1QipMOBFWR7_4mrii2Hv-k9vi8kFjOU8oLQ9HCz8zG=s680-w680-h510','https://lh3.googleusercontent.com/p/AF1QipN1cZvDZ130JG4VXpSjeWTyZ1l35GfueQLEIePK=s680-w680-h510', 'https://lh3.googleusercontent.com/p/AF1QipOWiK8hEYUWI2B3HfzfLGxPMrcliKVyQosWBD1G=s680-w680-h510', 'https://lh3.googleusercontent.com/p/AF1QipPEwbfhSbcE2uCltG5By9Sts7akGEVYdaQHYBew=s680-w680-h510']);
const visibleRef = ref(false)
const indexRef = ref(0) // default 0
const imgsRef = ref([])
let hide = ref(false)
let styleObject = reactive({})


/* Hooks */

onMounted(() => {

    MIDDLEWARES.allowScroll()
    
})


onUpdated(() => {

    MIDDLEWARES.allowScroll()
    
})


pictures.value = pictures.value.map( (value, index) => {

        return  {
            src: value,
            title: `${++index}/${pictures.value.length}`, 
            alt: ''
      }
          
})


function showMultiple (index) {

    styleObject = {

        'z-index': '-1'
    
    }

    pictures.value = pictures.value

    visibleRef.value = true
    
    indexRef.value = index // index of imgList

}


function onHide () {
     
    styleObject = {

        'z-index': '0'

    }

    visibleRef.value = false

  }


//   function allowScroll() {

      
//   }

</script>

<style scoped>
/* MOBILE DEVICES */
@media only screen and (max-width: 800px) {
  * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

  div.event_rental_container {
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
      font-size: 16px;
      line-height: 28px;
      margin: 10px 0;
      color: rgb(58, 57, 57);
      text-align: center;
  }

   div.lightbox {
        margin-top: 20px;
        position: relative
    }

    div#desktop {
        display: none
    }

    div.lightbox img {
        -o-object-fit: cover;
        object-fit: cover;
        width: 100%;
        height: 200px;
        cursor: pointer
    }

    #arrow_right {
        top: 43%;
        right: 0
    }

    #arrow_right,#pix_indicator {
        position: absolute;
        cursor: pointer;
        background-color: rgba(0,0,0,.466);
        padding: 5px;
        color: #fff;
        font-weight: 700
    }

    #pix_indicator {
        top: 0;
        left: 0;
        font-size: 13px
    }


  div.details {
      margin: 20px 0 100px 0;
  }

  div.details h2 {
      font-size: 19px;
      margin: 10px 0px 15px 0;
  }

  div.details div {
      margin: 15px 0;
  }

  div.details div p {
      font-size: 16px;
      font-weight: lighter;
      line-height: 26px;
  }

  div.details div h3 {
      color: gray;
      font-size: 15px;
      margin: 5px 0;
      font-weight: lighter;
  }

  .contact_us {
     padding-top: 10px;
  }

  .contact_us b{
     font-size: 16px;
     padding-top: 10px;
  }

  .contact_us p{
     font-size: 16px;
     margin: 10px 0;
  }

}



/* DESKTOP */
@media only screen and (min-width: 800px) {
    * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

  div.event_rental_container {
      width: 90%;
      margin: 170px auto 90px auto;
  }

  h1 {
      color: #142141;
      text-align: center;
      font-size: 24px;
      font-weight: lighter;
  }

  div.about_us {
      text-align: center;
      margin: 0px 0px 60px 0px;
  }

  div.about_us p{
      font-size: 18px;
      line-height: 28px;
      margin: 10px 0;
      color: rgb(58, 57, 57);
      text-align: center;
  }

  div.grid {
     display: grid;
     grid-template-columns: auto auto;
     column-gap: 40px;
     align-items: flex-start;
  }

  div.lightbox {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin: 0;
      height: auto;
      overflow-y: auto;
      border-radius: 12px;
      padding: 20px 20px;
      border: 1px solid gray;
    }

    div#mobile {
        display: none
    }

    div.lightbox img {
      -o-object-fit: cover;
      object-fit: cover;
      width: 100%;
      height: 100%;
      cursor: pointer
    }

    #arrow_right {
        top: 43%;
        right: 0
    }

    #arrow_right,#pix_indicator {
        position: absolute;
        cursor: pointer;
        background-color: rgba(0,0,0,.466);
        padding: 5px;
        color: #fff;
        font-weight: 700
    }

    #pix_indicator {
        top: 0;
        left: 0;
        font-size: 13px
    }


  div.details {
      margin: 0px 0 100px 0;
      border-radius: 12px;
      padding: 20px 20px;
      border: 1px solid gray;
  }

  div.details h2 {
      font-size: 19px;
      margin: 10px 0px 15px 0;
  }

  div.details div {
      margin: 15px 0;
  }

  div.details div p {
      font-size: 17px;
      font-weight: lighter;
      line-height: 26px;
  }

  div.details div h3 {
      color: gray;
      font-size: 16px;
      margin: 5px 0;
      font-weight: lighter;
  }

  .contact_us {
     padding-top: 10px;
  }

  .contact_us b{
     font-size: 17px;
     padding-top: 10px;
  }

  .contact_us p{
     margin: 10px 0;
  }
}
</style>