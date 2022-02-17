<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <!-- sidebar -->
    <SideBar :collapsed="collapsed" />
    <a-layout>
      <Header
        :collapsed="collapsed"
        v-on:collapse-menu="
          (e) => {
            collapsed = e;
          }
        "
      />
      <MainContent>
        <nuxt />
      </MainContent>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api';
import SideBar from '@UI/components/SideBar/SideBar.vue';
import Header from '@UI/components/Header/Header.vue';
import MainContent from '@UI/components/MainContent/MainContent.vue';

export default defineComponent({
  components: {
    SideBar,
    Header,
    MainContent,
  },
  setup() {
    const collapsed = ref<Boolean>(false);

    return { collapsed };
  },
  head() {
    return {
      title: 'Dashboard',
    };
  },
});
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
.ant-layout {
  transition: all 0.2s;
}

#components-layout-demo-custom-trigger {
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #1890ff;
    }
  }
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
</style>