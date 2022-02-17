<template>
  <div id="components-button-demo-button-group">
    <h1>{{ $t('TemplateList') }}</h1>
    <div class="addBtn">
      <a-button class="" @click="$router.push(localePath('/' + isocode + '/template/select'))">
        {{ $t('addTemplate') }}
      </a-button>
    </div>
    <div class="inputForm">
      <template-Filter />
      <div>
        <template-Search />
      </div>
    </div>

    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="templates"
      :pagination="pagination"
      :loading="loading"
      @change="useHandleTableChange"
    >
      <img
        slot="preview"
        slot-scope="preview"
        style="width: 60px; height: 62px"
        :src="'https://api-dev.nobrand-store.mykeyrus.tn/medias/all/template/' + preview.value"
      >

      <template slot="isPredefined" slot-scope="isPredefined">
        <div class="predefined" :class="{ tohide: !isPredefined }">
          <img :src="predefined" width="20">
        </div>
      </template>
      <template slot="id" slot-scope="id, record">
        <div class="actions" :data-id="id.key">
          <a
            class="btn"
            @click="$router.push(localePath('/' + isocode + '/template/' + id))"
          ><a-icon
            type="setting"
          /></a>
          <a href="" @click.prevent>
            <a-popconfirm
              :title="$t('deleteConfirm')"
              class="remove"
              :ok-text="$t('yes')"
              :cancel-text="$t('no')"
              @confirm="useRemoveItem(record)"
            >
              <a-icon type="delete" style="padding: 5px" />
            </a-popconfirm>
          </a>
        </div>
      </template>

      <template slot="aggregators" slot-scope="aggregators">
        <ul v-if="aggregators !== null && aggregators.length && typeof aggregators != 'string'" class="aggregators">
          <li v-for="item in aggregators" :key="item.name[0]">
            <span v-if="item.owner !== null">
              {{ item.name[0].value }}
              {{ item.owner.name[0].value }}
            </span>
            <span v-else>
              {{ item.name[0].value }}
            </span>
          </li>
        </ul>
      </template>

      <template slot="creationTime" slot-scope="creationTime">
        <span>
          {{ useMyDayjs(creationTime) }}
        </span>
      </template>

      <template slot="modifiedTime" slot-scope="modifiedTime">
        <span>
          {{ useMyDayjs(modifiedTime) }}
        </span>
      </template>

      <span slot="action" slot-scope="text, record">
        <nuxt-link
          :to="localePath('/' + isocode + '/template/' + record.id)"
        ><a-icon
          type="edit"
          style="padding: 5px"
        /></nuxt-link>
      </span>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, getCurrentInstance, onMounted, useRoute } from '@nuxtjs/composition-api'
import { useTemplatesList } from '@TEMPLATE/composable/useTemplate'
import { useTemplateStore } from '@TEMPLATE/stores/useStore'
import 'dayjs/locale/fr' // load on demand
import templateFilter from '@TEMPLATE/components/Filter.vue'
import templateSearch from '@TEMPLATE/components/Search.vue'
import predefined from '@TEMPLATE/assets/predefined.svg'

export default defineComponent({
  components: {
    templateFilter,
    templateSearch
  },
  setup () {
    const instance: any = getCurrentInstance()
    const tw = instance.proxy.$i18n
    const local = instance.proxy.$i18n.locale
    const $route = useRoute()
    const isocode = $route.value.params.isocode

    const cols = [
      {
        title: tw.t('predefined'),
        sorter: true,
        dataIndex: 'isPredefined',
        key: 'isPredefined',
        scopedSlots: { customRender: 'isPredefined' }
      },
      {
        title: tw.t('preview'),
        dataIndex: 'preview',
        key: 'preview',
        scopedSlots: { customRender: 'preview' }
      },
      {
        title: tw.t('title'),
        sorter: true,
        dataIndex: 'title',
        key: 'title',
        scopedSlots: { customRender: 'title' }
      },
      {
        title: tw.t('type'),
        sorter: true,
        dataIndex: 'type',
        width: '15%',
        scopedSlots: { customRender: 'type' }
      },
      {
        title: tw.t('CreatedOn'),
        sorter: true,
        dataIndex: 'creationTime',
        key: 'creationTime',
        width: '20%',
        scopedSlots: { customRender: 'creationTime' }
      },
      {
        title: tw.t('Modified'),
        sorter: true,
        dataIndex: 'modifiedTime',
        key: 'modifiedTime',
        width: '20%',
        scopedSlots: { customRender: 'modifiedTime' }
      },
      {
        title: tw.t('CreatedBy'),
        sorter: true,
        dataIndex: 'createdBy',
        key: 'createdBy',
        align: 'right',
        scopedSlots: { customRender: 'createdBy' }
      },
      {
        title: tw.t('Agregator'),
        sorter: true,
        dataIndex: 'aggregators',
        key: 'aggregators',
        width: '25%',
        scopedSlots: { customRender: 'aggregators' }
      },
      {
        title: tw.t('actions'),
        dataIndex: 'id',
        key: 'id',
        scopedSlots: { customRender: 'id' }
      }
    ]

    const value = 'all'
    const store: any = useTemplateStore()
    const { useGetData, loading, pagination } = useTemplatesList()

    const columns: any = ref<Object[]>(cols)
    const dayjs = require('dayjs')

    const useMyDayjs = (x: any) => {
      return dayjs(x).format('YYYY-MM-DD  hh:mm:ss')
    }

    const templates = computed(() => {
      return store.templates
    })

    const useHandleTableChange = (pagination: any, sorter: any) => {
      let sort = 'desc'
      if (sorter.order === 'ascend') {
        sort = 'asc'
      }
      const pager = { ...pagination }
      pager.current = pagination.current
      pagination = pager
      useGetData({ isocode, sort, sortField: sorter.field, current: pagination.current - 1 })
    }

    const useOpenNotification = (name: any, type: any) => {
      const message = 'Template "' + name.toUpperCase() + '" removed'
      instance.proxy.$notification[type]({
        message,
        description: '',
        duration: 2
      })
    }

    const useRemoveItem = (record: any) => {
      store.useTemplateDelete({
        $id: record.id,
        onError: () => {
          useOpenNotification(record.type, 'success')
        },
        onSuccess: () => {
          useOpenNotification(record.title, 'success')
        }
      })
    }

    onMounted(() => {
      useGetData({ isocode })
    })

    return {
      templates,
      loading,
      columns,
      pagination,
      useHandleTableChange,
      useRemoveItem,
      useMyDayjs,
      value,
      local,
      isocode,
      predefined
    }
  },
  head () {
    return {
      title: 'Template'
    }
  }
})
</script>

<style scoped>
@import '../../assets/scss/templateList.scss';
</style>
