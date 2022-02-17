export default (moduleName: any) => {

  return {
    [`${moduleName}/getForm`]: (state: any, settings: any) => {
      console.log('call ws to get form object of==>', settings)
    },
    [`${moduleName}/updateForm`]: (state: any, settings: any) => {
      // generate id to object field

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
      state.form = settings
    },
    [`${moduleName}/updateField`]: (state: any, settings: any) => {
      let idx = state.form.findIndex((e: any) => e.id == settings.id)
      state.form[idx] = { ...state.form[idx], ...settings }
      if (settings.newId) {
        state.form[idx].id = settings.newId
        delete state.form[idx].newId
      }
      state.form.push({})
      state.form = state.form.filter((value: any) => Object.keys(value).length !== 0);
    },
    [`${moduleName}/addField`]: (state: any, settings: any) => {
      state.form.push(settings)
    },
    [`${moduleName}/deleteField`]: (state: any, settings: any) => {
      let idx = state.form.findIndex((e: any) => e.id == settings)
      state.form.splice(idx, 1)
    },
    [`${moduleName}/saveFields`]: (state: any, settings: any) => {
      console.log('call ws to save shema', state.form)
    },
  }
}