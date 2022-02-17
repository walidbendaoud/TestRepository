import { ref } from '@nuxtjs/composition-api';
import { useUserStore } from '../stores/useStore'
import User from '../types/User';

export const useLitsUsers = () => {
  const store = useUserStore()
  const data = ref<User[]>([])
  const loading: any = ref<Boolean>(false);

  const useGetData = async () => {
    loading.value = true
    store.useUsersList(
      {
        onError: (e: any) => {
          console.log('e', e)
          loading.value = false
        },
        onSuccess: (e: any) => {
          data.value = e
          loading.value = false
        }
      }
    )
  }
  return { useGetData, data, loading }
}

export const useAdd = () => {
  const store = useUserStore()
  let $nuxt: any = store.$nuxt
  store.useUsersAdd(
    {
      onError: (e: any) => {
        $nuxt.redirect($nuxt.localePath('test-users'))
      },
      onSuccess: (e: any) => {
        console.log('tets')
      }
    }
  )
}
