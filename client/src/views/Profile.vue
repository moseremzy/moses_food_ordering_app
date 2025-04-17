<template>

 <div>

 <HEADER/> 

 <SUCCESSALERTBOX>{{interactive_store.backend_message}}</SUCCESSALERTBOX>

 <ERRORALERTBOX>{{interactive_store.backend_message}}</ERRORALERTBOX>

 <SEARCHRESULT/>

 <MAINNAV/>

 <MYORDERS/>

   <div class = "container">

      <h1>Personal Information</h1>

      <div class = "grid">

       <div class="contactusform">
        <h2>Edit Details</h2>
        <form action="">
            <div class="item1">
            <label for = "first_name">First Name</label>
            <input type="text" placeholder="First Name" v-model = "information.firstname" id = "first_name" class="reedonly">
            <p class="err">{{information_error.firstname_err}}</p>
            </div>

            <div class="item2">
            <label for = "last_name">Last Name</label>
            <input type="text" placeholder="Last Name" v-model = "information.lastname" id = "last_name" class="reedonly">
            <p class="err">{{information_error.lastname_err}}</p>
            </div>
            
            <div class="item3">
            <label for = "email">Email</label>
            <input type="email" placeholder="Email" v-model = "information.email" id = "email" class="reedonly" readonly>
            <p class="err">{{information_error.email_err}}</p>
            </div>

            <div class="item4">
            <label for = "phone">Phone</label>
            <input type="text" placeholder="Phone No" v-model = "information.phone" id = "phone" class="reedonly">
            <p class="err">{{information_error.phone_err}}</p>
            </div>
            
            <div class="item5">
            <label for = "address">Delivery Address</label>
            <textarea placeholder="Enter Your Address" v-model = "information.delivery_address">
            </textarea>
            <p class="err" style="color: gray;" ref = "description_counter">{{information.delivery_address.length}}/200 characters</p>
            </div>

            <button type = "submit" @click.prevent = "Update_info"><font-awesome-icon v-if = "spinner"  class="fa-solid fa-spinner fa-spin" id = "spinner" icon="fa-solid fa-spinner"/>Save</button>
            </form>
            </div>


            <!-- CHANGE PASSWORD -->
            <div class="contactusform">
            <h2>Change Password</h2>
            <form action="">

            <div class="item4">
            <label for = "old_password">Old Password</label>
            <input type="text" placeholder="Old Password" v-model = "password.old_password" id = "old_password">
            <p class="err">{{password_error.old_password_err}}</p>
            </div>

            <div class="item4">
            <label for = "password">New Password</label>
            <input type="password" placeholder="New Password" v-model = "password.new_password" id = "new_password">
            <p class="err">{{password_error.new_password_err}}</p>
            </div>

            <div class="item4">
            <label for = "confirm_password">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" v-model = "password.confirm_password" id = "confirm_password" class="reedonly">
            <p class="err">{{password_error.confirm_password_err}}</p>
            </div>

            <button type = "submit" @click.prevent = "Update_password"><font-awesome-icon v-if = "spinner"  class="fa-solid fa-spinner fa-spin" id = "spinner" icon="fa-solid fa-spinner"/>Update Password</button>
            </form>
            </div>

      </div> <!-- CLOSE GRID -->

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
import { useRoute, useRouter } from 'vue-router'
import API from "@/api";
import MIDDLEWARES from "../middlewares/middlewares"
import { useInteractiveStore } from '@/stores/interactive'
import { useUserStore } from '@/stores/user'

const interactive_store = useInteractiveStore()

const user_store = useUserStore()

let information = reactive(user_store.user)
let information_error = reactive({
        firstname_err: "",
        lastname_err: "",
        phone_err: "",
        email_err: "",
})

let password = reactive({
    old_password: "",
    new_password: "",
    confirm_password: ""
})

let password_error = reactive({
    old_password_err: "",
    new_password_err: "",
    confirm_password_err: ""
})

