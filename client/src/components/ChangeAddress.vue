<template>
  <div class="container" v-if = "interactive_store.display_changeaddress_modal">
  <!-- Modal -->
  <div class="modal fade in" id="myModal" role="dialog" style="display: block; top: 0%;" v-if = "interactive_store.display_changeaddress_modal">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" @click = "interactive_store.toggle_changeaddress_modal(false)">&times;</button>
          <h4 class="modal-title">ENTER DELIVERY ADDRESS</h4>
        </div>

        <div class="modal-body">
        <form class="delivery-form">
            <!-- Delivery Address Input -->
            <div class="form-group">
            <label for="address" class="form-label">Delivery Address</label>
            <textarea
                id="address"
                placeholder="Enter Your Address"
                v-model="user_store.user.delivery_address"
                maxlength="200"
                class="form-control"
            ></textarea>
            <!-- Character Counter -->
            <p class="char-counter">
                {{ user_store.user.delivery_address.length }}/200 characters
            </p>
            </div>
        </form>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal"  @click = "interactive_store.toggle_changeaddress_modal(false)">Close</button>
        </div>

      </div>
      
    </div>
  </div>
  <div class="modal-backdrop fade in" v-if = "interactive_store.display_changeaddress_modal" @click = "interactive_store.toggle_info_modal(false)"></div>
</div>
</template>

<script setup>

import { onMounted, onUnmounted, onUpdated, reactive, toRaw, ref, watch} from 'vue'

import MAP from "@/components/Map.vue";

import { useInteractiveStore } from '@/stores/interactive'

import { useUserStore } from '@/stores/user'

const user_store = useUserStore()

const interactive_store = useInteractiveStore()

</script>

<style scoped>
/* General Modal Styling */
.modal-content {
  background: linear-gradient(135deg, #ffffff, #f8f9fa);
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease-in-out;
}

.modal-header {
  background-color: rgb(67, 148, 67); /* Primary color */
  color: #fff;
  padding: 15px 20px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.modal-header .close {
  color: #fff;
  font-size: 1.2rem;
  opacity: 0.9;
  transition: opacity 0.3s ease;
}

.modal-header .close:hover {
  opacity: 1;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
}

/* Modal Body Styling */
.modal-body {
  padding: 20px 30px;
  font-size: 1rem;
  color: #333;
  text-align: left;
  background-color: #f9f9f9;
  border-radius: 10px;
}

/* Form Styling */
.delivery-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Label Styling */
.form-label {
  font-size: 1.2rem;
  color: #444;
  font-weight: bold;
  margin-bottom: 0px;
}

/* Textarea Styling */
.form-control {
  width: 100%;
  padding: 10px 15px;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  resize: none;
  min-height: 100px;
}

#address {
  font-size: 1.2rem;
}

.form-control:focus {
  border-color: rgb(67, 148, 67);
  box-shadow: 0 0 5px rgba(67, 148, 67, 0.5);
  outline: none;
}

/* Character Counter Styling */
.char-counter {
  font-size: 1.1rem;
  color: #666;
  text-align: right;
  margin: 0;
}

/* Map Section Styling */
.map-container {
  margin-top: 20px;
  text-align: center;
}

.map-title {
  font-size: 1.2rem;
  color: #444;
  font-weight: bold;
  margin-bottom: 10px;
}

.map {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  background-color: #e9ecef;
}

/* Responsiveness */
@media (max-width: 576px) {
  .modal-body {
    padding: 15px 20px;
  }
  .form-control {
    font-size: 0.9rem;
  }
  .map {
    height: 250px;
  }
}


.modal-footer {
  padding: 15px;
  background-color: #f1f1f1;
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  text-align: center;
}

.modal-footer .btn {
  background-color: rgb(67, 148, 67); /* Primary color */
  color: #fff;
  border-radius: 20px;
  padding: 8px 20px;
  transition: all 0.3s ease;
}

.modal-footer .btn:hover {
  background-color: rgb(67, 148, 67); /* Darker primary color */
  transform: scale(1.05);
}

/* Backdrop Styling */
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Fade Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>









