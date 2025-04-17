
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { useUserStore } from './stores/user';
import { useOrdersStore } from './stores/orders';
import { useItemStore } from './stores/items';
import { useSettingStore } from './stores/settings';

import { createPinia } from 'pinia'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faNavicon, faSpinner, faHome, faCartShopping, faSearch, faUtensils, faHotel, faBurger, faPeopleRoof, faGraduationCap, faShop, faHouse, faUser, faTrash, faExclamation, faArrowRightLong, faXmark, faArrowLeftLong, faCircleCheck, faChevronLeft, faChevronRight, faBoxOpen, faCube, faEnvelope, faSignOut} from '@fortawesome/free-solid-svg-icons'

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'; 

/* add icons to the library */
library.add( faNavicon, faSpinner, faHome, faCartShopping, faSearch, faUtensils, faHotel, faBurger, faPeopleRoof, faGraduationCap, faShop, faHouse, faUser, faTrash, faExclamation, faArrowRightLong, faXmark, faArrowLeftLong, faCircleCheck, faChevronLeft, faChevronRight, faBoxOpen, faCube, faEnvelope, faSignOut, faWhatsapp)

// Import the component
import SUCCESSALERTBOX from './components/alert_box/success.vue';
import ERRORALERTBOX from './components/alert_box/error.vue';
import WHATSAPP from "./components/Whatsapp.vue"

const app = createApp(App)

const pinia = createPinia()

app.component('font-awesome-icon', FontAwesomeIcon)

// Register the component globally
app.component('SUCCESSALERTBOX', SUCCESSALERTBOX);
app.component('ERRORALERTBOX', ERRORALERTBOX);
app.component('WHATSAPP', WHATSAPP);

app.use(router)
app.use(pinia)

// Fetch data before mounting the app
const initializeApp = async () => {
    
    const userStore = useUserStore(); // Access the user store

    const ordersStore = useOrdersStore(); //Access the orders store

    const itemStore = useItemStore(); //Access the orders store

    const settingStore = useSettingStore();
    
    try {
    
        await Promise.all([

            userStore.fetch_user(),

            ordersStore.fetch_orders(),

            settingStore.fetch_settings(),

            itemStore.fetch_items(),

        ]);
    
    } catch (error) {
    
        console.log("Error during initialization:", error);

    }
  
    app.mount('#app'); // Mount the app only after data is fetched
  
};
  
initializeApp();

// app.mount("#app");
