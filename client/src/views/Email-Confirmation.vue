<template>
  <div id="body" class="container">    
   <font-awesome-icon class="remove fa-solid fa-circle-check" id="check" icon="fa-solid fa-circle-check"/>
  <h1>{{message}}</h1>
  <p>You can now sign in your new account.</p>
  <a href="/login" class="" id="loginbtn">Log in</a>
  </div>
</template>
 
<script setup>
import { onMounted, onUnmounted, onUpdated, reactive, toRaw, ref, watch, nextTick } from 'vue'
import API from '../api';
import { useRoute, useRouter } from 'vue-router'


const route = useRoute()
const router = useRouter()
 
            
let message = ref("")
    

onMounted(async () => {
    
    const response = await API.emailVerification(route.params.id);

    if (response.message === "Email Verification Succesful" || response.message === "Email is Already Verified") {

        message.value = response.message
    
    } else {
    
        router.push({name: "home"})
    
    }  
})

</script>

<style scoped>

@media only screen and (min-width: 612px) {
    div#body {
        font-family: 'Roboto Slab';
    }

    div.container {
        width: 500px;
        margin: 20px auto 0 auto;
        text-align: center;
        padding: 20px
    }

    #check {
        background-color: #92be92;
        padding: 20px;
        font-size: 30px;
        color: green;
        border-radius: 50%
    }

    div.container h1 {
        color: #2e2c2c;
        margin: 20px 0 20px 0;
        font-size: 30px
    }

    div.container p {
        font-size: 16px;
        color: #2e2c2c;
        margin: 20px 0 27px 0
    }

    div.container h3 {
        font-size: 13px;
        margin: 30px 0 2px 0
    }

    #loginbtn {
        cursor: pointer;
        padding: 9px 12px;
        border-radius: 5px;
        text-decoration: none;
        color: #fff;
        font-weight: 700;
        border: 1px solid green;
        background-color: green;
        margin-top: 10px
    }
}

@media only screen and (max-width: 612px) {
    div#body {
        font-family: 'Roboto Slab';
    }

    div.container {
        width: 70%;
        margin: 20px auto 0 auto;
        text-align: center;
        padding: 20px
    }

    #check {
        background-color: #92be92;
        padding: 20px;
        font-size: 30px;
        color: green;
        border-radius: 50%
    }

    div.container h1 {
        color: #2e2c2c;
        margin: 20px 0 0 0;
        font-size: 28px
    }

    div.container p {
        font-size: 15px;
        color: #2e2c2c;
        margin: 20px 0 20px 0
    }

    #loginbtn {
        cursor: pointer;
        padding: 5px 12px;
        border-radius: 5px;
        color: #fff;
        font-size: 15px;
        text-decoration: none;
        font-weight: 700;
        border: 1px solid green;
        background-color: green;
        margin-top: 10px
    }
}
</style>