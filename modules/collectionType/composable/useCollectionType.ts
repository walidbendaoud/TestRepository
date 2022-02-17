import { ref } from '@nuxtjs/composition-api';
import { useCollectionTypeStore } from '../stores/useStore'

export const useCollectionTypesList = () => {
  const store = useCollectionTypeStore()
  const loading: any = ref<Boolean>(false);

  const useGetData = async () => {
    loading.value = true
    store.useCollectionTypeList(
      {
        onError: (e: any) => {
          console.log('e', e)
          loading.value = false
        },
        onSuccess: (e: any) => {
          loading.value = false
        }
      }
    )
  }
  return { useGetData, loading }
}
