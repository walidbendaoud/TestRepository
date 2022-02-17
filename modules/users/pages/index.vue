<template>
  <div id="components-button-demo-button-group">
    <h1>Users list</h1>
    <a-button @click="$router.push({path:'/users/add'})" class="">Add user</a-button>
    <br/><br/>
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="users"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="firstName" > </template>
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
import { defineComponent } from '@vue/composition-api'

const columns = [
  {
    title: 'csid',
    dataIndex: 'csid',
    width: '25%',
    scopedSlots: { customRender: 'csid' },
  },
  {
    title: 'msisdn',
    dataIndex: 'msisdn',
    width: '15%',
    scopedSlots: { customRender: 'msisdn' },
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    width: '40%',
    scopedSlots: { customRender: 'firstName' },
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    scopedSlots: { customRender: 'lastName' },
  },
];

export default defineComponent({
  setup() {
    //
  },
  head() {
		return {
			title: 'Users',
		};
	},
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
    };
  },
  computed: {
    
    users ():any{        
      return this.$store.state.users.all
    }
  },
  mounted(){
    this.$store.dispatch('users/all', {
      $config: this.$config,
      onError: (e:any) => {
        //console.log(e)
      },
      onSuccess: (d:any) => {
        //console.log(d)
      },
    });
  },
  methods:{
    handleTableChange: ()  => {
      //
    }
  },
  created() {
   //
  },
})
</script>