let spinner = ref(false)
let disablebtn = ref(false)
let description_counter = ref(null)

const route = useRoute()
const router = useRouter()




if (!user_store.isAuthenticated) { //if user no get session redirect to login

    interactive_store.set_page_to_go('profile')

    router.push({ name: "login" })

}


watch( () => user_store.isAuthenticated,

  (isAuthenticated) => { //i dey confirm if user still dey authenticated

    if (!isAuthenticated) {

        interactive_store.backend_message = "session expired"

        interactive_store.display_success_alert_box(true)

        setTimeout(() => {

           router.push({ path: "/login" })
            
        }, 1000);

    }
  }, 
);




// /* Hooks */


onUpdated(() => {

    firstnamevalidated()
    lastnamevalidated()
    phonevalidated()
    emailvalidated()
    delivery_addressvalidated()

    old_password_validated()
    new_password_validated()
    confirm_password_validated()

    MIDDLEWARES.allowScroll()

})


onMounted(() => {

    MIDDLEWARES.allowScroll()
    
})


/* hook */



function firstnamevalidated() {

    let pattern = /^[A-Za-z]+$/;
    
    if (information.firstname === "") {
    
        information_error.firstname_err = "Please fill field";
    
    } else if (pattern.test(information.firstname) === false) {
    
        information_error.firstname_err = "Firstname can only contain letters"
    
    } else {
    
        information_error.firstname_err = ""
        
        return true;        
   }

}


function lastnamevalidated() {
    
    let pattern = /^[A-Za-z]+$/;
    
    if (information.lastname === "") {
    
        information_error.lastname_err = "Please fill field";
    
    } else if (pattern.test(information.lastname) === false) {
    
        information_error.lastname_err = "Lastname can only contain letters"
    
    } else {
    
        information_error.lastname_err = ""
        
        return true;
        
    }
}


function phonevalidated() {
    
    let pattern = /^[0-9]*$/
    
    let phone_length = information.phone.length;
    
    if (information.phone === "") {
    
        information_error.phone_err = "Please fill field";
    
    } else if (pattern.test(information.phone) === false) {
    
        information_error.phone_err = "Invalid phone number";
    
    } else if (phone_length > 11) {
    
        information_error.phone_err = "Cannot be 12 digits long"
    
    } else {
        
        information_error.phone_err = ""
        
        return true

    }         
}


function emailvalidated() {
    
    let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (information.email === "") {
    
       information_error.email_err = "Please fill field";
    
    } else if (pattern.test(information.email) === false) {
       
       information_error.email_err = "Invalid email"
    
    } else {
       
       information_error.email_err = ""
      
       return true;
    
    }
}




function delivery_addressvalidated() {

    if (information.delivery_address.length >= 200) {

       information.delivery_address = information.delivery_address.slice(0, 200)
        
       description_counter.value.attributes[2].nodeValue = "color: red;"
    
    } else {
       
       description_counter.value.attributes[2].nodeValue = "color: gray;"
    
       return true
    
    }
}



function old_password_validated() {

    if (password.old_password === "") {
       
       password_error.old_password_err = "Please fill field"
    
    } else {
    
       password_error.old_password_err = ""
    
       return true;
    
    }
}

function new_password_validated() {

    let pass_length = password.new_password.length;
    
    if (password.new_password === "") {
    
      password_error.new_password_err = "Please fill field";
    
    } else if (pass_length < 7 || pass_length > 15) {
    
      password_error.new_password_err = "Must be between 7 and 15 characters long"
    
    } else {
    
      password_error.new_password_err = ""
    
      return true;  
    
    }
}



function confirm_password_validated() {
    
    if (password.confirm_password === "") {
    
      password_error.confirm_password_err = "Please fill field";
    
    } else if (password.confirm_password !== password.new_password) {
    
     password_error.confirm_password_err = "Must match new password"
    
    } else {
     
     password_error.confirm_password_err = ""
     
     return true;
        
    }
}




