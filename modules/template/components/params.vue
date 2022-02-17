<template>
  <div>
    <a-list item-layout="horizontal" :data-source="data" class="paramsListSelect">
      <a-list-item slot="renderItem" slot-scope="item" @click="useSelectParamsList(item.title)">
        <a-list-item-meta>
          <span slot="title">{{ item.title }}</span>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from '@nuxtjs/composition-api'
import { useTemplateStore } from '@TEMPLATE/stores/useStore'

export default defineComponent({
  setup (props, context) {
    console.log(props) // TO COMMIT ONLY
    const store: any = useTemplateStore()
    onMounted(() => {
      store.getTemplateParams({
        onError: () => {},
        onSuccess: () => {}
      })
    })

    const data = computed(() => {
      return store.templateParams.data
    })

    const useSelectParamsList = (title: any) => {
      context.emit('change-titleParam', ' ' + title + ' ')
    }
    return { data, useSelectParamsList }
  },
  head () {
    return {
      title: 'Template'
    }
  }
})
</script>
<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.ant-list-item {
  padding: 3px 0;
  &:hover {
    cursor: pointer;
    background: $Whisper;
  }
  span {
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
