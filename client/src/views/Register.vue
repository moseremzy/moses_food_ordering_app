<template>

 <div>

   <HEADER/> 

   <SUCCESSALERTBOX>{{backend_message}}</SUCCESSALERTBOX>

   <ERRORALERTBOX>{{backend_message}}</ERRORALERTBOX>

   <SEARCHRESULT/>

   <MAINNAV/>

   <div class = "container">

    <h1>Register</h1>

    <form>
         
        <div>
        <label for = "first_name">First Name</label>
        <input type="text" v-model = "formvalues.firstname">
        <p class = "err">{{formvalues_err.firstname_err}}</p>
        </div>

        <div>
        <label for = "last_name">Last Name</label>
        <input type="text" v-model = "formvalues.lastname">
        <p class = "err">{{formvalues_err.lastname_err}}</p>
        </div>

        <div>
        <label for = "phone">Phone</label>
        <input type="text" v-model = "formvalues.phone">
        <p class = "err">{{formvalues_err.phone_err}}</p>
        </div>

        <div>
        <label for = "email">Email</label>
        <input type="email" v-model = "formvalues.email">
        <p class = "err">{{formvalues_err.email_err}}</p>
        </div>

        <div>
        <label for = "password">Password</label>
        <input type="password" v-model = "formvalues.password" name="password" id="password" placeholder="Password">
        <p class = "err">{{formvalues_err.password_err}}</p>
        </div>

        <button @click.prevent = "validation" type="submit" id="signupbtn" :disabled = "disablebtn"><font-awesome-icon v-if = "spinner"  class="fa-solid fa-spinner fa-spin" id = "spinner" icon="fa-solid fa-spinner"/> Register</button>

    </form>
    
    <div class = "other_form_info">
        <p>Already have an account? <router-link to = "/login" class = "link">Login</router-link></p>
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
import MIDDLEWARES from "../middlewares/middlewares"
import API from "@/api";
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useInteractiveStore } from '@/stores/interactive'

const user_store = useUserStore()
const interactive_store = useInteractiveStore()
 

const route = useRoute()
const router = useRouter()


let spinner = ref(false)
let disablebtn = ref(false)
let backend_message = ref('')

let formvalues = reactive({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: ""
})

let formvalues_err = reactive({
    firstname_err: "",
    lastname_err: "",
    phone_err: "",
    email_err: "",
    password_err: ""
})


if (user_store.isAuthenticated) { //if user no get session redirect to login

    router.push({ name: "home" })

}



/* Hooks */

onUpdated(() => {

    firstnamevalidated()

    lastnamevalidated()

    phonevalidated()

    emailvalidated()

    passwordvalidated()

})


onMounted(() => {

    MIDDLEWARES.allowScroll()
    
})


onUpdated(() => {

    MIDDLEWARES.allowScroll()
    
})

/* Hook */



function firstnamevalidated() {

    let pattern = /^[A-Za-z]+$/;

    if (formvalues.firstname === "") {

        formvalues_err.firstname_err = "Please fill field";

    } else if (pattern.test(formvalues.firstname) === false) {

        formvalues_err.firstname_err = "Firstname can only contain letters"
    
    } else { 
        
        formvalues_err.firstname_err = ""
    
        return true;
    }
}

function lastnamevalidated() {
    
    let pattern = /^[A-Za-z]+$/;
    
    if (formvalues.lastname === "") {
    
       formvalues_err.lastname_err = "Please fill field";
    
    } else if (pattern.test(formvalues.lastname) === false) {
       
       formvalues_err.lastname_err = "Lastname can only contain letters"
    
    } else {
      
       formvalues_err.lastname_err = ""
       
       return true;   
    }
}

function phonevalidated() {
    
    let pattern = /^[0-9]*$/
    
    let phone_length = formvalues.phone.length;
    
    if (formvalues.phone === "") {
    
       formvalues_err.phone_err = "Please fill field";
    
    } else if (pattern.test(formvalues.phone) === false) {
    
       formvalues_err.phone_err = "Invalid phone number";
    
    } else if (phone_length > 11) {
    
       formvalues_err.phone_err = "Cannot be 12 digits long"
    
    } else {
    
       formvalues_err.phone_err = ""
       
       return true;
    
    }
}

function emailvalidated() {
    
    let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (formvalues.email === "") {
    
       formvalues_err.email_err = "Please fill field";
    
    } else if (pattern.test(formvalues.email) === false) {
       
       formvalues_err.email_err = "Invalid email"
    
    } else {
       
       formvalues_err.email_err = ""
      
       return true;
    
    }
}

function passwordvalidated() {
    
    let pass_length  = formvalues.password.length;
    
    if (formvalues.password === "") {
    
        formvalues_err.password_err = "Please fill field";
    
    } else if (pass_length < 7 || pass_length > 15) {
    
        formvalues_err.password_err = "Must be between 7 and 15 characters long"
    
    } else {
        
        formvalues_err.password_err = ""
    
        return true        
   }
}


async function validation() {
          
    if (firstnamevalidated() && lastnamevalidated() && phonevalidated() && emailvalidated() && passwordvalidated()) {
    
    spinner.value = true
    
    disablebtn.value = true;

    const response = await API.register(formvalues);

    switch (response.message) {

        case "success":
            
            backend_message.value = "success"
            
            interactive_store.display_success_alert_box()

            router.push({ name: "email-activation", query: { confirmationEmail: formvalues.email } })
            
            break;

        case "email already exists":
            backend_message.value = "email already exists"
            interactive_store.display_error_alert_box()
            disablebtn.value = false
            spinner.value = false
            break;
        
        case "error occured":
            backend_message.value = "Error occured, try again."
            interactive_store.display_error_alert_box()
            disablebtn.value = false
            spinner.value = false
            break;
            }
       }

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
</style>