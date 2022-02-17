<template>
  <div id="components-button-demo-button-group">
    <h1>Collection Type list</h1>
    <a-button @click="$router.push(localePath('collectionType-add'))" class=""
      >Add Collection Type</a-button
    >
    <br /><br />

    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="collections"
      :pagination="pagination"
      :loading="loading"
      @change="useHandleTableChange"
    >
      <span slot="action" slot-scope="text, record">
        <nuxt-link :to="localePath('/collectionType/' + record.id)"
          ><a-icon type="edit" style="padding: 5px"
        /></nuxt-link>
        <a href="" @click.prevent>
          <a-popconfirm
            title="Are you sure delete this collection type?"
            class="remove"
            ok-text="Yes"
            cancel-text="No"
            @confirm="useRemoveItem(record)"
          >
            <a-icon type="delete" style="padding: 5px" />
          </a-popconfirm>
        </a>
      </span>
    </a-table>
  </div>
</template>
<style>
#components-button-demo-button-group > h4 {
  margin: 16px 0;
  font-size: 14px;
  line-height: 1;
  font-weight: normal;
}
#components-button-demo-button-group > h4:first-child {
  margin-top: 0;
}
#components-button-demo-button-group .ant-btn-group {
  margin-right: 8px;
}
</style>

<script lang="ts">
import { defineComponent, computed, reactive, ref, getCurrentInstance, onMounted } from "@nuxtjs/composition-api";
import { useCollectionTypesList } from '@COLLECTIONTYPE/composable/useCollectionType';
import { useCollectionTypeStore } from '@COLLECTIONTYPE/stores/useStore';
import CollectionType from '@COLLECTIONTYPE/types/CollectionType';

export default defineComponent({
  setup() {
    const cols = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: '25%',
        scopedSlots: { customRender: 'id' },
      },
      {
        title: 'Type',
        dataIndex: 'type',
        width: '15%',
        scopedSlots: { customRender: 'database' },
      },
      {
        title: 'Database',
        dataIndex: 'database',
        width: '15%',
        scopedSlots: { customRender: 'database' },
      },
      {
        title: 'Collection',
        dataIndex: 'collection',
        width: '25%',
        scopedSlots: { customRender: 'collection' },
      },
      {
        title: 'Omniflowapp',
        dataIndex: 'omniflowapp',
        scopedSlots: { customRender: 'omniflowapp' },
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        align: "right",
        scopedSlots: { customRender: "action" },
      },
    ];

    const store:any = useCollectionTypeStore();
    const { useGetData, loading } = useCollectionTypesList();
    const instance:any = getCurrentInstance();
    const pagination:any = ref<Object>({});
    const columns:any = ref<Object[]>(cols);

    const collections = computed(() => {
      return reactive<CollectionType[]>(store.collections);
    });

    const useHandleTableChange = () => {
      //
    };

    const openNotification = (name : any, type: any)=>{
      let message = 'Collection Type "' + name.toUpperCase() + '" removed';
      instance.proxy.$notification[type]({
        message: message,
        description: "",
        duration: 1,
      });
    }

    const useRemoveItem = (record: any) =>{
      store.useCollectionTypeDelete(
        {
          $id:record.id,
          onError: (e: any) => {
            openNotification(record.type, 'success')
          },
          onSuccess: (e: any) => {
            useGetData();
            openNotification(e, 'error')
          }
        }
      )
    }

    onMounted(() => {
      useGetData();
    });

    return {
      collections,
      pagination,
      loading,
      columns,
      useHandleTableChange,
      useRemoveItem
    };
  },
  head() {
    return {
      title: "Collection Types",
    };
  }
});
</script>

