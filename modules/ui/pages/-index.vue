<template>
  <div>
    <nuxt-link to="/product?theme=custom">
      <a-button type="primary"> test routes middleware </a-button>
    </nuxt-link>

    <nuxt-link to="/users">
      <a-button type="primary"> users </a-button>
    </nuxt-link>

    welcome to nuxt DDD
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  
})
</script>