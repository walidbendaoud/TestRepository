export default ( moduleName:any ) => {
  return  {  
    async nuxtServerInit(
      { commit, state, dispatch }:any,
      { app, params, error, res, redirect, req, query, route }:any
    ) {
      console.log(`${moduleName} : on init server action`)
    },
    [`${moduleName}/addProduct`] : (store:any,data:any) => {
      console.log(`${moduleName}: test action ==> ok`)
      store.commit(`${moduleName}/addProduct`,data)
    }
  }
}