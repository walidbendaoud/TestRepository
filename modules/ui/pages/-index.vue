<template>
  <div>
    <nuxt-link :to="localePath({name:'product', query:{theme:'custom'}})">
      <a-button type="primary"> test routes middleware </a-button>
    </nuxt-link>

    <nuxt-link :to="localePath({name:'test-users', params:{test:'test'}})">
      <a-button type="primary"> users </a-button>
    </nuxt-link>
    welcome to nuxt DDD
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>