import { ref } from '@vue/composition-api'
import { useTemplateStore } from '../stores/useStore'

export const useTemplatesList = () => {
  const store = useTemplateStore()
  const loading: any = ref<Boolean>(false)
  const pagination: any = ref<object>({})

  const useGetAggregatorsData = async (local: any) => {
    loading.value = true
    await store.useAggregatorList({
      local,
      onError: () => {
        loading.value = false
      },
      onSuccess: (paginations: {}) => {
        pagination.value = paginations
        loading.value = false
      }
    })
  }

  const useGetData = async (params: any) => {
    loading.value = true
    await store.useTemplateList({
      params,
      onError: () => {
        loading.value = false
      },
      onSuccess: (paginations: {}) => {
        pagination.value = paginations
        loading.value = false
      }
    })
  }
  const useGetDataSelect = async (local: any) => {
    loading.value = true
    await store.useTemplateSelect({
      local,
      onError: () => {
        loading.value = false
      },
      onSuccess: () => {
        loading.value = false
      }
    })
  }
  return { useGetDataSelect, useGetData, useGetAggregatorsData, loading, pagination }
}
