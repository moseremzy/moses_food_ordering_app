<template>

 <div>

   <HEADER/> 

   <SUCCESSALERTBOX>{{backend_message}}</SUCCESSALERTBOX>

   <ERRORALERTBOX>{{backend_message}}</ERRORALERTBOX>

   <SEARCHRESULT/>

   <MAINNAV/>

   <div class = "container">

    <h1>Login</h1>

    <form>
         
        <h3 v-if = 'display_verify_button'  @click.prevent = "send_confirmation_mail">Verify Account</h3>
        
        <div>
        <label for = "email">Email</label>
        <input type="email" v-model = "formvalues.email">
        <p class="err">{{formvalues_err.email_err}}</p>
        </div>

        <div>
        <label for = "password">Password</label>
        <input type="password" v-model = "formvalues.password">
        <p class="err">{{formvalues_err.password_err}}</p>
        </div>

        <button type="submit" @click.prevent = "validation" id="loginbtn" :disabled = "disablebtn"><font-awesome-icon v-if = "spinner"  class="fa-solid fa-spinner fa-spin" id = "spinner" icon="fa-solid fa-spinner"/> Login</button>

    </form>

    <div class = "demo_account">
        <h2>You can login using this demo account</h2>
        <p>Email: <strong>demo@gmail.com</strong></p>
        <p>Password: <strong>1234567</strong></p>
    </div>
    
    <div class = "other_form_info">
        <router-link class = "link" to = "/forgot-password">Forgot password</router-link>
        <p>Dont have an account? <router-link to = "/register" class = "link">Register</router-link></p>
    </div>

   </div>

 <FOOTER/>

 </div>
</template>

<script setup>
import SEARCHRESULT from "@/components/SearchResult.vue";
import COPYRIGHT from "@/components/Copyright.vue";
import HEADER from "@/components/Header.vue";
import MAINNAV from "@/components/navigation_bars/MainNav.vue";
import SUCCESSALERTBOX from "@/components/alert_box/success.vue";
import ERRORALERTBOX from "@/components/alert_box/error.vue";
import FOOTER from "@/components/Footer.vue";
import { onMounted, onUnmounted, onUpdated, reactive, toRaw, ref, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MIDDLEWARES from "../middlewares/middlewares"
import { useInteractiveStore } from '@/stores/interactive'
import { useUserStore } from '@/stores/user'
const interactive_store = useInteractiveStore()
const user_store = useUserStore()

import API from "@/api";


const route = useRoute()
const router = useRouter()
       
let spinner = ref(false)
let disablebtn = ref(false)
let backend_message = ref("")
let display_verify_button = ref(false)
        
let formvalues = reactive({
    email: "",
    password: ""
})

let formvalues_err = reactive({
    email_err: "",
    password_err: ""
})



if (user_store.isAuthenticated) { //if user no get session redirect to login

    router.push({ name: "home" })

}



/* Hooks */

onUpdated(() => {
  
    emailvalidated()
  
    passwordvalidated()

})


onMounted(() => {

    MIDDLEWARES.allowScroll()
    
})


onUpdated(() => {

    MIDDLEWARES.allowScroll()
    
})

/*hook */



function emailvalidated() {

    if (formvalues.email !== "") {

        formvalues_err.email_err = ""

        return true;

    } else {
    
        formvalues_err.email_err = "Please fill field"
        
        return false
    
    }

}

function passwordvalidated() {
    
    if (formvalues.password !== "") {
        
        formvalues_err.password_err = ""
        
        return true
    
    } else {
    
       formvalues_err.password_err = "Please fill field"
       
       return false
    
    }

}



async function validation() {
    
    if (emailvalidated() && passwordvalidated()) {

    spinner.value = true,

    disablebtn.value = true;

    const response = await API.login(formvalues);

    if (response.message === "Invalid email or password") {
    
    backend_message.value = response.message
    interactive_store.display_error_alert_box()
    disablebtn.value = false
    spinner.value = false

    } else if (response.message === "Account Unverified") {
    
    let email = response.user.email

    backend_message.value = "Account exist, but unverified"

    interactive_store.display_success_alert_box()

    await send_confirmation_mail(email)
    
    } else if (response.message === "error occured") {
    
    backend_message.value = "error occured, try again"
    interactive_store.display_error_alert_box()
    disablebtn.value = false
    spinner.value = false

    } else { //if success

    user_store.logged_In(response.user, response.isAuthenticated)

    backend_message.value = `Welcome ${response.user.firstname}`

    interactive_store.display_success_alert_box()

    switch (interactive_store.page_to_go) {

       case "checkout":

            router.push({name: interactive_store.page_to_go})
            
            break;

        case "profile":

            router.push({name: interactive_store.page_to_go})
            
            break;
    
        default:

           window.location.replace('/')

        break;
    
      }
    }
  }
}




//resend this user verification email
async function send_confirmation_mail(email) {

    const response = await API.ResendConfirmationMail({ confirmationEmail: email});

    router.push({ name: "email-activation", query: { confirmationEmail: email} })

}



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
      width: 90%;
      border-radius: 12px;
      padding: 20px 25px;
      border: 1px solid gray;
      margin: 170px auto;
      box-sizing: border-box;
  }

  div.container h1{
      font-size: 25px;
      margin: 10px 0px 26px 0px;
      color: rgb(59, 59, 59);
  }

  form div {
      margin: 20px 0;
  }

  div label {
      font-size: 16px;
      color: rgb(30, 66, 30);
      display: block;
      margin: 4px 0px;
  }

  form input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      box-sizing: border-box;
      display: block;
  }

  form input:hover {
     outline: 0;
  }

  form input:focus {
     outline: 0;
  }

  form h3 {
      text-align: center;
      font-size: 15px;
      margin: 0;
      color: rgb(16, 153, 85);
      cursor: pointer;
      text-decoration: underline;
  }

  button {
      display: block;
      width: 50%;
      margin: auto;
      color: white;
      border: 0;
      padding: 10px 0;
      font-size: 16px;
      font-weight: bold;
      background-color: rgb(70, 165, 70);
  }

  button[type=submit]:disabled {
      cursor: none;
      opacity: .4
 }


  div.other_form_info {
      width: 80%;
      margin: 10px auto;
      text-align: center;
  }

   div.other_form_info .link{
     color: rgb(70, 165, 70);
     text-decoration: none;
  }

  p.err {
     color: red;
     font-size: 12px;
  }

}



