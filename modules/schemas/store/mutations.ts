export default ( moduleName:any ) => {

  return {
    [`${moduleName}/addProduct`] : (state:any, settings:any) => {
      console.log(`${moduleName}: test mutation ==> ok`)
      state.catalog.push(settings)
    }
  }
}