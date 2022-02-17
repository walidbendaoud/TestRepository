import state from '~/modules/extrafields/store/state'
import mutations from '~/modules/extrafields/store/mutations'
import actions from '~/modules/extrafields/store/actions'

const storeName = 'extrafields'

export default async ({ store, app, context }:any) => {
  store.registerModule(storeName, {
    state: state,
    actions: actions(storeName),
    mutations: mutations(storeName)
  })
};