import path from 'path'

import { Module } from '@nuxt/types'

const moduleName = path.basename(path.resolve(__dirname))
const utils = require(process.cwd() + '/nuxt.modules')
const config = require(path.resolve(__dirname, 'config.json'))

interface Options {
  a: boolean;
  b: number;
  c: string;
}

const setupModule: Module<Options> = function () {
  // create module alias
  this.options.alias['@' + moduleName.toLocaleUpperCase()] = path.resolve(__dirname)
  // init module setup
  const util = new utils.NuxtUtil()
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
