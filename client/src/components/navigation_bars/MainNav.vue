<template>

<div>

  <div class = "main_nav_container" v-if = "store.display_main_nav">
    
    <div class = "header">
        
        <p><font-awesome-icon @click = "store.toggle_main_nav(false)" class="fa-solid fa-xmark" id = "xmark" icon="fa-solid fa-xmark"/></p>
    
    </div>

    <div class = "info">

     <h2>QUICK LINKS</h2>

     <ul>
         <li @click = "store.toggle_main_nav(false)"><router-link to = "/" class = "link" exact-active-class = "active-link">HOME</router-link></li>
         <li @click = "store.toggle_main_nav(false)"><router-link to = "/about" class = "link" exact-active-class = "active-link">ABOUT</router-link></li>
         <li @click = "store.toggle_main_nav(false)"><router-link to = "/shop?category=all" class = "link" exact-active-class = "active-link">SHOP</router-link></li>
         <li @click = "store.toggle_main_nav(false)"><router-link to = "/contact" class = "link" exact-active-class = "active-link">CONTACT US</router-link></li>    
         <li @click = "store.toggle_main_nav(false)" v-if = "!user_store.isAuthenticated"><router-link to = "/login" class = "link" exact-active-class = "active-link">REGISTER/LOGIN</router-link></li>
         <li @click = "store.toggle_main_nav(false)" v-if = "user_store.isAuthenticated"><router-link class = "link" style = "text-transform: uppercase;" to = "/account/profile" exact-active-class = "active-link"><font-awesome-icon @click = "store.toggle_main_nav(false)" class="fa-solid fa-user icons" icon="fa-solid fa-user"/>{{user_store.user.firstname[0]}} . {{user_store.user.lastname[0]}}</router-link></li>
         <li @click = "store.toggle_myorders_nav(true)" v-if = "user_store.isAuthenticated"><router-link to = "#"  class = "link"><font-awesome-icon class="fa-solid fa-cube icons" icon="fa-solid fa-cube"/> MY ORDERS</router-link></li>
         <li @click.prevent = "logout" v-if = "user_store.isAuthenticated"><router-link to="#" class = "link" style="color: red;"><font-awesome-icon  class="fa-solid fa-sign-out icons" style="color: red;" icon="fa-solid fa-sign-out"/>Log Out</router-link></li>
     </ul>

    </div>

  </div>


<!-- hide main nav -->
<div class = "hide_main_nav" @click = "store.toggle_main_nav(false)" v-if = "store.display_main_nav"></div>
<!-- hide main nav -->

</div>

</template>

<script setup>

import { onMounted, onUnmounted, onUpdated, reactive, toRaw, ref, watch} from 'vue'

import { useInteractiveStore } from '@/stores/interactive'

import { useUserStore } from '@/stores/user'

import API from "../../api";

const user_store = useUserStore()

const store = useInteractiveStore()



async function logout() {
    
   const response = await API.logout()

   if (response.message === 'success') {

       user_store.logged_Out()

       window.location.assign("/login")

   } else { //if theres is error login out

       window.location.assign("/")

   }

}


</script>

<style scoped>
/* GENERAL */
* {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    background-color: #f9f9f9;
}
.active-link {
    background-color: rgba(82, 214, 82, 0.1);
    color: #52d652;
    border-radius: 8px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

/* MOBILE */
@media only screen and (max-width: 800px) {
div.main_nav_container {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 3;
    top: 0;
    left: 0;
    overflow-y: auto;
    padding: 20px;
    background: linear-gradient(135deg, #ffffff, #f3f4f6);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease;
}
div.header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
div.header p {
    font-weight: 600;
    cursor: pointer;
    color: #333;
    font-size: 24px;
    transition: transform 0.3s ease;
}
div.header p:hover {
    transform: scale(1.1);
}
div.info {
    margin-top: 34px;
    text-align: center;
}
div.info h2 {
    font-size: 14px;
    font-weight: 600;
    color: #666;
    margin-bottom: 20px;
    letter-spacing: 1px;
} 
ul {
    list-style: none;
}
ul li {
    margin: 10px 0;
    transition: transform 0.3s ease, background-color 0.3s ease;
}
ul li:hover {
    transform: translateX(5px);
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
}
.link {
    display: block;
    text-decoration: none;
    padding: 12px 20px;
    font-size: 16px;
    color: #333;
    border-radius: 6px;
    font-weight: 500;
    transition: color 0.3s ease, background-color 0.3s ease;
}
.link:hover {
    background-color: rgba(82, 214, 82, 0.2);
    color: #52d652;
}
.icons {
    margin-right: 8px;
    color: #52d652;
    font-size: 18px;
}

/* Hide Nav */
div.hide_main_nav {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    cursor: pointer;
    animation: fadeIn 0.3s ease;
}

/* ANIMATIONS */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 0.5;
    }
}
}

/* DESKTOP */
@media only screen and (min-width: 800px) {
div.main_nav_container {
    position: fixed;
    width: 30%;
    height: 100vh;
    z-index: 3;
    top: 0;
    left: 0;
    overflow-y: auto;
    padding: 20px;
    background: linear-gradient(135deg, #ffffff, #f3f4f6);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    animation: slideIn 0.3s ease;
}
div.header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
div.header p {
    font-weight: 600;
    cursor: pointer;
    color: #333;
    font-size: 24px;
    transition: transform 0.3s ease;
}
div.header p:hover {
    transform: scale(1.1);
}
div.info {
    margin-top: 34px;
    text-align: center;
}
div.info h2 {
    font-size: 14px;
    font-weight: 600;
    color: #666;
    margin-bottom: 20px;
    letter-spacing: 1px;
} 
ul {
    list-style: none;
}
ul li {
    margin: 10px 0;
    transition: transform 0.3s ease, background-color 0.3s ease;
}
ul li:hover {
    transform: translateX(5px);
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
}
.link {
    display: block;
    text-decoration: none;
    padding: 12px 20px;
    font-size: 16px;
    color: #333;
    border-radius: 6px;
    font-weight: 500;
    transition: color 0.3s ease, background-color 0.3s ease;
}
.link:hover {
    background-color: rgba(82, 214, 82, 0.2);
    color: #52d652;
}
.icons {
    margin-right: 8px;
    color: #52d652;
    font-size: 18px;
}

/* Hide Nav */
div.hide_main_nav {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    cursor: pointer;
    animation: fadeIn 0.3s ease;
}

/* ANIMATIONS */
@keyframes slideIn {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 0.5;
    }
}
}


</style>