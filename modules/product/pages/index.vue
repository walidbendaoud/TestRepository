<template>
  <div>
    <nuxt-link :to="localePath('/')">
      <a-button-group>
        <a-button type="primary"> <a-icon type="left" />Go back </a-button>
      </a-button-group>
    </nuxt-link>
    <nuxt-link :to="localePath('/product/add')">
      <a-button> Add product </a-button>
    </nuxt-link>
    <catalog/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import Vue from "vue";
import Catalog from "@PRODUCT/components/Catalog.vue";
import Middleware from "@PRODUCT/middleware/routes/index";

export default defineComponent({
  middleware: Middleware,
  components: {
    Catalog,
  },
})
</script>
