<template>
<div>
<div class = "modal-backdrop" v-if = 'interactive_store.query'></div>
<div class = "search_container" v-if = 'interactive_store.query'>

  <div class = "search">
      
  <SEARCHBOX />
  
  </div> 
 
  <h1>Search - <b style = "font-weight: lighter; display: inline; font-size: 16px;">{{interactive_store.query}}</b></h1>
 
  <div class = "result" v-if = "filteredItems.length < 1">

  <h2 style="text-align: center; font-size: 17px;">Item Not Found</h2>
  
  </div>

  <div class = "result" v-else>
   <template v-for = "item in filteredItems" :key = "item.name">
    <router-link @click = "interactive_store.clearQuery" :to = "'/view-dish/'+item.name" class = "link">
    <div class = "item">
    <div>
        <img :src= "'https://mosesfoodorderingapp.kelvinspice.com.ng/images/'+item.image" :alt="item.name">
    </div>
    <div class = "info">
        <h2>{{item.name}}</h2>
        <p>{{item.category}}</p>
    </div>
    </div>
    <hr>
    </router-link>
  </template> 
  </div>

</div>

</div>

</template>

<script setup>

import { useItemStore } from '@/stores/items'

import { useInteractiveStore } from '@/stores/interactive'

import SEARCHBOX from '@/components/SearchBox.vue'

import { computed, reactive, toRefs, ref} from 'vue'


const items_store = useItemStore()

const interactive_store = useInteractiveStore()

const items = reactive(items_store.items)


let filteredItems = computed(() => { //search for item

    return items.filter((item) => {

    return item.name.toLowerCase().slice(0, (interactive_store.query.length)) === interactive_store.query.toLowerCase();

  })

})


</script>

<style scoped>
/* MOBILE DEVICES */
@media only screen and (max-width: 765px) {
.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    margin: 0;
    width: 100vw;
    bottom: 0;
    left: 0;
    z-index: 5;
    opacity: 0.5;
    background-color: #000;
}
div.search_container {
    z-index: 6;
    position: fixed;
    background-color: white;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
div.search {
    position: fixed;
    width: 100%;
    top: 0;
    background-color: white;
    padding: 10px 3px;
    left: 0;
}
div.search_container h1 {
    margin: 100px 0 0 12px;
    font-size: 16px;
    font-weight: bolder;
}
div.result {
    height: 100vh;
    position: fixed;
    width: 100%;
    margin: 0px 0 0 0;
    overflow-y: auto;
}
.link {
    text-decoration: none;
}
hr {
    margin: 0;
}
div.item {
    display: flex;
    margin: 0 15px;
    padding: 15px 0;
    align-items: flex-start;
}
div.item img{
    width: 60px;
    display: block;
    object-fit: cover;
    height: 60px;
}
div.item h2{
    font-size: 15px;
    font-weight: bold;
    color: black;
    margin: 3px 0;
}
div.item p{
    font-size: 14px;
    margin: 3px 0;
    color: rgb(66, 66, 66);
}
div.item .info{
    align-self: center;
    margin-left: 11px;
}
}


/* DESKTOP */
@media only screen and (min-width: 765px) {
.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    margin: 0;
    width: 100vw;
    bottom: 0;
    left: 0;
    z-index: 5;
    opacity: 0.5;
    background-color: #000;
}
div.search_container {
    z-index: 6;
    position: fixed;
    background-color: white;
    height: 100vh;
    width: 70vw;
    margin: auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
div.search {
    position: fixed;
    width: 70vw;
    top: 0;
    background-color: white;
    padding: 10px 3px;
    left: 40;
}
div.result {
    height: 100vh;
    position: fixed;
    padding-bottom: 100px;
    width: 70%;
    margin: 80px auto 0 auto;
    overflow-y: auto;
}
.link {
    text-decoration: none;
}
hr {
    width: 70vw;
    margin: 0;
}
div.item {
    display: flex;
    margin: 0 15px;
    padding: 15px 0;
    align-items: flex-start;
}
div.item img{
    width: 60px;
    display: block;
    object-fit: cover;
    height: 60px;
}
div.item h2{
    font-size: 15px;
    font-weight: bold;
    color: black;
    margin: 3px 0;
}
div.item p{
    font-size: 14px;
    margin: 3px 0;
    color: rgb(66, 66, 66);
}
div.item .info{
    align-self: center;
    margin-left: 11px;
}
}
</style>

 