async function Update_info(e) {

    if (firstnamevalidated() && lastnamevalidated() && phonevalidated() && emailvalidated() && delivery_addressvalidated()) {

        disablebtn.value = true
        
        e.target.innerText = "Saving...";

        const response = await API.update_user_info(information);

        if (response.message === "success") {
        
        disablebtn.value = false
        
        e.target.innerText = "Save"

        interactive_store.backend_message = "Your profile was updated succesfully"
        
        interactive_store.display_success_alert_box()
        
        } else {

        interactive_store.backend_message = "Error occured, please try again"
        
        interactive_store.display_error_alert_box()
        
        e.target.innerText = "Save"
        
        disablebtn.value = false

        }
        
    }  

}





async function Update_password(e) {

    if (old_password_validated() && new_password_validated() && confirm_password_validated()) {

        disablebtn.value = true
        
        e.target.innerText = "Saving...";

        const response = await API.update_password(password);

        if (response.message === "Updated") {
        
        disablebtn.value = false
        
        e.target.innerText = "Update Password"

        interactive_store.backend_message = "Password Updated"
        
        interactive_store.display_success_alert_box()

        password.old_password = ""
        
        password.new_password = ""
            
        password.confirm_password = ""
        
        } else if (response.message === "Old password incorrect") {

        disablebtn.value = false
        
        e.target.innerText = "Update Password"

        interactive_store.backend_message = "Old password is Incorrect"
        
        interactive_store.display_error_alert_box()

        password.old_password = ""
        
        password.new_password = ""
            
        password.confirm_password = ""
            
        } else {

        interactive_store.backend_message = "Error occured, please try again"
        
        interactive_store.display_error_alert_box()
        
        e.target.innerText = "Update Password"
        
        disablebtn.value = false

        password.old_password = ""
        
        password.new_password = ""
            
        password.confirm_password = ""

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
      margin: 170px auto 0px auto;
  }

  h1 {
      color: #142141;
      font-size: 24px;
      font-weight: lighter;
  }

    div.contactusform {
        margin: 50px 0 80px 0;
        border-radius: 12px;
        padding: 20px 25px;
        border: 1px solid gray;
    }

    div.contactusform h2 {
      font-size: 18px;
    }

    div.contactusform form {
        margin-top: 20px;
        display: block;
        width: 100%
    }

    div.contactusform label{
       display: block;
       margin: 14px 0 8px 0;
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
        font-size: 15px;
        width: 100%;
        height: 180px;
        border-radius: 3px;
        margin-top: 0px;
        color: black;
        padding: 10px 11px 0 11px;
        resize: none;
        box-sizing: border-box
    }

    div.contactusform form button[type=submit] {
        background-color: green;
        cursor: pointer;
        color: #fff;
        transition: .5s;
        font-weight: bold;
        margin: 20px 0px;
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
     font-size: 11px;
     margin: 0;
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
      width: 85%;
      margin: 170px auto 0px auto;
  }

  h1 {
      color: #142141;
      font-size: 24px;
      font-weight: lighter;
  }

  div.grid {
      display: grid;
      column-gap: 30px;
      grid-template-columns: auto auto;
      align-items: flex-start;
  }

   div.contactusform {
      margin: 30px 0 80px 0;
      box-sizing: border-box;
      border-radius: 12px;
      padding: 20px 20px;
      border: 1px solid gray;
   }

    div.contactusform h2 {
      font-size: 20px;
    }

    div.contactusform form {
        margin-top: 20px;
        display: block;
        width: 100%
    }

    div.contactusform {
        display: block;
    }

    div.contactusform label{
       display: block;
       margin: 14px 0 8px 0;
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
        font-size: 15px;
        width: 100%;
        height: 160px;
        border-radius: 3px;
        margin-top: 10px;
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
        font-size: 11px;
        margin: 0;
    }
 

}
</style>