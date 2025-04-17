import { defineStore } from "pinia";

import API from "@/api";


export const useUserStore = defineStore("user", {

    state: () => ({

        isAuthenticated: false,

        user: null, 

    }),

    getters: {

        
     },
    
    actions: {
    
      logged_In (user, isAuthenticated) {

        this.user = user
        
        this.isAuthenticated = isAuthenticated

      },


      logged_Out () {

        this.user = null
        
        this.isAuthenticated = !this.isAuthenticated

      },


      async fetch_user() {

        try {

          const response = await API.fetch_user(); // Your API endpoint

          this.logged_In (response.user, response.isAuthenticated)

        } catch (error) {

          console.log('Failed to fetch user:', error);

          throw error; // Re-throw error to handle it in `main.js`

        }
      }
   }
})