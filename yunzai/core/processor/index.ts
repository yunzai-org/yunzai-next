/**
 * 加工厂是全局的
 * 方便在任何地方都能执行
 */

import { join } from 'path'
import {
  ApplicationOptions,
  ConifigOptions,
  MiddlewareOptoins
} from '../options/types.js'

class ProcessorCore {
  /**
   *
   */
  #applications: ApplicationOptions[] = []

  /**
   *
   */
  #middlewares: MiddlewareOptoins[] = []

  /**
   *
   */
  get applications() {
    return this.#applications
  }

  /**
   *
   */
  get middlewares() {
    return this.#middlewares
  }

  /**
   * 输入配置参数
   */
  async install(configdir = 'yunzai.config.js') {
    //
    const jsDir = join(process.cwd(), configdir)
    //
    const config: ConifigOptions = (
      await import(`file://${jsDir}?t=${Date.now()}`)
    ).default
    // init
    this.#applications = []
    // inint
    this.#middlewares = []
    //
    if (Array.isArray(config.middlewares)) {
      for (const mw of config.middlewares) {
        if (typeof mw == 'string') {
          try {
            const strMW = await import(mw)
            this.#middlewares.push(strMW.default())
          } catch (e) {
            console.error(e)
          }
        } else {
          this.#middlewares.push(mw)
        }
      }
    }
    //
    if (Array.isArray(config.applications)) {
      for (const application of config.applications) {
        console.log(application)
        if (typeof application == 'string') {
          try {
            const strApp = await import(application)
            const app = strApp?.default()
            if (typeof app?.create == 'function') app.create(config)
            this.#applications.push(app)
          } catch (e) {
            console.error(e)
          }
        } else {
          if (typeof application?.create == 'function')
            application.create(config)
          this.#applications.push(application)
        }
      }
    }
  }
  //
}

export const Processor = new ProcessorCore()
