import { defineStore } from 'pinia'

import 'dayjs/locale/fr'
const Cookies = require('js-cookie')
const axios = require('axios')

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useTemplateStore = defineStore('useTemplateStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      templateParams: [],
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
    async useTemplateSelect ({ local, onError = () => {}, onSuccess = () => {} }: any) {
      try {
        const link = this.$nuxt.$config.API + this.$nuxt.$config.WS_TEMPLATES_SELECT_LIST

        const response: any = await fetch(link + local, {
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
        const link =
          this.$nuxt.$config.API +
          this.$nuxt.$config.WS_AGGREGATOR_LIST +
          '?page=' +
          this.current +
          '&size=' +
          '&sort=creationTime,desc&lang=' +
          local
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
            this.$nuxt.$config.WS_TEMPLATES_LIST +
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
        const link = this.$nuxt.$config.API + this.$nuxt.$config.WS_TEMPLATES_ITEM
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
        const link = this.$nuxt.$config.API + this.$nuxt.$config.WS_TEMPLATES_ITEM

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
          this.templates = this.templates.filter(item => item.id !== $id)
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
        const link =
          this.$nuxt.$config.API +
          this.$nuxt.$config.WS_TEMPLATES_ADD_PREVIEW +
          '?currentCountry=all&mediaNamePrefix=template&componentType=template'

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
      selectedRowKeysAggrList,
      body,
      preview,
      $values,
      onError = () => {},
      onSuccess = () => {}
    }: any) {
      try {
        const link = this.$nuxt.$config.API + this.$nuxt.$config.WS_TEMPLATES_ITEM

        const dayjs = require('dayjs')
        $values.preview = {
          name: preview.name,
          type: preview.type,
          value: preview.value
        }
        $values.body = body.value
        $values.aggregators = selectedRowKeysAggrList.value
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
    async getTemplateParams ({ onError = () => {}, onSuccess = () => {} }: any) {
      try {
        const response = await axios.get('/params.json')
        this.templateParams = response
        if (response.status === 204 || response.status === 200) {
          return onSuccess(response)
        } else {
          response.text().then((error: any) => {
            return onError(error)
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
    async useTemplateEdit ({
      $id,
      creationTime,
      countryIsoCode,
      isPredefined,
      nbMaxServices,
      selectedRowKeysAggrList,
      body,
      preview,
      $values,
      onError = () => {},
      onSuccess = () => {}
    }: any) {
      try {
        const link = this.$nuxt.$config.API + this.$nuxt.$config.WS_TEMPLATES_ITEM
        const dayjs = require('dayjs')

        $values.preview = {
          type: preview.type,
          value: preview.value
        }
        $values.media = null
        $values.id = $id
        $values.body = body.value
        $values.aggregators = selectedRowKeysAggrList.value
        $values.countryIsoCode = countryIsoCode
        $values.createdBy = 'superadmin' // until it will be automated
        $values.modifiedBy = 'superadmin' // until it will be automated
        $values.creationTime = creationTime
        $values.isPredefined = isPredefined
        $values.modifiedTime = dayjs(new Date())
        $values.nbMaxServices = nbMaxServices

        const response: any = await fetch(link, {
          method: 'PUT',
          headers: {
            Accept: 'application/json, text/plain, */*',
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
