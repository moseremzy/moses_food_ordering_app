<template>

  <div>
  <!-- Soup Selection Modal -->
  <div class="modal fade in" id="soupModal" role="dialog" style="display: block; top: 20%;" v-if="interactive_store.display_soup_selection_modal">
    <div class="modal-dialog">
      <!-- Modal content -->
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" @click="interactive_store.toggle_soup_selection_modal(false)">&times;</button>
          <h4 class="modal-title">Select Your Soup</h4>
        </div>
        
        <div class="modal-body">
          <p>Please select the soup you would like with your swallow order:</p>
          <div class="soup-options" v-if = "soups.length > 0">
            <div v-for="soup in soups" :key="soup.name" class="soup-option">
              <input 
                type="radio" 
                :id="`soup-${soup.name}`" 
                :value="soup.name" 
                v-model="selectedSoup"
              />
              <label :for="`soup-${soup.name}`">{{ soup.name }}</label>
            </div>
          </div>
          <h4 v-else>No item available</h4>
          <p class="err" v-if="soupError">{{ soupError }}</p>
        </div>

        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-default" 
            :disabled="disablebtn" 
            data-dismiss="modal" 
            @click.prevent="submitSoupSelection"
          >
            <font-awesome-icon v-if="spinner" class="fa-solid fa-spinner fa-spin" id="spinner" icon="fa-solid fa-spinner" /> Confirm
          </button>
        </div>
      </div>
      
    </div>
  </div>
  <div class="modal-backdrop" v-if="interactive_store.display_soup_selection_modal" @click="interactive_store.toggle_soup_selection_modal(false)"></div>
</div>
</template>

<script setup>
import { ref, computed, toRefs } from 'vue';
import { useInteractiveStore } from '@/stores/interactive';
import { useOrdersStore } from '@/stores/orders';
import { useItemStore } from '@/stores/items';
import API from "../../api";

const interactive_store = useInteractiveStore();

const orders_store = useOrdersStore();

const items_store = useItemStore();

// Sample soups for selection
const soups =  computed(() => { //search for item

    return items_store.items.filter((item) => {

    return item.sub_category == 'soup';

  })

})


const selectedSoup = ref(null);
const soupError = ref("");
const spinner = ref(false);
const disablebtn = ref(false);

function validateSoupSelection() {
  if (!selectedSoup.value) {
    soupError.value = "Please select a soup.";
    return false;
  }
    soupError.value = "";
    return true;
}

async function submitSoupSelection(e) {

 if (validateSoupSelection()) {

    disablebtn.value = true;

    e.target.innerText = "Submitting...";

     let quantity = items_store.selectedSwallow.temporal_quantity; // Get the quantity first

    // Create a shallow copy of selectedSwallow
    const itemToAdd = { ...items_store.selectedSwallow };

    // Update the copy's name with the selected soup
    itemToAdd.name = `${selectedSoup.value} and ${itemToAdd.name}`;

    delete itemToAdd.temporal_quantity; // Remove the temporary quantity

    // Add the copied item to the cart
    items_store.add_to_cart(itemToAdd, quantity);

    interactive_store.toggle_soup_selection_modal(false);
      
    e.target.innerText = "Confirm";
    disablebtn.value = false;
    selectedSoup.value = null;
  }
}
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
  background-color: #8c4600; /* Updated primary color */
  color: #fff;
  padding: 15px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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

.modal-body {
  padding: 20px;
  font-size: 1.3rem;
  color: #333;
  text-align: center;
}

.soup-options {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-top: 20px;
}

.soup-option {
  display: flex;
  align-items: center;
  gap: 10px; /* Adds space between the radio button and label */
  padding: 5px 0; /* Adds vertical spacing between options */
}

.soup-option label {
  font-size: 1.3rem;
  cursor: pointer;
  margin: 0; /* Ensures no unnecessary margin around the label */
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
  background-color: #8c4600; /* Updated primary color */
  color: #fff;
  border-radius: 20px;
  padding: 8px 20px;
  transition: all 0.3s ease;
  outline: 0;
}

.modal-footer .btn:hover {
  background-color: #732800; /* Darker primary color */
  transform: scale(1.05);
}

.modal-footer .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

p.err {
  color: red;
  font-size: 1.2rem;
  margin: 10px 0 0;
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
