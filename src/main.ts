import { Client, Loader, createLogin, Processor } from 'yunzai'
/**
 * *********************
 * 确保所有微任务做好准备后
 * 再进行宏任务
 * ****************
 */
setTimeout(async () => {
  /**
   * login
   */
  await createLogin()
  /**
   * run
   */
  await Client.run().then(async () => {
    // 读取yunzai.config.js
    await Processor.install()
    /**
     * 加载插件
     */
    await Loader.load()
    /**
     *
     * @param bytes
     * @returns
     */
    const formatMemoryUsage = bytes => {
      const units = ['B', 'KB', 'MB', 'GB', 'TB']
      let i = 0
      while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024
        i++
      }
      return `${bytes.toFixed(2)} ${units[i]}`
    }
    /**
     * show process message
     */
    const message = process.memoryUsage()
    logger.info('------------')
    logger.info('总内存占用量:', formatMemoryUsage(message.rss))
    logger.info('堆内存总量:', formatMemoryUsage(message.heapTotal))
    logger.info('已使用的堆内存量:', formatMemoryUsage(message.heapUsed))
    logger.info('对象的内存使用量:', formatMemoryUsage(message.external))
    logger.info('------------')
  })
}, 0)
