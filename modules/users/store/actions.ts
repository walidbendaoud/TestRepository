export default ( moduleName:any ) => {
  return  {  
    async nuxtServerInit(
      { commit, state, dispatch }:any,
      { app, params, error, res, redirect, req, query, route }:any
    ) {
      console.log(`${moduleName} : on init server action`)
    },
    [`${moduleName}/all`] : async  ({ commit, store, app }: any, {
      $config,
      onError = () => { },
      onSuccess = () => { }
    }: any) => {

      console.log(`${moduleName}: test action all ==> ok`)
      try{      
        const response:any = await fetch($config.API2+'/users',
          {headers: { 'Content-type': 'application/json' }}
        )
        let res= await response.json();
        if(res){
          commit(`${moduleName}/all`,res)
          return onSuccess(res);
        }
      }catch(e){
        return onError(e)
      }      
    },
    [`${moduleName}/add`] : async  ({ commit, store, app }: any, {
      $config,
      params,
      onError = () => { },
      onSuccess = () => { }
    }: any) => {

      console.log(`${moduleName}: test action add ==> ok `)
      try{      
        const response:any = await fetch($config.API2+'/users', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params)
        });
        let res= response.json();
        if(res){
          return onSuccess(res);
        }
      }catch(e){
        return onError(e)
      }
      
    }
  }    
}