<template>

 <div>

 <HEADER/> 

 <SUCCESSALERTBOX>{{interactive_store.backend_message}}</SUCCESSALERTBOX>

 <ERRORALERTBOX>{{interactive_store.backend_message}}</ERRORALERTBOX>

 <SEARCHRESULT/>

 <MAINNAV/>

 <MYORDERS/>

 <INFOMODAL>{{backend_message}}</INFOMODAL>

   <div class = "container">

      <h1>Contact Us</h1>

      <div class = "office_address">

        <div><h2>Office In Ogun State</h2></div>

        <div>
            <p>lorem dhdfd lorem dsdfd lorem</p>
            <h3>+234 (0)82662723046336</h3>
            <h4>Mail: <b>support@tasteit.com.ng</b></h4>
         </div>

      </div>

       <div class="contactusform">
        <h2>Send us a Message</h2>
        <form action="">
        <div class="grid_container1">
            <div class="item1">
            <label for = "first_name">First Name</label>
            <input type="text" placeholder="First Name" v-model = "formvalues.firstname" id = "first_name" class="reedonly">
            <p class = "err">{{formvalues_err.firstname_err}}</p>
            </div>

            <div class="item2">
            <label for = "last_name">Last Name</label>
            <input type="text" placeholder="Last Name" v-model = "formvalues.lastname" id = "last_name" class="reedonly">
            <p class = "err">{{formvalues_err.lastname_err}}</p>
            </div>
            
            <div class="item3">
            <label for = "email">Email</label>
            <input type="email" placeholder="Email" v-model = "formvalues.email" id = "email" class="reedonly">
            <p class = "err">{{formvalues_err.email_err}}</p>
            </div>

            <div class="item4">
            <label for = "phone">Phone</label>
            <input type="text" placeholder="Phone No" v-model = "formvalues.phone" id = "phone" class="reedonly">
            <p class = "err">{{formvalues_err.phone_err}}</p>
            </div>
            
            <div class="item5">
            <label for = "message">Message</label>
            <textarea placeholder="Message" v-model = "formvalues.message" class="reedonly">
            </textarea>
             <p class="err" style="color: gray;" ref = "description_counter">{{formvalues.message.length}}/500 characters</p>
            </div>
            </div>

            <button type = "submit" @click.prevent = "submit" :disabled = "disablebtn"><font-awesome-icon v-if = "spinner"  class="fa-solid fa-spinner fa-spin" id = "spinner" icon="fa-solid fa-spinner"/> Send Email</button>
            </form>
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
import INFOMODAL from "@/components/modals/info_modal.vue";
import MYORDERS from "@/components/navigation_bars/MyOrders.vue";
import FOOTER from "@/components/Footer.vue";
import { onMounted, onUnmounted, onUpdated, reactive, toRaw, ref, watch} from 'vue'
import MIDDLEWARES from "../middlewares/middlewares"
import API from "@/api";
import { useInteractiveStore } from '@/stores/interactive'
const interactive_store = useInteractiveStore()


let spinner = ref(false)
let disablebtn = ref(false)
let backend_message = ref('')
let description_counter = ref(null)

let formvalues = reactive({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    message: ""
})

let formvalues_err = reactive({
    firstname_err: "",
    lastname_err: "",
    phone_err: "",
    email_err: "",
    message_err: ""
})

/* Hooks */

onMounted(() => {

    MIDDLEWARES.allowScroll()
    
})


onUpdated(() => {

    MIDDLEWARES.allowScroll()

    firstnamevalidated()
    lastnamevalidated()
    phonevalidated()
    emailvalidated()
    message_validated()
    
})

/* hook */






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




function message_validated() {

    if (formvalues.message.length >= 500) {

       formvalues.message = formvalues.message.slice(0, 500)
        
       description_counter.value.attributes[2].nodeValue = "color: red;"
    
    } else {
       
       description_counter.value.attributes[2].nodeValue = "color: gray;"
    
       return true
    
    }
}





async function submit(e) {

    if (firstnamevalidated() && lastnamevalidated() && phonevalidated() && emailvalidated() && message_validated()) {

        disablebtn.value = true
        
        e.target.innerText = "Submitting...";

        const response = await API.contact_us(formvalues);

        if (response.message === "mail sent") {
        
        disablebtn.value = false
        
        e.target.innerText = "Send Email"

        backend_message.value = "Your mail has been submitted. we will get back to you as soon as possible."
        
        interactive_store.toggle_info_modal(true)

        Object.entries(formvalues).forEach(([key]) => {

        formvalues[key] = ""; // Set each value to an empty string
        
        });
    
        } else {

        backend_message.value = "Error occured, please try again"
        
        interactive_store.display_error_alert_box()
        
        e.target.innerText = "Send Email"
        
        disablebtn.value = false

        Object.entries(formvalues).forEach(([key]) => {

        formvalues[key] = ""; // Set each value to an empty string
        
        });

        }
        
    }  

}


</script>

