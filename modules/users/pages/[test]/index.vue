<template>
  <div id="components-button-demo-button-group">
    <h1>Users list</h1>
    <a-button @click="useHandleclick" class="">Add user</a-button>
    <br /><br />
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="users"
      :pagination="pagination"
      :loading="loading"
      @change="useHandleTableChange"
    >
      <template slot="firstName"> </template>
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
import { defineComponent, ref, onMounted, reactive, getCurrentInstance, computed } from '@vue/composition-api';
import { useLitsUsers } from '@USERS/composable/useUsers';
import { useUserStore } from '@USERS/stores/useStore';
import User from '@USERS/types/User';

export default defineComponent({
  setup() {
    const cols = [
      {
        title: 'csid',
        dataIndex: 'id',
        width: '25%',
        scopedSlots: { customRender: 'id' },
      },
      {
        title: 'msisdn',
        dataIndex: 'database',
        width: '15%',
        scopedSlots: { customRender: 'database' },
      },
      {
        title: 'First Name',
        dataIndex: 'collection',
        width: '40%',
        scopedSlots: { customRender: 'collection' },
      },
      {
        title: 'Last Name',
        dataIndex: 'omniflowapp',
        scopedSlots: { customRender: 'omniflowapp' },
      },
    ];

    const store:any = useUserStore();
    const { useGetData,loading } = useLitsUsers();
    const instance:any = getCurrentInstance();
    const pagination:any = ref<Object>({});
    const columns:any = ref<Object[]>(cols);

    let $router: any = instance.proxy.$router;

    const users = computed(() => {
      return reactive<User[]>(store.users);
    });

    const useHandleTableChange = () => {
      //
    };
    const useHandleclick = () => {
      $router.push(instance.proxy.localePath('test-users-add'));
    };

    onMounted(() => {
      useGetData();
    });

    return {
      users,
      pagination,
      loading,
      columns,
      useHandleclick,
      useHandleTableChange,
    };
  },
  head() {
    return {
      title: 'Users',
    };
  },
});
</script>


