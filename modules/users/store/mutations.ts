export default ( moduleName:any ) => {

  return {
    [`${moduleName}/all`] : (state:any, settings:any) => {
      console.log(`${moduleName}: test mutation ==> ok`)
      state.all = settings
    }
  }
}