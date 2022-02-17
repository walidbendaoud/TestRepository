<template>
  <div>
    <nuxt-link to="/product">
      <a-button-group>
        <a-button type="primary"> <a-icon type="left" />Go back </a-button>
      </a-button-group>
    </nuxt-link>
    <p>test dynaic route page {{$route.params.id_test}}</p>

    <template>
      <div>
        <VueSlickCarousel :arrows="true" :dots="true">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </VueSlickCarousel>
      </div>
    </template>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Catalog from '../../components/Catalog.vue'
import Middleware from '../../middleware/routes/index'

export default Vue.extend({
  middleware: Middleware,
  components: {
    Catalog,
  },
  layout: 'login'
})
</script>
