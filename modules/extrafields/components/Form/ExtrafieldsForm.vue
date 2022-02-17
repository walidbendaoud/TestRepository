<template>
  <div
    :class="{ 'dragArea list-group ant-upload ant-upload-drag': option.config }"
  >
    <draggable
      :disabled="!option.dragging"
      v-model="form"
      :component-data="getComponentData()"
      ghost-class="ghost"
      class="draggable-area"
      v-bind="{ handle: '.form-item' }"
      group="fields"
      @change="change"
      :clone="onMove"
    >
      <div v-for="(r, i) in form" :key="'rule' + i">
        <div v-if="r.tab == activeTab">
          <DecorateForm :rule="r" :config="option.config" :key="'r'+r.id" />
        </div>
      </div>

      <div class="empty-fields" v-if="option.config">
        <a-empty
          v-if="form.findIndex((e) => e.tab === activeTab) == -1"
          :imageStyle="{ height: '60px' }"
          class="no-data"
        />
        <a-button type="primary" class="btn" @click="openDrawer">Add Field</a-button>
      </div>
    </draggable>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import DecorateForm from "./DecorateForm.vue";
import draggable from "vuedraggable";

export default defineComponent({
  components: {
    DecorateForm,
    draggable,
  },
  data() {
    return {
      dragging: false,
      collapse: false,
      activeTab: 0,
      simpleImage: null,
    };
  },
  props: {
    option: {
      type: Object,
      default: () => {},
    },
    tab: {
      type: Number,
      default: () => 0,
    },
  },
  computed: {
    form: {
      get(): any {
        return this.$store.state.extrafields.form;
      },
      set(value: any) {
        this.$store.commit("extrafields/updateForm", value);
      },
    },
  },
  methods: {
    handleChange(e: any) {
      //
    },
    inputChanged(value: any) {
      //
    },
    getComponentData() {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged,
        },
      };
    },
    onEnd(e: any) {
      //console.log("end", e);
    },
    onStart(e: any) {
      // console.log("start", e);
    },
    onMove(e:any){},
    change(e: any) {
      if (e.added) {
        this.$store.commit("extrafields/updateField", {
          tab: this.activeTab,
          id: e.added.element.id,
        });
      }
    },
    setCurrentTab(activeKey: any) {
      this.activeTab = activeKey;
    },
    openDrawer() {
      this.$root.$emit("drawer", true);
    },
  },
  mounted() {
    this.activeTab = this.tab;
  },
});
</script>

<style lang="scss" scoped>
.dragArea {
  height: auto;
  margin: 15px 0;
  text-align: left;
  .draggable-area {
    min-height: 80px;
    padding:15px;
  }
}
.empty-fields {
  text-align: center;
  button {
    margin-top: 10px;
  }
}

.no-data {
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  &+.btn{
    margin-top: 90px;
  }
}
</style>