<style scoped>
/* MOBILE DEVICES */
@media only screen and (max-width: 800px) {
  * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

  div.container {
      width: 95%;
      margin: 100px auto 0px auto;
  }

  h1 {
      color: #142141;
      text-align: center;
      font-size: 24px;
      font-weight: lighter;
  }

  div.office_address {
      margin: 25px 0px 60px 0;
  }

  div.office_address div h2{
      font-size: 18px;
  }

  div.office_address div p{
      font-size: 17px;
      line-height: 30px;
  }

  div.office_address div h3{
      font-size: 17px;
      font-weight: lighter;
      margin: 30px 0 0 0;
  }

  div.office_address div h4{
      font-size: 17px;
      margin: 30px 0 0 0;
  }

  div.office_address div h4 b{
      font-weight: lighter;
  }

   div.contactusform {
      margin: 50px 0 80px 0;
      width: 100%
   }

    div.contactusform h2 {
      font-size: 18px;
    }
 

    div.contactusform form {
        margin-top: 20px;
        display: block;
        width: 100%
    }

    div.grid_container1 {
       display: block;
    }

    div.grid_container1 label{
       display: block;
       margin: 12px 0 8px 0;
       color: gray;
    }

    div.contactusform form input, button {
        display: block;
        border: 1px solid gray;
        outline: 0 solid gray;
        border-radius: 6px;
        font-size: 14px;
        padding: 10px 10px;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 3px;
    }

    div.contactusform form input:hover {
        border: 1px solid gray;
        outline: 0 solid gray;
    }

    div.contactusform form input:active {
        outline: 0 solid gray;
    }

    div.contactusform form textarea {
        border: 1px solid gray;
        outline: 0 solid gray;
        font-size: 16px;
        width: 100%;
        height: 180px;
        border-radius: 3px;
        margin-top: 0px;
        padding: 10px 11px 0 11px;
        resize: none;
        box-sizing: border-box
    }

    div.contactusform form button[type=submit] {
        background-color: green;
        cursor: pointer;
        color: #fff;
        transition: .5s
    }

    div.contactusform form button[type=submit]:hover {
        opacity: .5
    }

    div.contactusform form button[type=submit]:disabled {
        opacity: .5;
        cursor: none;
    }
 
 p.err {
     color: red;
     font-size: 12px;
  }

}



/* DESKTOP */
@media only screen and (min-width: 800px) {
   * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

  div.container {
      width: 70%;
      margin: 100px auto 0px auto;
  }

  h1 {
      color: #142141;
      text-align: center;
      font-size: 24px;
      font-weight: lighter;
  }

  div.office_address {
      display: flex;
      justify-content: space-between;
      margin: 45px 0px 60px 0;
  }

  div.office_address div h2{
      font-size: 20px;
  }

  div.office_address div p{
      font-size: 17px;
      line-height: 30px;
  }

  div.office_address div h3{
      font-size: 17px;
      font-weight: lighter;
      margin: 30px 0 0 0;
  }

  div.office_address div h4{
      font-size: 17px;
      margin: 30px 0 0 0;
  }

  div.office_address div h4 b{
      font-weight: lighter;
  }

   div.contactusform {
      margin: 80px 0 80px 0;
      width: 100%
   }

    div.contactusform h2 {
      font-size: 20px;
    }

    div.contactusform form {
        margin-top: 20px;
        display: block;
        width: 100%
    }

    div.grid_container1 {
        display: grid;
        grid-template-columns: auto auto;
        -moz-column-gap: 20px;
        column-gap: 20px
    }

    div.grid_container1 label{
       display: block;
       margin: 12px 0 8px 0;
       color: gray;
    }

    .item1 {
        grid-column-start: 1;
        grid-column-end: 2
    }

    .item2 {
        grid-column-start: 2;
        grid-column-end: 3
    }

    .item3 {
        grid-column-start: 1;
        grid-column-end: 2
    }

    .item4 {
        grid-column-start: 2;
        grid-column-end: 3
    }

    .item5 {
        grid-column-start: 1;
        grid-column-end: 3
    }

    div.contactusform form input, button {
        display: block;
        border: 1px solid gray;
        outline: 0 solid gray;
        border-radius: 6px;
        font-size: 14px;
        padding: 10px 10px;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 3px;
    }

    div.contactusform form input:hover {
        border: 1px solid gray;
        outline: 0 solid gray;
    }

    div.contactusform form input:active {
        outline: 0 solid gray;
    }

    div.contactusform form textarea {
        border: 1px solid gray;
        outline: 0 solid gray;
        font-size: 16px;
        width: 100%;
        height: 160px;
        border-radius: 3px;
        margin-top: 0px;
        padding: 10px 11px 0 11px;
        resize: none;
        box-sizing: border-box
    }

    div.contactusform form button[type=submit] {
        background-color: green;
        cursor: pointer;
        color: #fff;
        display: block;
        margin: 20px auto;
        width: 50%;
        font-size: 16px;
        transition: .5s
    }

    div.contactusform form button[type=submit]:hover {
        opacity: .5
    }

    div.contactusform form button[type=submit]:disabled {
        opacity: .5;
        cursor: none;
    }
  
  p.err {
     color: red;
     font-size: 12px;
  }
}
</style>