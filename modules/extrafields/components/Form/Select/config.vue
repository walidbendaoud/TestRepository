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
    </a-row>
    <a-row>
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
      <a-col :span="8">
        <a-checkbox v-model="required"> Required? </a-checkbox>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12" class="form-item"> 
        <a-form-item
          label="Source (ws) :"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
        <a-input
          type="text"
          v-model="ws"
          placeholder="Url source"
        />
      </a-form-item>
      </a-col>
       <a-col :span="6" class="form-item">
        <a-checkbox v-model="disabled"> Disabled? </a-checkbox>
      </a-col>
      <a-col :span="6" class="form-item">
        <a-checkbox v-model="multiple"> Multiple? </a-checkbox>
      </a-col>
    </a-row>
    <a-row type="flex" align="bottom">
      <a-col :span="20">
        <a-row v-for="(opt, idx) in selectOptions" :key="'option' + idx">
          <a-col :span="8" class="form-item">
            <a-input type="text" placeholder="Key" v-model="opt.key"></a-input>
          </a-col>
          <a-col :span="8" class="form-item">
            <a-input
              type="text"
              placeholder="value"
              v-model="opt.value"
            ></a-input>
          </a-col>
          <a-col :span="4">
            <label class="label">
              <input
                type="radio"
                name="selected"
                v-model="opt.selected"
                :checked="opt.selected"
                @change="
                  (e) => {
                    changeInput(e, idx);
                  }
                "
              />
              Selected</label
            >
          </a-col>
          <a-col :span="4">
            <a-button
              class="ant-btn-primary"
              @click="(e) => removeOption(e, idx)"
              v-if="selectOptions.length > 1"
              >-</a-button
            >
            <a-button
              class="ant-btn-primary"
              @click="addOption"
              v-if="idx == selectOptions.length - 1"
              >+</a-button
            >
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="3">
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
      multiple: false,
      className: null,
      options: [],
      selectOptions: [{ key: "", value: "", selected: false }],
      ws: null,
      id:null,
      error: false
    };
  },
  props: {
    option: {
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
    addOption() {
      this.selectOptions.push({ key: "", value: "", selected: false });
    },
    removeOption(e: any, i: any) {
      this.selectOptions.splice(i, 1);
    },
    addOptionData(e: any, i: any, key: any) {
      let idx: any = this.selectOptions[i];
      idx[key] = e.target.value;
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
      o.multiple = this.multiple;
      let ob = JSON.parse(JSON.stringify(this.selectOptions));
      o.options = ob.filter((e: any) => e.key !== "");
      o.source = this.ws;
      o.newId = this.id;
      
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
    changeInput(e: any, d: any) {
      this.selectOptions.forEach((elt, i) => {
        elt.selected = i == d ? true : false;
      });
    },
  },
  mounted() {
    this.ws = this.rule.source;
    this.label = this.rule.title;
    this.placeholder = this.rule.placeholder;
    this.disabled = this.rule.disabled;
    this.className = this.rule.className;
    this.multiple = this.rule.multiple;
    if (this.rule.options && this.rule.options.length > 0) {
      this.selectOptions = JSON.parse(JSON.stringify(this.rule.options));
    }
    this.required =
      this.rule.validate && this.rule.validate[0]
        ? this.rule.validate[0].required
        : false;
    this.message = this.rule.validate ? this.rule.validate[0].message : "";
    this.id = this.rule.id
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
