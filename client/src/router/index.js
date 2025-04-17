
import { createRouter, createWebHistory } from "vue-router";
import PageNotFound from '../views/Page-Not-Found.vue'
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import Cart from '../views/Cart.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import ViewDish from '../views/View-Dish.vue'
import HallRental from '../views/Hall-Rental.vue'
import CateringInstitute from '../views/Catering-Institute.vue'
import EventManagement from '../views/Event-Management.vue'
import Checkout from '../views/Checkout.vue'
import Profile from '../views/Profile.vue'
import PaymentVerification from '../views/Payment-Verification.vue'



const router = createRouter({

history: createWebHistory(process.env.BASE_URL),

routes: [
 
  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: PageNotFound,
    meta: {
      title: 'Page Not Found'
    }
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: "Home - Taste It"
    }
  },
  {
    path: "/shop",
    name: "shop",
    component: Shop,
    meta: {
      title: "Shop - Taste It"
    }
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
    meta: {
      title: "Cart - Taste It"
    }
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      title: "About us - Taste It"
    }
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact,
    meta: {
      title: "Contact us - Taste It"
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      title: "Create an Account - Taste It"
    }
  },
  {
    path: '/email-activation',
    name: 'email-activation',
    component: () => import('../views/Email-Activation.vue'),
    meta: {
      title: 'Email Verification - Taste It'
    }
  },
  {
    path: '/email-confirmation/:id',
    name: 'email-confirmation',
    component: () => import('../views/Email-Confirmation.vue'),
    meta: {
      title: 'Email Confirmation - Taste It'
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login - Taste It"
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../views/Forgot-Password.vue'),
    meta: {
      title: 'Reset Your Password - Taste It'
    }
  },
  {
    path: '/new-password/:id',
    name: 'new-password',
    component: () => import('../views/New-Password.vue'),
    meta: {
      title: 'Create New Password - Taste It'
    }
  },
  {
    path: "/view-dish/:item",
    name: "view-dish",
    component: ViewDish,
    meta: {
      title: "View Dish - Taste It"
    }
  },
  {
    path: "/hall-rental",
    name: "hall-rental",
    component: HallRental,
    meta: {
      title: "Hall Rental - Taste It"
    }
  },
  {
    path: "/catering-institute",
    name: "catering-institute",
    component: CateringInstitute,
    meta: {
      title: "Catering Institute - Taste It"
    }
  },
  {
    path: "/event-management",
    name: "event-management",
    component:  EventManagement,
    meta: {
      title: "Event Management - Taste It"
    }
  },

  //DASHBOARD PAGES

  {
    path: '/account/checkout',
    name: 'checkout',
    component: Checkout,
    meta: {
      title: 'Checkout - Taste It'
    }
  },
  {
    path: '/account/profile',
    name: 'profile',
    component: Profile,
    meta: {
      title: 'My profile - Taste It'
    }
  },
  {
    path: '/account/payment-verification',
    name: 'payment-verification',
    component: PaymentVerification,
    meta: {
      title: 'Payment Verification - Taste It'
    }
  }
],

scrollBehavior(to, from, savedPosition) {
  
  if (to.name === 'shop') {
   
    return savedPosition || {};

  }
   
  return { top: 0 }; // Scroll to the top
  
}

})


router.beforeEach((to, from, next) => { // Used to Set Page Title
  
  document.title = to.meta.title || 'Taste It | You Order, We Deliver.';

  next();

});

export default router;
