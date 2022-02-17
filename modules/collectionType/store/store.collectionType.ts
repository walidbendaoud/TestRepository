import state from '@/modules/collectionType/store/state'
import mutations from '@/modules/collectionType/store/mutations'
import actions from '@/modules/collectionType/store/actions'

const storeName = 'collectionType'

export default async ({ store, app, context,nuxt }:any) => {
  store.registerModule(storeName, {
    state: state,
    actions: actions(storeName),
    mutations: mutations(storeName)
  })
};