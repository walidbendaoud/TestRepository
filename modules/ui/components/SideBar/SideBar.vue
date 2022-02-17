<template>
  <a-layout-sider 
    v-model="collapsed" 
    :trigger="null" 
    collapsible 
    collapsed-width="80"
  >
    <div class="logo" />
    <NavMenu/>
  </a-layout-sider>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import NavMenu from '../NavMenu/NavMenu.vue';

export default defineComponent({
  components: {
    NavMenu
  },
  setup() {
    
  },
  props: {
    collapsed: {
      type: Boolean,
      default: () => false,
    },
  },
})
</script>

<style lang="scss">
  aside.ant-layout-sider { 
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0 ;
  }
  aside.ant-layout-sider+.ant-layout{
    margin-left: 200px;
  }
  aside.ant-layout-sider-collapsed{
    overflow-x:hidden;
  }
  aside.ant-layout-sider-collapsed+.ant-layout {
    margin-left: 80px;
  }
</style>
