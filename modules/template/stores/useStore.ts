import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import 'dayjs/locale/fr'
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useTemplateStore = defineStore('useTemplateStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      template: {},
      templates: [],
      aggregators: [],
      pagination: { total: 0 },
      current: '0',
      pageSize: '10',
      key: '',
      sort: 'desc',
      sortField: 'creationTime',
      isPredefined: '',
      token: Cookies.get('token') !== 'undefined' ? Cookies.get('token') : ''
    }
  },
  actions: {
    async useTemplateSelect ({ params, onError = () => {}, onSuccess = () => {} }: any) {
      try {
        const link = this.$nuxt.$config.API.replace('/countryIsoCode/', '/predefined/countryIsoCode/')

        const response: any = await fetch(link + params.isocode, {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + this.token
          }
        })
        const res = await response.json()
        if (res) {
          this.templates = res
          return onSuccess()
        } else {
          return onError('Server error')
        }
      } catch (e) {
        return onError(e)
      }
    },
    async useAggregatorList ({ local, onError = () => {}, onSuccess = () => {} }: any) {
      try {
        const link = this.$nuxt.$config.API.replace(
          'otcdslandingpage/api/templates/countryIsoCode/',
          'otcdsservices/api/aggregators/?' +
            'page=' +
            this.current +
            '&size=' +
            '&sort=creationTime,desc&lang=' +
            local
        )

        const response: any = await fetch(link, {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + this.token
          }
        })
        const res = await response.json()
        if (res) {
          this.aggregators = res.content
          const pagination = { ...this.pagination }
          pagination.total = res.totalElements
          this.pagination = pagination
          return onSuccess(this.pagination)
        } else {
          return onError('Server error')
        }
      } catch (e) {
        return onError(e)
      }
    },
    async useTemplateList ({ params, onError = () => {}, onSuccess = () => {} }: any) {
      if (params.current !== undefined) {
        this.current = params.current
      }
      if (params.pageSize !== undefined) {
        this.pageSize = params.pageSize
      }
      if (params.key !== undefined) {
        this.key = params.key
      }
      if (params.sortField !== undefined) {
        this.sortField = params.sortField
      }
      if (params.isPredefined !== undefined) {
        this.isPredefined = params.isPredefined
      }
      if (params.sort !== undefined) {
        // Fixing undefined sort issue
        if (params.sort === this.sort) {
          if (this.sort === 'asc') {
            this.sort = 'desc'
          } else {
            this.sort = 'asc'
          }
        } else {
          this.sort = params.sort
        }
      }

      try {
        const response: any = await fetch(
          this.$nuxt.$config.API +
            params.isocode +
            '?page=' +
            this.current +
            '&size=' +
            this.pageSize +
            '&key=' +
            this.key +
            '&sort=' +
            this.sortField +
            ',' +
            this.sort +
            '&aggregatorId=&isPredefined=' +
            this.isPredefined,
          {
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
              Authorization: 'Bearer ' + this.token
            }
          }
        )
        const res = await response.json()
        if (res) {
          this.templates = res.content

          const pagination = { ...this.pagination }
          pagination.total = res.totalElements
          this.pagination = pagination
          return onSuccess(this.pagination)
        } else {
          return onError('Server error')
        }
      } catch (e) {
        return onError(e)
      }
    },

    async useTemplateItem ({ $id, onError = () => {}, onSuccess = () => {} }: any) {
      try {
        const link = this.$nuxt.$config.API.replace('countryIsoCode/', '')
        const response: any = await fetch(link + $id, {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + this.token
          }
        })
        const res = await response.json()
        if (res) {
          this.template = res
          return onSuccess(res)
        } else {
          return onError('Server error')
        }
      } catch (e) {
        return onError(e)
      }
    },
    async useTemplateDelete ({ $id, onError = () => {}, onSuccess = () => {} }: any) {
      try {
        const link = this.$nuxt.$config.API.replace('/countryIsoCode', '')

        const response: any = await fetch(link + $id, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + this.token
          }
        })

        const res = await response
        if (res.status === 204) {
          return onSuccess(res)
        } else {
          return onError('Server error')
        }
      } catch (e) {
        return onError(e)
      }
    },
    async useTemplateAddPreview ({ file, onError = () => {}, onSuccess = () => {} }: any) {
      try {
        const link = this.$nuxt.$config.API.replace(
          '/otcdslandingpage/api/templates/countryIsoCode/',
          '/otcdsassets/api/upload?currentCountry=all&mediaNamePrefix=template&componentType=template'
        )
        const response: any = await fetch(link, {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            Authorization: 'Bearer ' + this.token
          },
          body: file
        })

        const res = await response

        if (res.status === 200) {
          res.text().then((e: any) => {
            return onSuccess(e)
          })
        } else {
          res.text().then((error: any) => {
            return onError(error)
          })
        }
      } catch (e) {
        return onError(e)
      }
    },

    async useTemplateAdd ({
      selectedRowKeysAggr,
      body,
      preview,
      $values,
      onError = () => {},
      onSuccess = () => {}
    }: any) {
      try {
        const link = this.$nuxt.$config.API.replace('/countryIsoCode/', '')

        const dayjs = require('dayjs')
        $values.preview = {
          name: preview.name,
          type: preview.type,
          value: preview.value
        }
        $values.body = body.value
        $values.aggregators = selectedRowKeysAggr.value
        $values.countryIsoCode = 'ALL'
        $values.createdBy = 'superadmin' // until it will be automated
        $values.creationTime = dayjs(new Date())
        $values.isPredefined = true
        $values.modifiedTime = dayjs(new Date())
        $values.nbMaxServices = 0

        const response: any = await fetch(link, {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + this.token
          },
          body: JSON.stringify($values)
        })

        const res = await response
        if (res.status === 201) {
          return onSuccess(res)
        } else {
          res.text().then((error: any) => {
            return onError(error)
          })
        }
      } catch (e) {
        return onError(e)
      }
    },
    async useTemplateEdit ({ $id, $values, onError = () => {}, onSuccess = () => {} }: any) {
      try {
        const response: any = await fetch(this.$nuxt.$config.API + '/templates/' + $id, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + this.token
          },
          body: JSON.stringify($values)
        })

        const res = await response
        if (res.status === 204 || res.status === 200) {
          return onSuccess(res)
        } else {
          res.text().then((error: any) => {
            return onError(error)
          })
        }
      } catch (e) {
        return onError(e)
      }
    }
  }
})
