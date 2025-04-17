import { defineStore } from "pinia";

import API from "@/api";

import { useInteractiveStore } from './interactive'; // Import the cart store

import { useSettingStore } from './settings'; // Import the settings store

export const useItemStore = defineStore("items", {

    state: () => ({

       selectedSwallow: null,
    
       items: [],

       cart: JSON.parse(localStorage.getItem('cart_items')) || [] //get cart items from localstorage

    }),

    getters: {

        total_cart_items: (state) => state.cart.length,

        cart_subtotal_amount: (state) => {

          return state.cart.reduce((acc, current_item) => acc + current_item.total, 0);
        
        },

        cart_total_amount: (state) => {

          const setting_store = useSettingStore()

          return state.cart_subtotal_amount + setting_store.service_fee
        
        },

        cart_items: (state) => {

          return state.cart || []

        }
        
     },
    
    actions: {

      async fetch_items() {

        try {

          const response = await API.fetch_items(); // Your API endpoint

          this.items = response.all_items || []
          

        } catch (error) {

          console.log('Failed to fetch items:', error);

          throw error; // Re-throw error to handle it in `main.js`

        }
    },

    
    add_to_cart(product, quantity) {

      const interactive_store = useInteractiveStore(); // Access the interactive store

      try {

        let product_exists = this.cart.find((item) => item.name === product.name);

        if (product_exists) { // If the product already exists in the cart, update its quantity and total

          product_exists.soup = product.soup
         
          product_exists.quantity += quantity;
         
          product_exists.total = product_exists.price * product_exists.quantity;
        
        } else { // If the product is new, add a fresh copy to the cart
         
          this.cart.unshift({
           
            ...product, // Copy product properties
           
            quantity, // Add quantity
           
            total: product.price * quantity, // Calculate total
          
          });
        }

        this.save_cart_to_Lstorage() //store cart items for localstorage 

        interactive_store.display_success_alert_box() //display success alert box

      } catch(err) { //if there is an error
        
        interactive_store.display_error_alert_box()

    }

  },  


  remove_from_cart (product) { //delete item from cart

    this.cart = this.cart.filter((item) => {

      return item.name !== product.name

    })

    this.save_cart_to_Lstorage()

  },


  save_cart_to_Lstorage () { //store cart items for localstorage

    localStorage.setItem('cart_items', JSON.stringify(this.cart)); 

  }

 }
})