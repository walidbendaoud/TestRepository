import state from '@/modules/product/store/state'
import mutations from '@/modules/product/store/mutations'
import actions from '@/modules/product/store/actions'

const storeName = 'product'

export default async ({ store, app, context }:any) => {
  store.registerModule(storeName, {
    state: state,
    actions: actions(storeName),
    mutations: mutations(storeName)
  })
};