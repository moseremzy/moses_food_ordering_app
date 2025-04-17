import { defineStore } from "pinia";

import API from "@/api";

export const useSettingStore = defineStore("settings", {
    
    state: () => ({

      service_fee: 0,

      market_status: '', //market open or closed

    }),
    
    actions: {

        async fetch_settings() {

            try {
    
              const response = await API.fetch_settings(); // Your API endpoint
    
              this.market_status = response.market_status

              this.service_fee = response.service_fee
    
            } catch (error) {
    
              console.log('Failed to fetch settings:', error);
    
              throw error; // Re-throw error to handle it in `main.js`
    
            }

        },
 
    }
})