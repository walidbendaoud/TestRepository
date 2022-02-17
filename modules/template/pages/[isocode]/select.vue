<template>
  <div id="components-button-demo-button-group">
    <h1>{{ $t('TemplateSelect') }}</h1>
    <div v-if="templates !== null && templates.length">
      <div class="boxSelect">
        <div class="box">
          <div class="img">
            <template>
              <div class="icons-list">
                <nuxt-link :to="localePath('/' + isocode + '/template/add')">
                  <a-icon type="plus-circle" />
                </nuxt-link>
              </div>
            </template>
          </div>
          <span>
            <div class="title">
              <nuxt-link :to="localePath('/' + isocode + '/template/add')"> {{ $t('freeTemplate') }} </nuxt-link>
            </div>
          </span>
        </div>
        <div v-for="item in templates" :key="item.id" class="box">
          <template>
            <a-badge
              :count="item.type"
              :number-style="{ backgroundColor: '#52c41a', marginTop: '10px', width: '100px' }"
            />
          </template>
          <div class="img">
            <nuxt-link :to="localePath('/' + local + '/template/' + item.id)">
              <img :src="'https://api-dev.nobrand-store.mykeyrus.tn/medias/all/template/' + item.preview.value">
            </nuxt-link>
          </div>
          <span class="title">
            {{ item.title }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance, onMounted, useRoute } from '@nuxtjs/composition-api'
import { useTemplatesList } from '@TEMPLATE/composable/useTemplate'
import { useTemplateStore } from '@TEMPLATE/stores/useStore'

export default defineComponent({
  setup () {
    const instance: any = getCurrentInstance()
    const local = instance.proxy.$i18n.locale

    const store: any = useTemplateStore()
    const { useGetDataSelect, loading } = useTemplatesList()

    const $route = useRoute()
    const isocode = $route.value.params.isocode

    const templates = computed(() => {
      return store.templates
    })

    onMounted(() => {
      useGetDataSelect({ isocode })
    })

    return {
      templates,
      loading,
      local,
      isocode
    }
  },
  head () {
    return {
      title: 'Template'
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@TEMPLATE/assets/scss/select.scss';
</style>
