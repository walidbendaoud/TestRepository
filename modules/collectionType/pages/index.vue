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
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text, record">
        <nuxt-link :to="localePath('/collectionType/edit/' + record.id)"
          ><a-icon type="edit" style="padding: 5px"
        /></nuxt-link>
        <a href="" @click.prevent>
          <a-popconfirm
            title="Are you sure delete this collection type?"
            class="remove"
            ok-text="Yes"
            cancel-text="No"
            @confirm="removeItem(record)"
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
import { defineComponent } from "@vue/composition-api";

const columns = [
  {
    title: "Type",
    dataIndex: "type",
    scopedSlots: { customRender: "type" },
  },
  {
    title: "Collection",
    dataIndex: "collection",
    scopedSlots: { customRender: "collection" },
  },
  {
    title: "Databasee",
    dataIndex: "database",
    scopedSlots: { customRender: "database" },
  },
  {
    title: "Omniflowapp",
    dataIndex: "omniflowapp",
    scopedSlots: { customRender: "omniflowapp" },
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    align: "right",
    scopedSlots: { customRender: "action" },
  },
];

export default defineComponent({
  setup() {
    //
  },
  head() {
    return {
      title: "Collection Types",
    };
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: true,
      columns,
    };
  },
  computed: {
    collections(): any {
      return this.$store.state.collectionType.all;
    },
  },
  mounted() {
    this.getCollections();
  },
  methods: {
    handleTableChange: () => {
      //
    },
    getCollections() {
      this.loading = true;
      this.$store.dispatch("collectionType/all", {
        $config: this.$config,
        onError: (e: any) => {
          this.loading = false;
        },
        onSuccess: (d: any) => {
          this.loading = false;
        },
      });
    },
    openNotification(name: any) {
      let message = 'Collection Type "' + name.toUpperCase() + '" removed';
      this.$notification["success"]({
        message: message,
        description: "",
        duration: 1,
      });
    },
    removeItem(record: any) {
      this.$store.dispatch("collectionType/delete", {
        $config: this.$config,
        $id: record.id,
        onError: (e: any) => {
          //
        },
        onSuccess: (d: any) => {
          this.openNotification(record.type);
          this.getCollections();
        },
      });
    },
  },
  created() {
    //
  },
});
</script>

