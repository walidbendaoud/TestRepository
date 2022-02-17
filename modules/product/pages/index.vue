<template>
  <div>
    <nuxt-link to="/">
      <a-button-group>
        <a-button type="primary"> <a-icon type="left" />Go back </a-button>
      </a-button-group>
    </nuxt-link>
    <Catalog/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Catalog from '../components/Catalog.vue'
import Middleware from '../middleware/routes/index'

export default Vue.extend({
  middleware: Middleware,
  components: {
    Catalog,
  },
 // layout: 'login'
})
</script>