/* DESKTOP */
@media only screen and (min-width: 600px) {
  * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

  div.container {
      width: 500px;
      border-radius: 12px;
      padding: 20px 25px;
      border: 1px solid gray;
      margin: 170px auto;
      box-sizing: border-box;
  }

  div.container h1{
      font-size: 25px;
      margin: 10px 0px 26px 0px;
      color: rgb(59, 59, 59);
  }

  form div {
      margin: 20px 0;
  }

  div label {
      font-size: 16px;
      color: rgb(30, 66, 30);
      display: block;
      margin: 4px 0px;
  }

  form input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      box-sizing: border-box;
      display: block;
  }

  form input:hover {
     outline: 0;
  }

  form input:focus {
     outline: 0;
  }

  form h3 {
      text-align: center;
      font-size: 15px;
      margin: 0;
      color: rgb(16, 153, 85);
      cursor: pointer;
      text-decoration: underline;
  }

  button {
      display: block;
      width: 50%;
      margin: auto;
      color: white;
      border: 0;
      padding: 10px 0;
      font-size: 16px;
      font-weight: bold;
      background-color: rgb(70, 165, 70);
  }

  button[type=submit]:disabled {
      cursor: none;
      opacity: .4
   }


  div.other_form_info {
      width: 80%;
      margin: 10px auto;
      text-align: center;
  }

   div.other_form_info .link{
     color: rgb(70, 165, 70);
     text-decoration: none;
  }

  p.err {
     color: red;
     font-size: 12px;
  }
}


.demo_account {
      margin: 10px 0;
}

.demo_account h2{
      font-size: 16px;
}

.demo_account p{
      margin: 10px 0;
}
</style>