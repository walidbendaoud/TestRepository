import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useExtrafieldsStore = defineStore('useExtrafieldsStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      form: [
        {
          id: 'extrafield_0',
          type: "input",
          title: "商品名称",
          field: "goods_name",
          value: "iphone 7",
          props: {
            "type": "text",
          },
          className: 'test',
          tab: 1,
          wrap: {
            labelCol: { span: 12 },
            wrapperCol: { span: 12 }
          },
          validate: [
            { required: true, message: '请输入goods_name', trigger: 'blur' },
          ],
        },
        {
          id: 'extrafield_1',
          type: "input",
          title: "qsdsqdqsdq",
          field: "goods_name",
          value: "iphone 10",
          props: {
            "type": "text",
          },
          className: 'test',
          tab: 1,
          wrap: {
            labelCol: { span: 12 },
            wrapperCol: { span: 12 }
          },
          validate: [
            { required: true, message: '请输入goods_name', trigger: 'blur' },
          ],
        },
        {
          id: 'extrafield_2',
          type: "button",
          value: "Add",
          className: 'ant-btn-primary',
          tab: 0,
          props: {
            "type": "button",
          },
          click: () => {
            //  this.test()
          }
        }
      ]
    }
  },
  actions: {
    useUpdateForm(settings: any) {
      settings.forEach((element: any) => {
        if (element.id == undefined) {
          let id = Math.max.apply(Math, settings.filter((e: any) => e.id && /extrafield_/.test(e.id)).map(function (ob: any) {
            let id2 = Math.floor(Math.random() * 1000)
            if (ob.id) {
              id2 = parseInt(ob.id.replace(/extrafield_/, ''))
            }
            return id2
          }
          ))
          element.id = `extrafield_${(id + 1)}`;
        }
      });
      this.form = settings
    },
    useUpdateField(settings: any) {
      let idx = this.form.findIndex((e: any) => e.id == settings.id)
      let form :any = this.form
      if (idx != undefined) {
        form[idx] = { ...form[idx], ...settings }

        if (settings.newId) {
          form[idx].id = settings.newId
          delete form[idx].newId
        }
      }
      form.push({})
      this.form = this.form.filter((value: any) => Object.keys(value).length !== 0);
    },
    useDeleteField(settings: any) {
      let idx = this.form.findIndex((e: any) => e.id == settings)
      this.form.splice(idx, 1)
    },
    useSaveFields(settings: any) {
      console.log('to develop')
    }
  }
})