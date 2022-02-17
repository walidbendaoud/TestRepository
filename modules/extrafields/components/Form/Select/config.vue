<template>
  <div class="config-field">
    <a-row>
      <a-col :span="12" class="form-item">
        <a-form-item
          label="Id:"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          :validate-status="data.error ? 'error' : ''"
          :help="data.error ? 'Id already exist' : ''"
        >
          <a-input type="text" placeholder="Unique Id" v-model="data.id" />
        </a-form-item>
      </a-col>
      <a-col :span="12" class="form-item">
        <a-form-item
          label="Label:"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
        >
          <a-input type="text" placeholder="Label" v-model="data.label" />
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
            v-model="data.placeholder"
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
          <a-input type="text" v-model="data.name" placeholder="Filed name" />
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
            v-model="data.message"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-checkbox v-model="data.required"> Required? </a-checkbox>
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
          v-model="data.ws"
          placeholder="Url source"
        />
      </a-form-item>
      </a-col>
       <a-col :span="6" class="form-item">
        <a-checkbox v-model="data.disabled"> Disabled? </a-checkbox>
      </a-col>
      <a-col :span="6" class="form-item">
        <a-checkbox v-model="data.multiple"> Multiple? </a-checkbox>
      </a-col>
    </a-row>
    <a-row type="flex" align="bottom">
      <a-col :span="20">
        <a-row v-for="(opt, idx) in data.selectOptions" :key="'option' + idx">
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
                    useChangeInput(e, idx);
                  }
                "
              />
              Selected</label
            >
          </a-col>
          <a-col :span="4">
            <a-button
              class="ant-btn-primary"
              @click="(e) => useRemoveOption(e, idx)"
              v-if="data.selectOptions.length > 1"
              >-</a-button
            >
            <a-button
              class="ant-btn-primary"
              @click="useAddOption"
              v-if="idx == data.selectOptions.length - 1"
              >+</a-button
            >
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="1"></a-col>
      <a-col :span="3">
        <a-button class="ant-btn-primary" @click="useSaveConfig">Ok</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "@nuxtjs/composition-api";
import { useExtrafieldsStore } from '@EXTRAFIELDS/stores/useStore';

export default defineComponent({
  setup(props,{emit}) {
    const store = useExtrafieldsStore()
    const data:any = ref<Object>( {
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
    })

    const useAddOption = () => {
      data.value.selectOptions.push({ key: "", value: "", selected: false });
    }

    const useRemoveOption = (e: any, i: any) =>{
      data.value.selectOptions.splice(i, 1);
    }

    const useAddOptionData = (e: any, i: any, key: any) => {
      let idx: any = data.value.selectOptions[i];
      idx[key] = e.target.value;
    }

    
    const useChangeInput = (e: any, d: any) => {
      data.value.selectOptions.forEach((elt:any, i:any) => {
        elt.selected = i == d ? true : false;
      });
    }

    const useSaveConfig = () => {
      let o = Object.assign({}, props.rule);
      o.title = data.value.label;
      o.placeholder = data.value.placeholder;
      if (data.value.message || data.value.required) {
        o.validate = [
          {
            required: data.value.required,
            message: data.value.message || "Field required",
            trigger: "blur",
          },
        ];
      }
      o.disabled = data.value.disabled;
      o.name = data.value.name;
      o.className = data.value.className;
      o.multiple = data.value.multiple;
      let ob = JSON.parse(JSON.stringify(data.value.selectOptions));
      o.options = ob.filter((e: any) => e.key !== "");
      o.source = data.value.ws;
      o.newId = data.value.id;
      
      data.value.configField = false;

      let idx = store.form.findIndex(
        (e: any) => e.id == data.value.id && e.id != props.rule.id
      );
      
      if (idx == -1) {
        o.newId = data.value.id;
        store.useUpdateField(o)
        emit("closePannel", true);
      } else {
        data.value.error = true;
      }
    }

    onMounted(()=>{
      data.value.ws = props.rule.source;
      data.value.label = props.rule.title;
      data.value.placeholder = props.rule.placeholder;
      data.value.disabled = props.rule.disabled;
      data.value.className = props.rule.className;
      data.value.multiple = props.rule.multiple;
      if (props.rule.options && props.rule.options.length > 0) {
        data.value.selectOptions = JSON.parse(JSON.stringify(props.rule.options));
      }
      data.value.required =
        props.rule.validate && props.rule.validate[0]
          ? props.rule.validate[0].required
          : false;
      data.value.message = props.rule.validate ? props.rule.validate[0].message : "";
      data.value.id = props.rule.id
    })

    return {
      data,
      useAddOption,
      useRemoveOption,
      useAddOptionData,
      useChangeInput,
      useSaveConfig
    }
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
  }
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
