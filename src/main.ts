import { Client, Loader, createLogin, Processor } from 'yunzai'

// *********************
const initialize = () => {
  // 读取 yunzai.config.js
  Processor.install()
  // 加载插件
  Loader.load()
}

// *********************
const start = async () => {
  // 登录配置校验
  await createLogin()
  // 运行机器人
  await Client.run()
  // 上线时运行
  Bot.on('system.online', initialize)
}

/**
 * *********************
 * 确保所有微任务做好准备后
 * ****************
 */
setTimeout(start, 0)
