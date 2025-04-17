<template>
  <div class = "email_activation_container">
    <SUCCESSALERTBOX>{{backend_message}}</SUCCESSALERTBOX>
    <ERRORALERTBOX>{{backend_message}}</ERRORALERTBOX>
        <font-awesome-icon  class="remove fa-solid fa-envelope" id="envelope" icon="fa-solid fa-envelope"/>
        <h1>Please verify your email</h1>
        <p>You're almost there! We sent an email to</p>
        <b>{{route.query.confirmationEmail}}</b>
        <p>Just click on the link in that email to complete your signup. If you don't see it, you may need to <b>Check your spam</b> folder.</p>
        <p>Still can't find the email? No problem.</p>
        <button id="btn" @click.prevent = "send_confirmation_mail" :disabled = "disablebtn">Resend Verification Email <font-awesome-icon v-if = "spinner" class="remove fa-solid fa-spinner fa-spin" id="spinner" icon="fa-solid fa-spinner"/></button>
        </div>
</template>
 
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SUCCESSALERTBOX from "@/components/alert_box/success.vue";
import ERRORALERTBOX from "@/components/alert_box/error.vue";
import API from "@/api";
import { useInteractiveStore } from '@/stores/interactive'
const interactive_store = useInteractiveStore()


const route = useRoute()
const router = useRouter()


let spinner = ref(false)
let disablebtn = ref(false)
let backend_message = ref('')



async function send_confirmation_mail() {

    spinner.value = true

    disablebtn.value = true

    const response = await API.ResendConfirmationMail({ confirmationEmail: route.query.confirmationEmail});

    switch (response.message) {

    case "mail sent":

    backend_message.value = "Confirmation Email Was Resent"
            
    interactive_store.display_success_alert_box()
    
    spinner.value = false

    disablebtn.value = false;
        
    break;

    case "error occured":

    backend_message.value = "failed"
            
    interactive_store.display_error_alert_box()

    spinner.value = false

    disablebtn.value = false;

    break;

    case "Invalid email":

    backend_message.value = "Invalid Email"
            
    interactive_store.display_error_alert_box()

    spinner.value = false

    disablebtn.value = false;

    break;

}

}
 

</script>


<style scoped>

@media only screen and (min-width: 612px) {
  * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }

    div.email_activation_container {
        width: 500px;
        margin: 20px auto 0 auto;
        text-align: center;
        padding: 20px
    }

    #envelope {
        background-color: #92be92;
        padding: 20px;
        font-size: 30px;
        color: green;
        border-radius: 50%
    }

    div.email_activation_container h1 {
        color: #2e2c2c;
        margin: 20px 0 20px 0;
        font-size: 30px
    }

    div.email_activation_container p {
        font-size: 16px;
        color: #2e2c2c;
        margin: 22px 0 0 0;
        line-height: 30px
    }

    div.email_activation_container b {
        font-size: 16px;
    }

    div.email_activation_container h3 {
        font-size: 13px;
        margin: 30px 0 2px 0
    }

    #btn {
        cursor: pointer;
        padding: 10px 12px;
        border-radius: 5px;
        color: #fff;
        font-weight: 700;
        border: 1px solid #212136;
        background-color: #212136;
        margin-top: 10px
    }

    #btn:disabled {
        cursor: none;
        opacity: .9
    }
}

@media only screen and (max-width: 612px) {
    * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
    }

    div.email_activation_container {
        width: 75%;
        margin: 15px auto 0 auto;
        text-align: center;
        padding: 20px
    }

    #envelope {
        background-color: #92be92;
        padding: 20px;
        font-size: 30px;
        color: green;
        border-radius: 50%
    }

    div.email_activation_container h1 {
        color: #2e2c2c;
        margin: 15px 0 16px 0;
        font-size: 29px
    }

    div.email_activation_container p {
        font-size: 17px;
        color: #2e2c2c;
        margin: 18px 0 0 0;
        line-height: 24px
    }

    div.email_activation_container b {
        font-size: 16px;
    }

    div.email_activation_container h3 {
        font-size: 13px;
        margin: 30px 0 2px 0
    }

    #btn {
        cursor: pointer;
        padding: 10px 12px;
        border-radius: 5px;
        color: #fff;
        font-size: 15px;
        font-weight: 700;
        border: 1px solid #212136;
        background-color: #212136;
        margin-top: 10px
    }

    #btn:disabled {
        cursor: none;
        opacity: .9
    }
}

</style>

 