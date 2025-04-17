import { defineStore } from "pinia";

import API from "@/api";

export const useOrdersStore = defineStore("orders", {

    state: () => ({
    
        orders: [],

        current_order_id: null

    }),

    getters: {

      current_order: (state) => {

        return state.orders.filter((order) => {

          return order.order_id === state.current_order_id

        })
      
      },
        
    },
    
    actions: {
    
        async fetch_orders() {

            try {
    
              const response = await API.fetch_orders(); // Your API endpoint
    
              this.orders = response.orders || []
    
            } catch (error) {
    
              console.log('Failed to fetch orders:', error);
    
              throw error; // Re-throw error to handle it in `main.js`
    
            }
        }
    }
})