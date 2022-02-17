import path from 'path';

const moduleName = path.basename(path.resolve(__dirname))
const utils = require(process.cwd() + '/nuxt.modules')
let config = require(path.resolve(__dirname, 'config.json'))

import { Module } from '@nuxt/types'

interface Options {
  a: boolean
  b: number
  c: string
}

const setupModule: Module<Options> = function (moduleOptions) {

  // create module alias
  this.options.alias['@' + moduleName.toLocaleUpperCase()] = path.resolve(__dirname)
  // init module setup
  let util = new utils.NuxtUtil()
  util.dirname = __dirname
  util.context = this
  util.moduleName = moduleName
  util.config = config
  // if i18n module installed generate route foreach language
  util.i18n = { 
    langs: this.options.i18n.locales, 
    except: [this.options.i18n.defaultLocale] 
  }

  // register module layouts
  util.registerLayouts()

  // register module routes
  util.registerRoutes()

  // register module plugins
  util.registerPlugins()

  // register server middleware (if ssr=true)
  util.registerMiddlewares()
}

export default setupModule