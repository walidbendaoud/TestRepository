import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useUserStore = defineStore('userUsersStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      counter: 0,
      name: {},
      isAdmin: true,
      user :{
        name:"silver",
        age:5
      },
      users:[]
    }
  },
  actions:{
    async useUsersList({
      onError = () => { },
      onSuccess = () => { }
    }: any) {
      try {
        const response: any = await fetch(this.$nuxt.$config.API + '/collection-type',
          { headers: { 'Content-type': 'application/json' } }
        )
        let res = await response.json();
        if (res) {
          this.users = res
          return onSuccess(res);
        }else{
          return onError('Server error');
        }
      } catch (e) {
        return onError(e)
      }
    },
    async useUsersAdd({
      onError = () => { },
      onSuccess = () => { }
    }: any) {
      // todo
    },
  },
})