<template>
    <p>Copyright &copy {{year}} Taste It</p>
</template>

<script setup>

import { ref, watch } from 'vue'

let date = new Date();

let year = ref(date.getFullYear())

</script>

<style scoped>
  * {
      font-family: 'Nuosu SIL';
      margin: 0;
      padding: 0;
  }
  p {
      margin: 80px 0 100px 0;
      text-align: center;
      font-size: 15px;
      color: rgb(126, 124, 124);
  }
</style>