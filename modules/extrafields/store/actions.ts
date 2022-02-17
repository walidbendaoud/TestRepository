export default ( moduleName:any ) => {
  return  {  
    async nuxtServerInit(
      { commit, state, dispatch }:any,
      { app, params, error, res, redirect, req, query, route }:any
    ) {
      console.log(`${moduleName} : on init server action`)
    },
    [`${moduleName}/getForm`] : (store:any,data:any) => {
      store.commit(`${moduleName}/getForm`,data)
    },
    [`${moduleName}/addField`] : (store:any,data:any) => {
      store.commit(`${moduleName}/addField`,data)
    },
    [`${moduleName}/updateForm`] : (store:any,data:any) => {
      store.commit(`${moduleName}/updateForm`,data)
    },
    [`${moduleName}/updateField`] : (store:any,data:any) => {
      store.commit(`${moduleName}/updateField`,data)
    },
    [`${moduleName}/deleteField`] : (store:any,data:any) => {
      store.commit(`${moduleName}/deleteField`,data)
    },
    [`${moduleName}/saveFields`] : (store:any,data:any) => {
      store.commit(`${moduleName}/saveFields`)
    },
    [`${moduleName}/getData`] : async  ({ commit, store, app }: any, {
      $settings,
      onError = () => { },
      onSuccess = () => { }
    }: any) => {
      try{     
        const response:any = await fetch($settings.source,
          {headers: { 'Content-type': 'application/json' }}
        )
        let res= await response.json();
        if(res){
          $settings.asyncOptions = res
          return onSuccess($settings);
        }
      }catch(e){        
        return onError(e)
      }      
    },
  }
}