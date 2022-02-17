<template>
  <div class="antForm">
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit.prevent="useHandleSubmit">
      <a-form-item :label="tw.t('titleFormLabel')">
        <a-input
          v-decorator="[
            tw.t('titleFormLabel'),
            {
              setFieldsValue: template.id,
              rules: [{ required: true, message: 'Please type the name of template' }],
            },
          ]"
          @input="useHandleChange"
        />
      </a-form-item>

      <a-form-item :label="'*' + tw.t('preview')">
        <template-Media :is-media="false" :is-visible="false" @change-preview="useChangePreview" />
      </a-form-item>

      <a-form-item label="Type">
        <a-select
          v-decorator="[
            tw.t('type'),
            {
              rules: [{ required: true, message: tw.t('titleFormMsg') }],
            },
          ]"
          @change="useHandleChange"
        >
          <a-select-option :value="tw.t('MONOSERVICE')">
            {{ tw.t('MONOSERVICEM') }}
          </a-select-option>
          <a-select-option :value="tw.t('MONOSERVICE')">
            {{ tw.t('MONOSERVICEM') }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <template-Media
        v-if="visible"
        :image-name-array-src="imageNameArray"
        :is-visible="visible"
        :is-media="true"
        @change-body="usechangeBody"
        @change-visible="useChangeVisible"
        @change-imageNameArray="useChangeImageNameArray"
      />

      <div class="bodyRow">
        <div class="captionBody">
          <div class="ant-form-item-label">
            <label>*{{ tw.t('body') }}</label>
          </div>
        </div>
        <div class="bodyContent">
          <a-button type="primary" style="margin-bottom: 20px" @click="() => (visible = true)">
            {{ tw.t('upload') }}
          </a-button>

          <v-md-editor
            v-model="body"
            v-decorator="[
              {
                rules: [{ required: true, message: tw.t('bodyFormMsg') }],
              },
            ]"
            height="400px"
          />
        </div>
      </div>
      <a-modal v-model="visible3" centered :footer="null" :width="800">
        <div class="popupBlock" style="background: #fff">
          <a-table
            style="width: 100%; padding: 30px"
            :row-key="(record) => record.id"
            :row-selection="{ selectedRowKeysAggr: selectedRowKeysAggr, onChange: useOnSelectChange }"
            :columns="columns"
            :data-source="aggregators"
          >
            <div
              slot="filterDropdown"
              slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
              style="padding: 8px"
            >
              <a-input
                v-ant-ref="(c) => (searchInput = c)"
                :placeholder="tw.t('search') + ' un ' + tw.t('Agregator')"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block"
                @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                @pressEnter="() => useHandleSearch(selectedKeys, confirm, column.dataIndex)"
              />
              <a-button
                type="primary"
                icon="search"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="() => useHandleSearch(selectedKeys, confirm, column.dataIndex)"
              >
                {{ tw.t('search') }}
              </a-button>
              <a-button size="small" style="width: 90px" @click="() => useHandleReset(clearFilters)">
                {{ tw.t('reset') }}
              </a-button>
            </div>
            <a-icon
              slot="filterIcon"
              slot-scope="filtered"
              type="search"
              :style="{ color: filtered ? '#108ee9' : undefined }"
            />
            <template slot="customRender" slot-scope="text, record, index, column">
              <span v-if="searchText && searchedColumn === column.dataIndex">
                <template
                  v-for="(fragment, i) in text
                    .toString()
                    .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                >
                  <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{
                    fragment
                  }}</mark>
                  <template v-else>{{ fragment }}</template>
                </template>
              </span>
              <template v-else>
                {{ text }}
              </template>
            </template>
          </a-table>
          <a-button
            type="primary"
            @click="
              selectedRowKeysAggrValidate = true;
              visible3 = false;
            "
          >
            Valider
          </a-button>
        </div>
      </a-modal>

      <a-form-item :label="tw.t('aggrigatorFormLabel')">
        <a-checkbox :checked="aggreCheck" @change="useOnChangeAggregator" />
      </a-form-item>

      <a-form-item v-if="!aggreCheck" label="Aggregators">
        <a-input v-model="searchAggr" @change="useSearchAggr">
          <a-icon slot="addonAfter" type="unordered-list" @click="visible3 = true" />
          <a-icon
            slot="addonAfter"
            type="delete"
            style="border-left: 2px solid #d9d9d9; margin-left: 5px; padding-left: 5px"
            @click="
              selectedRowKeysAggr = [];
              selectedRowKeysAggrSearch = [];
              selectedRowKeysAggrList = [];
            "
          />
        </a-input>
        <div v-if="AggrResArray.length > 0" class="aggrListSelect">
          <a-icon type="close" style="text-align: right; width: 100%" @click="useSearchAggr('')" />
          <a-list item-layout="horizontal" :data-source="AggrResArray">
            <a-list-item slot="renderItem" slot-scope="item" @click="useSelectAggrList(item.id)">
              <a-list-item-meta>
                <span slot="title">{{ item.aggregatorId }}</span>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
        <div v-if="selectedRowKeysAggrList.length > 0" style="display: flex; flex-wrap: wrap; margin-top: 30px">
          <div v-for="item in selectedRowKeysAggrList" :key="item.id">
            <a-button>
              {{ item.aggregatorId }}
              <a @click="useDeleteAggr(item.id)">
                <a-icon type="close" style="padding-left: 5px" />
              </a>
            </a-button>
          </div>
        </div>
      </a-form-item>

      <a-form-item :label="tw.t('backgroundRecommandFormLabel')">
        <a-input v-decorator="['colorBackground']" :disabled="id !== undefined" @input="useHandleChange" />
      </a-form-item>

      <a-form-item :label="tw.t('colorPriceFormLabel')">
        <a-input v-decorator="['priceColor']" :disabled="id !== undefined" @input="useHandleChange" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit" :disabled="$route.params.id && disableSubmit">
          Submit
        </a-button>
        <a-button html-type="button" @click="$router.push(localePath('Template'))">
          Cancel
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  getCurrentInstance,
  computed,
  onMounted,
  useRoute,
  useRouter
} from '@nuxtjs/composition-api'
import { useTemplatesList } from '@TEMPLATE/composable/useTemplate'
import { useTemplateStore } from '../stores/useStore'
import templateMedia from './Media.vue'

