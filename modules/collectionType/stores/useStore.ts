import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useCollectionTypeStore = defineStore('useCollectionTypeStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      collection:{},
      collections:[]
    }
  },
  actions:{
    async useCollectionTypeList({
      onError = () => { },
      onSuccess = () => { }
    }: any) {
      try {
        const response: any = await fetch(this.$nuxt.$config.API + '/collection-type',
          { headers: { 'Content-type': 'application/json' } }
        )
        let res = await response.json();
        if (res) {
          this.collections = res
          return onSuccess(res);
        }else{
          return onError('Server error');
        }
      } catch (e) {
        return onError(e)
      }
    },

    async useCollectionTypeItem({
      $id,
      onError = () => { },
      onSuccess = () => { }
    }: any) {
      try {
        const response: any = await fetch(this.$nuxt.$config.API + '/collection-type/'+$id,
          { headers: { 'Content-type': 'application/json' } }
        )
        let res = await response.json();
        if (res) {
          this.collection = res
          return onSuccess(res);
        }else{
          return onError('Server error');
        }
      } catch (e) {
        return onError(e)
      }
    },
    async useCollectionTypeDelete({
      $id,
      onError = () => { },
      onSuccess = () => { }
    }: any) {
      try {
        const response: any = await fetch(this.$nuxt.$config.API  + '/collection-type/' + $id, {
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
          return onError('Server error');
        }
      } catch (e) {
        return onError(e)
      }
    },
    
    async useCollectionTypeAdd({
      $values,
      onError = () => { },
      onSuccess = () => { }
    }: any) {
      try {
        const response: any = await fetch(this.$nuxt.$config.API + '/collection-type', {
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
    async useCollectionTypeEdit({
      $id,
      $values,
      onError = () => { },
      onSuccess = () => { }
    }: any) {
      try {
        const response: any = await fetch(this.$nuxt.$config.API + '/collection-type/'+$id, {
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
  },
})