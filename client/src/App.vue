<template>
  <router-view />
</template>

<script setup>

import { onMounted } from 'vue'

import { useSettingStore } from '@/stores/settings'

import { useOrdersStore } from '@/stores/orders'

import { useUserStore } from '@/stores/user'

const settingStore = useSettingStore()

const orders_store = useOrdersStore()

const user_store = useUserStore()

onMounted(() => {

  setInterval(async () => { //polling for orders

        await orders_store.fetch_orders()
      
  }, 120 * 1000); //2 minutes


  setInterval(async () => { //polling for market_status

        await settingStore.fetch_settings()
      
  }, 240 * 1000); //4 minutes

  
  setInterval(async () => { //polling for user mainly for session

        await user_store.fetch_user()
      
  }, 60 * 1000); //2 minutes


 })

</script>
