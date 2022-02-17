<template>
  <a-form-item>
    <label v-if="rule.title" v-html="rule.title"> </label>
    (dev inprogess)
    <a-button 
      :type="rule.props.type" 
      :placeholder="rule.placeholder"
      :class="rule.className"
      :disabled="rule.disabled"
      @click="rule.click">
      {{rule.value}}
    </a-button>
  </a-form-item>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    
  },  
  data() {
    return {
      collapse: false,
    };
  },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    rule:{
      type: Object,
      default:()=>  {}
    },
    config:{
      type: Boolean,
      default:()=>  false
    },
  }
})
</script>
