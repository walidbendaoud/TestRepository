const fs = require('fs');
import e from 'express';
import path from 'path';

export class NuxtUtil {
  dirname: any
  context: any
  moduleName: String
  config: any
  i18n: any

  /**
   * Class constructor
   * @param {String} dirname - the name of current directory
   * @param {Object} context - this scope context (this)
   * @param {String} moduleName - the module name 
   * @param {Object} config - json config of the module
   */
  constructor(dirname: any, context: any, moduleName: any, config: any, i18n: any) {
    this.dirname = dirname;
    this.context = context;
    this.moduleName = moduleName
    this.config = config
    this.i18n = i18n
  }

  /**
   * Generate module layouts recursively
   * @param {String} dirPath - recursive dir path 
   */
  registerLayouts(dirPath: String) {
    let pth: any = dirPath || this.dirname + '/layouts'

    fs.readdir(path.resolve(this.dirname, pth), (err: any, files: any) => {
      if (files) {
        files.forEach((file: any) => {
          if (!!path.extname(file)) {
            let o = {
              src: path.resolve(pth, file),
              name: path.parse(file).name
            }
            if (path.extname(file) == '.vue') {
              this.context.addLayout(o);
            }
          } else {
            if (fs.readdirSync(path.join(pth, file)).length !== 0) {
              this.registerLayouts(path.join(pth, file))
            }
          }
        });
      }
    });
  }


  /**
   * Generate module stores recursively
   * @param {String} store - relative store path to .nuxt folder
   * @param {String} dirPath - recursive dir path 
   */
  registerStore(store: any, dirPath: String) {
    let p = store || `./store/${this.moduleName}`;
    let pth: any = dirPath || this.dirname + '/store'

    fs.readdir(path.resolve(this.dirname, pth), (err: any, files: any) => {
      if (files) {
        files.forEach((file: any) => {
          if (!!path.extname(file)) {
            let o = {
              src: path.resolve(pth, file),
              fileName: p + '/' + file
            }
            if ((path.extname(file) == '.js' || path.extname(file) == '.ts')
              && /^store\./.test(file)) {
              // we can't register stores through Nuxt modules so we have to make a plugin
              this.context.addPlugin(o)
            }
          } else {
            if (fs.readdirSync(path.join(pth, file)).length !== 0) {
              this.registerStore(path.join(p, file), path.join(pth, file))
            }
          }
        });
      }
    });
  }

  /**
   * Generate module routes recursively
   * @param {String} route - recursive route name
   * @param {String} dirPath - recursive dir path 
   */
  registerRoute(route: String, dirPath: String) {
    // test if index.vue is present in folder
    
    let p: any = route ? route.replace('_', ':') : '/' + this.moduleName;
    let pth: any = dirPath || this.dirname + '/pages'

    // check if absolute slug (custom slugs with [String] format)
    if (/\[+[a-zA-Z\-0-9]+\]/ig.test(p)) {
      let url: any = ''
      let slugs: RegExpMatchArray = p.match(/\[+[a-zA-Z\-0-9]+\]/ig)
      url = '/' + slugs.join('/')
      url += p.replace(/\/\[+[a-zA-Z\-0-9]+\]/ig, '')
      p = url
    }
    
    fs.readdir(path.resolve(this.dirname, pth), (err: any, files: any) => {
      if (files) {
        files.forEach((file: any) => {
          if (!!path.extname(file)) {

            if (this.i18n && this.i18n.langs) {
              this.i18n.langs.forEach((lang: any) => {

                if (this.i18n.except.indexOf(lang) == -1) {
                  let o = {
                    name: (p + (file != 'index.vue' ? '/' + path.parse(file).name : '')).replace('/', '').replace(/\//ig, '-').replace(/_/, '').replace(/\[|\]|:|\?/ig, '') + `___${lang}`,
                    path: `/${lang}` + (p + (file != 'index.vue' ? '/' + path.parse(file).name : '')).replace(/_/, ':').replace(/\[/ig, ':').replace(/\]/ig, ''),
                    component: path.resolve(this.dirname, pth + '/' + file),
                  }
                  if (path.extname(file) == '.vue' && !/^-/.test(file)) {
                    this.context.extendRoutes((routes: any) => {
                      routes.push(o);
                    });
                  }
                }
              })
              // if no i18n module
            } else {
              let o = {
                name: (p + (file != 'index.vue' ? '/' + path.parse(file).name : '')).replace('/', '').replace(/\//ig, '-').replace(/_/, '').replace(/\[|\]|:|\?/ig, ''),
                path: (p + (file != 'index.vue' ? '/' + path.parse(file).name : '')).replace(/_/, ':').replace(/\[/ig, ':').replace(/\]/ig, '?'),
                component: path.resolve(this.dirname, pth + '/' + file)
              }
              if (path.extname(file) == '.vue' && !/^-/.test(file)) {
                this.context.extendRoutes((routes: any) => {
                  routes.unshift(o);
                });
              }
            }

          } else {
           // p = p.replace(/:(\w+)+$/igm, ':$1?')
            if (fs.readdirSync(path.join(pth, file)).length !== 0) {
              this.registerRoute(p + '/' + file, path.join(pth, file))
            }
          }
        });
      }
    });
  }

  /**
   * Generate module routes from directory & JSON config file
   */
  registerRoutes() {
    this.registerRoute('', '')

    // register routes from json config file
    if (this.config.routes && this.config.routes.length > 0) {
      this.config.routes.forEach((element: any) => {
        if (Object.keys(element).length !== 0) {

          if (this.i18n && this.i18n.langs) {
            this.i18n.langs.forEach((lang: any) => {
              if (this.i18n.except.indexOf(lang) == -1) {
                this.context.extendRoutes((routes: any) => {
                  let o = {
                    name: (element.name) + '___' + lang,
                    path: `/${lang}${element.path}`,
                    component: path.resolve(this.dirname, `pages/${element.page}`)
                  }
                  routes.unshift(o);
                });
              }
            });

          } else {
            this.context.extendRoutes((routes: any) => {
              let o = {
                name: element.name,
                path: `${element.path}`,
                component: path.resolve(this.dirname, `pages/${element.page}`)
              }
              routes.unshift(o);
            });
          }
        }
      });

    }
  }

  /**
   * Generate module plugins recursively
   * @param {String} plugin - recursive plugin name
   * @param {String} dirPath - recursive dir path 
   */
  registerPlugins(plugin: String, dirPath: String) {
    let p: any = plugin || `./plugins/${this.moduleName}`;
    let pth: any = dirPath || this.dirname + '/plugins'

    fs.readdir(path.resolve(this.dirname, pth), (err: any, files: any) => {
      if (files) {
        files.forEach((file: any) => {
          if (!!path.extname(file)) {
            let o = {
              src: path.resolve(pth, file),
              fileName: p + '/' + file
            }
            if (path.extname(file) == '.js' || path.extname(file) == '.ts') {
              this.context.addPlugin(o)
            }
          } else {
            if (fs.readdirSync(path.join(pth, file)).length !== 0) {
              this.registerPlugins(path.join(p, file), path.join(pth, file))
            }
          }
        });
      }
    });
  }

  /**
   * Generate module server middleware from JSON config file
   */
  registerMiddlewares() {
    if (this.config.serverMiddleware && this.config.serverMiddleware.length > 0) {
      this.config.serverMiddleware.forEach((element: any) => {
        if (Object.keys(element).length !== 0) {
          let o = {
            path: element.path,
            handler: path.resolve(this.dirname, `middleware/server/${element.handler}`)
          }
          this.context.addServerMiddleware(o)
        }
      });
    }
  }
}
