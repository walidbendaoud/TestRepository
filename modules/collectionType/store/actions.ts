export default (moduleName: any) => {
  return {
    async nuxtServerInit(
      { commit, state, dispatch }: any,
      { app, params, error, res, redirect, req, query, route }: any
    ) {
      console.log(`${moduleName} : on init server action`)
    },
    [`${moduleName}/all`]: async ({ commit, store, app }: any, {
      $config,
      onError = () => { },
      onSuccess = () => { }
    }: any) => {

      console.log(`${moduleName}: test action all ==> ok`)
      try {
        const response: any = await fetch($config.API + '/collection-type',
          { headers: { 'Content-type': 'application/json' } }
        )
        let res = await response.json();
        if (res) {
          commit(`${moduleName}/all`, res)
          return onSuccess(res);
        }
      } catch (e) {
        return onError(e)
      }
    },
    [`${moduleName}/get`]: async ({ commit, store, app }: any, {
      $config,
      $id,
      onError = () => { },
      onSuccess = () => { }
    }: any) => {

      console.log(`${moduleName}: test action all ==> ok`)
      try {
        const response: any = await fetch($config.API + '/collection-type'+($id?'/'+$id:''),
          { headers: { 'Content-type': 'application/json' } }
        )
        let res = await response.json();
        if (res) {
          commit(`${moduleName}/get`, res)
          return onSuccess(res);
        }
      } catch (e) {
        return onError(e)
      }
    },
    [`${moduleName}/edit`]: async ({ commit, store, app }: any, {
      $config,
      $id,
      $values,
      onError = () => { },
      onSuccess = () => { }
    }: any) => {

      try {
        const response: any = await fetch($config.API + '/collection-type/' + $id, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify($values)
        });

        let res = await response;

        if (res.status == 204 || res.status == 200) {
          return onSuccess(res);
        } else {
          res.text().then((error: any) => {
            return onError(error);
          })

        }
      } catch (e) {
        return onError(e)
      }
    },
    [`${moduleName}/add`]: async ({ commit, store, app }: any, {
      $config,
      $values,
      onError = () => { },
      onSuccess = () => { }
    }: any) => {

      try {
        const response: any = await fetch($config.API + '/collection-type', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify($values)
        });

        let res = await response;
        if (res.status == 201) {
          return onSuccess(res);
        } else {
          res.text().then((error: any) => {
            return onError(error);
          })
        }
      } catch (e) {
        return onError(e)
      }
    },
    [`${moduleName}/delete`]: async ({ commit, store, app }: any, {
      $config,
      $id,
      onError = () => { },
      onSuccess = () => { }
    }: any) => {

      try {
        const response: any = await fetch($config.API + '/collection-type/' + $id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        let res = await response;
        if (res.status == 204) {
          return onSuccess(res);
        } else {
          return onError(res);
        }
      } catch (e) {
        return onError(e)
      }
    }
  }
}