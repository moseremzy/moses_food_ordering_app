<template>
    <footer>
         <ol>
             <li>
                 <router-link to = "/" class = "link"  exact-active-class = "active-link">
                 <font-awesome-icon class="fa-solid fa-house icons" icon="fa-solid fa-house"/>
                 <p>Home</p>
                 </router-link>
             </li>
             <li>
                 <router-link to = "/shop" class = "link" exact-active-class = "active-link">
                 <font-awesome-icon class="fa-solid fa-shop icons" icon="fa-solid fa-shop"/>
                 <p>Shop</p>
                 </router-link>
             </li>
             <li>
                <router-link to = "/cart" class = "link" exact-active-class = "active-link">
                 <font-awesome-icon class="fa-solid fa-shopping-cart icons" icon="fa-solid fa-shopping-cart"/><b id = "cart_length" v-if = "items_store.total_cart_items > 0">{{items_store.total_cart_items}}</b>
                 <p>Cart</p>
                </router-link>
             </li>
             <li v-if = "!user_store.isAuthenticated">
                 <router-link to = "/login" class = "link" exact-active-class = "active-link">
                 <font-awesome-icon class="fa-solid fa-user icons" icon="fa-solid fa-user"/>
                 <p>Register/Login</p>
                 </router-link>
            </li>
            <li v-if = "user_store.isAuthenticated">
                 <router-link to = "/account/profile" class = "link" exact-active-class = "active-link">
                 <font-awesome-icon class="fa-solid fa-user icons" icon="fa-solid fa-user"/>
                 <p style = "text-transform: uppercase;">{{user_store.user.firstname[0]}} . {{user_store.user.lastname[0]}}</p>
                 </router-link>
            </li>
         </ol>
    </footer>
</template>

<script setup>

import { useItemStore } from '@/stores/items'

import { useUserStore } from '@/stores/user'

const user_store = useUserStore()

const items_store = useItemStore()

</script>

<style scoped>
/* MOBILE DEVICES */
@media only screen and (max-width: 765px) {
* {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

  .active-link {
      text-decoration: none;
      color: red;
  }

 
footer {
    position: fixed;
    bottom: 0;
    padding: 8px 5px;
    left: 0;
    width: 100%;
    background-color: #D9D9D9;
}

ol, li {
    list-style-type: none;
    margin: 0 auto;
    display: flex;
}

li {
    font-size: 15px;
    text-align: center;
    margin: 0 auto;
}

li p{
    margin-top: 3px;
    color: #2c2b2b;
}

.icons {
    font-size: 18px;
}

#cart_length {
    color:white; 
    font-weight: lighter; 
    border-radius: 50%; 
    font-size: 11px; 
    background-color: #00aeff; 
    padding: 0px 4px;
}

.link {
    /* color: #8C8989; */
    text-decoration: none;
}
}


/* DESKTOP DEVICES */
@media only screen and (min-width: 765px) {
   footer {
       display: none;
   }
}

</style>