<template>
  <div>
    <a-table
      :columns="columns"
      :row-key="(record) => record.id"
      :data-source="forms"
      :pagination="pagination"
      :loading="loading"
    >
      <span slot="action" slot-scope="text, record">
        <nuxt-link :to="localePath('/schemas/'+record.id)">Edit</nuxt-link>
      </span>
    </a-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
const columns = [
  {
    title: "Form type",
    dataIndex: "form",
    width: "70%",
    scopedSlots: { customRender: "form" },
  },
  {
    title: "Action",
    dataIndex: "action",
    key:"action",
    align:"right",
    scopedSlots: { customRender: 'action' },
  },
];
export default defineComponent({
  setup() {},
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
      columns,
      forms: [
        {
          form: "Product",
          id: 1
        },
      ],
    };
  },
});
</script>
