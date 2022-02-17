<template>
  <div class="config-field">
    <a-row>
      <a-col :span="12" class="form-item">
        <a-form-item
          label="Id:"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          :validate-status="error ? 'error' : ''"
          :help="error ? 'Id already exist' : ''"
        >
          <a-input type="text" placeholder="Unique Id" v-model="id" />
        </a-form-item>
      </a-col>
      <a-col :span="12" class="form-item">
        <a-form-item
          label="Label:"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input type="text" placeholder="Label" v-model="label" />
        </a-form-item>
      </a-col>
      <a-col :span="12" class="form-item">
        <a-form-item
          label="Placeholder:"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            type="text"
            v-model="placeholder"
            placeholder="Placeholder"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12" class="form-item">
        <a-form-item
          label="Name:"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input type="text" v-model="name" placeholder="Filed name" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12" class="form-item">
        <a-form-item
          label="Message:"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input
            type="text"
            placeholder="Validation message"
            v-model="message"
          />
        </a-form-item>
      </a-col>
      <a-col :span="5">
        <a-checkbox v-model="required"> Required? </a-checkbox>
      </a-col>
      <a-col :span="5" class="form-item">
        <a-checkbox v-model="disabled"> Disabled? </a-checkbox>
      </a-col>
      <a-col :span="2">
        <a-button class="ant-btn-primary" @click="saveConfig">Ok</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {},
  data() {
    return {
      configField: false,
      collapse: false,
      name: null,
      label: null,
      placeholder: null,
      message: null,
      required: false,
      disabled: false,
      className: null,
      input: null,
      id: null,
      error: false,
    };
  },
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    rule: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    rules(): any {
      return this.$store.state.extrafields.form;
    },
  },
  methods: {
    openConfig() {
      this.configField = !this.configField;
    },
    saveConfig() {
      let o = Object.assign({}, this.rule);
      o.title = this.label;
      o.placeholder = this.placeholder;
      if (this.message || this.required) {
        o.validate = [
          {
            required: this.required,
            message: this.message || "Field required",
            trigger: "blur",
          },
        ];
      }
      o.disabled = this.disabled;
      o.name = this.name;
      o.className = this.className;

      this.configField = false;
      let idx = this.rules.findIndex(
        (e: any) => e.id == this.id && e.id != this.rule.id
      );

      if (idx == -1) {
        o.newId = this.id;
        this.$store.dispatch("extrafields/updateField", o);
        this.$emit("closePannel", true);
      } else {
        this.error = true;
      }
    },
    deleteField() {
      this.$store.dispatch("extrafields/deleteField", this.rule.id);
    },
  },
  mounted() {
    this.label = this.rule.title;
    this.placeholder = this.rule.placeholder;
    this.disabled = this.rule.disabled;
    this.className = this.rule.className;
    this.required =
      this.rule.validate && this.rule.validate[0]
        ? this.rule.validate[0].required
        : false;
    this.message = this.rule.validate ? this.rule.validate[0].message : "";
    this.id = this.rule.id;
  },
});
</script>
<style lang="scss" scoped>
.ant-form-item{
  margin-bottom: 0;
}
.label {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.config-field {
  background: rgba(0, 0, 0, 0.1);
  padding: 10px;
  .form-item {
    margin-right: 0;
    padding-right: 7px;
  }
}
.form-item {
  margin-right: 7px;
}

.delete {
  margin-left: 7px;
}
</style>
