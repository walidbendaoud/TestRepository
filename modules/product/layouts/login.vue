<template>
  <a-layout id="components-layout-demo-custom-trigger">
    layout test
    <nuxt />
  </a-layout>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	head() {
		return {
			title: 'Login',
		};
	},
})
</script>
