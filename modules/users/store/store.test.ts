import state from '@/modules/users/store/state'
import mutations from '@/modules/users/store/mutations'
import actions from '@/modules/users/store/actions'

const storeName = 'users'

export default async ({ store, app, context,nuxt }:any) => {
  store.registerModule(storeName, {
    state: state,
    actions: actions(storeName),
    mutations: mutations(storeName)
  })
};