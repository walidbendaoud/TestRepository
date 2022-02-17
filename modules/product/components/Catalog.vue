<!-- Please remove this file from your project -->
<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <div class="mt-8 bg-white overflow-hidden shadow sm:rounded-lg p-6">
        <h2 class="text-2xl leading-7 font-semibold">
          Welcome to DDD
        </h2>
        <p class="mt-3 text-gray-600">
          We recommend you take a look at the <a href="https://nuxtjs.org" target="_blank" class="text-green-500 hover:underline">Nuxt documentation</a>, whether you are new or have previous experience with the framework.<br>
        </p>
        <p class="mt-4 pt-4 text-gray-800 border-t border-dashed">
          To get started, remove <code class="bg-gray-100 text-sm p-1 rounded border">components/Tutorial.vue</code> and start coding in <code class="bg-gray-100 text-sm p-1 rounded border">pages/index.vue</code>. Have fun!
        </p>
      </div>
      <p>
        <nuxt-link :to="localePath('/product/'+i)" 
        v-for="i in settings"
        :key="i">
          {{i}}
        </nuxt-link>
      </p>
      <div class="flex justify-center pt-4 space-x-2">
        <a-button 
          type="primary"
           @click="useAppend">
          Add random key
        </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from '@nuxtjs/composition-api'
import { useProductStore } from '@PRODUCT/stores/useStore'

export default defineComponent({
  setup() {
    let store = useProductStore();

    const useAppend = () =>{
      store.$patch((state:any) => {
        state.catalog.push(Math.random())
      })
    }

    const settings = computed(() => {
      return reactive(store.catalog);
    });

    return{
      useAppend,
      settings
    }
  }
})
</script>

