export default  {
  form: [
    {
      id:'extrafield_0',
      type:"input",
      title:"商品名称",
      field:"goods_name",
      value:"iphone 7",
      props: {
        "type": "text",
      },
      className:'test',
      tab:1,
      wrap: {
        labelCol: {span:12},
        wrapperCol: {span:12}
      },
      validate:[
        { required: true, message: '请输入goods_name', trigger: 'blur' },
      ],
    },
    {
      id:'extrafield_1',
      type:"input",
      title:"qsdsqdqsdq",
      field:"goods_name",
      value:"iphone 10",
      props: {
        "type": "text",
      },
      className:'test',
      tab:1,
      wrap: {
        labelCol: {span:12},
        wrapperCol: {span:12}
      },
      validate:[
        { required: true, message: '请输入goods_name', trigger: 'blur' },
      ],
    },
    {
      id:'extrafield_2',
      type:"button",
      value:"Add",
      className:'ant-btn-primary',
      tab:0,
      props: {
        "type": "button",
      },
      click:()=>{
      //  this.test()
      }
    },

  ]
}
