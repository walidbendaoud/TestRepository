import state from '@/modules/schemas/store/state'
import mutations from '@/modules/schemas/store/mutations'
import actions from '@/modules/schemas/store/actions'

const storeName = 'schemas'

export default async ({ store, app, context }:any) => {
  store.registerModule(storeName, {
    state: state,
    actions: actions(storeName),
    mutations: mutations(storeName)
  })
};