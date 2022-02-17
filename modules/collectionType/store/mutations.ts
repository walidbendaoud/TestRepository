export default ( moduleName:any ) => {

  return {
    [`${moduleName}/all`] : (state:any, settings:any) => {
      state.all = settings
    },
    [`${moduleName}/get`] : (state:any, settings:any) => {
      state.collection = settings
    }
  }
}