export default defineComponent({
  components: {
    templateMedia
  },
  setup () {
    const store: any = useTemplateStore()
    const instance: any = getCurrentInstance()
    const disableSubmit: any = ref<Boolean>(true)
    const $route = useRoute()
    const $router: any = useRouter()
    const body = ref('')
    let preview: any
    const visible3 = ref(false)
    const visible = ref(false)
    let imageNameArray: any = []
    const AggrResArray: any = ref([])
    const searchAggr = ref('')
    const selectedRowKeysAggrList = ref([])
    const selectedRowKeysAggrSearch = ref([])
    const id = ref('')
    const tw = instance.proxy.$i18n

    const selectedRowKeysAggrValidate = ref(false)
    const aggreCheck = ref(true)

    const selectedRowKeysAggr: any = ref([])
    let searchText: any = ''
    const searchInput: any = null
    let searchedColumn: any = ''

    const columns = [
      {
        title: tw.t('title'),
        key: 'aggregatorId',
        dataIndex: 'aggregatorId',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender'
        },
        onFilter: (value: any, record: any) => record.aggregatorId.indexOf(value) === 0,
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              searchInput.focus()
            }, 0)
          }
        }
      }
    ]

    const { useGetAggregatorsData } = useTemplatesList()
    const local = instance.proxy.$i18n.locale

    const isocode = $route.value.params.isocode

    const template = computed(() => {
      return store.template
    })

    const aggregators = computed(() => {
      return store.aggregators
    })

    onMounted(() => {
      id.value = $route.value.params.id
      if (id.value) {
        store.useTemplateItem({
          $id: id.value,
          onError: () => {},
          onSuccess: (e: any) => {
            body.value = e.body
            preview = e.preview
            selectedRowKeysAggr.value = e.aggregators
            instance.proxy.form.setFieldsValue({
              title: e.title,
              type: e.type,
              priceColor: e.priceColor,
              bgRecommandationColor: e.bgRecommandationColor
            })
          }
        })
      }
    })

    const useHandleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
      confirm()
      searchText = selectedKeys[0]
      searchedColumn = dataIndex
    }

    const useHandleReset = (clearFilters: any) => {
      clearFilters()
      searchText = ''
    }

    const useDeleteAggr = (id: any) => {
      selectedRowKeysAggrList.value = selectedRowKeysAggrList.value.filter(elem => elem.id !== id)
    }

    const usechangeBody = (val: any) => {
      body.value = val
    }
    const useChangePreview = (val: any) => {
      preview = val
    }
    const useChangeVisible = () => {
      visible.value = false
    }
    const useChangeImageNameArray = (val: any) => {
      imageNameArray = val
    }
    const useSearchAggr = (val: any) => {
      if (val.data) {
        if (val.data !== '') {
          AggrResArray.value = aggregators.value.filter(word => word.aggregatorId.includes(val.target.value))
        }
      } else if (val === '') {
        AggrResArray.value = []
        searchAggr.value = ''
      }
    }

    const useOnSelectChange = (selectedRowKey: any) => {
      selectedRowKeysAggr.value = []
      selectedRowKey.forEach((elem) => {
        selectedRowKeysAggr.value.push(aggregators.value.find(element => element.id === elem))
      })
      selectedRowKeysAggrList.value = selectedRowKeysAggr.value.concat(selectedRowKeysAggrSearch.value)
    }
    const useSelectAggrList = (id: any) => {
      selectedRowKeysAggrSearch.value.push(aggregators.value.find(element => element.id === id))
      selectedRowKeysAggrList.value = selectedRowKeysAggr.value.concat(selectedRowKeysAggrSearch.value)
    }
    const useOnChangeAggregator = () => {
      aggreCheck.value = !aggreCheck.value
      if (!aggreCheck.value) {
        return useGetAggregatorsData(local)
      } else {
        visible3.value = false
        return [{}]
      }
    }

    const useHandleChange = () => {
      disableSubmit.value = false
    }
    const useClearAggrSearch = () => {
      searchAggr.value = ''
    }
    const useHandleChangeSearch = () => {
      disableSubmit.value = false
    }
    const useHandleSubmit = () => {
      instance.proxy.form.validateFields((err: any) => {
        if (!err) {
          if ($route.value.params.id) {
            store.useTemplateEdit({
              $id: $route.value.params.id,
              creationTime: template.value.creationTime,
              countryIsoCode: template.value.countryIsoCode,
              isPredefined: template.value.isPredefined,
              nbMaxServices: template.value.nbMaxServices,
              selectedRowKeysAggr,
              body,
              preview,
              $values: instance.proxy.form.getFieldsValue(),
              onError: (e: any) => {
                useOpenNotification('error', e)
              },
              onSuccess: () => {
                useOpenNotification('success', null)
                $router.push($router.app.localePath('/' + isocode + '/template'))
              }
            })
          } else {
            store.useTemplateAdd({
              selectedRowKeysAggr,
              body,
              preview,
              $values: instance.proxy.form.getFieldsValue(),
              onError: (e: any) => {
                useOpenNotification('error', e)
              },
              onSuccess: () => {
                useOpenNotification('success', null)
                $router.push($router.app.localePath('/' + isocode + '/template'))
              }
            })
          }
        }
      })
    }

    const useOpenNotification = (element: any, option: any) => {
      let message
      let description
      if (element === 'error') {
        message = 'Error'
        description = option
      } else if (element !== 'error' && $route.value.params.id) {
        const coll: any = template.value
        message = 'TEMPLATE "' + coll.type.toUpperCase() + '" updated'
      } else {
        message = 'TEMPLATE "' + instance.proxy.form.getFieldsValue().type.toUpperCase() + '" added'
      }
      instance.proxy.$notification[element]({
        message,
        description,
        duration: 1
      })
    }

    return {
      searchText,
      searchedColumn,
      useHandleSearch,
      useHandleReset,
      tw,
      id,
      selectedRowKeysAggrSearch,
      selectedRowKeysAggrList,
      useClearAggrSearch,
      useSelectAggrList,
      AggrResArray,
      useSearchAggr,
      searchAggr,
      useChangeVisible,
      disableSubmit,
      useHandleChange,
      useHandleChangeSearch,
      useOnChangeAggregator,
      useHandleSubmit,
      template,
      body,
      usechangeBody,
      useChangePreview,
      visible3,
      aggreCheck,
      useGetAggregatorsData,
      aggregators,
      isocode,
      selectedRowKeysAggr,
      columns,
      useOnSelectChange,
      selectedRowKeysAggrValidate,
      useDeleteAggr,
      visible,
      imageNameArray,
      useChangeImageNameArray,
      local
    }
  },
  data () {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  }
})
</script>
<style scoped>
.aggrListSelect .ant-list-item:hover {
  cursor: pointer;
  background: #eee;
}
.aggrListSelect .ant-list-item span {
  padding-left: 5px;
}
i {
  padding: 5px;
}
.aggrElem {
  display: inline-block;
}
.ant-popover-inner {
  box-shadow: none;
}
.ant-popover-inner-content {
  padding: 12px 16px;
  color: rgba(0, 0, 0, 0.65);
}
.bodyRow {
  display: flex;
}
.captionBody {
  width: 20.83333333%;
  text-align: right;
}
.bodyContent {
  width: 50%;
}

.ant-popover {
  position: absolute;
  top: 10vh !important;
  left: 20% !important;
  overflow-x: auto;
  background: #fff;
}

/* tile uploaded pictures */
.upload-list-inline >>> .ant-upload-list-item {
  float: left;
  width: 200px;
  margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
}
button {
  margin-right: 8px;
}
.popupBlock {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #eee;
  padding: 50px;
  margin-bottom: 50px;
}
</style>
