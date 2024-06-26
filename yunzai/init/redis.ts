import cfg from '../config/config.js'
import { execAsync, sleep } from '../utils/common.js'
import { createClient } from 'redis'

/**
 * 此处 redis写法是不合理的
 * tudo
 * 待优化
 */

/**
 * 初始化全局redis客户端
 * @returns
 */
async function redisInit() {
  const rc = cfg.redis
  const redisUn = rc.username || ''
  let redisPw = rc.password ? `:${rc.password}` : ''
  if (rc.username || rc.password) {
    redisPw += '@'
  }
  const redisUrl = `redis://${redisUn}${redisPw}${rc.host}:${rc.port}/${rc.db}`
  let client = createClient({ url: redisUrl })
  try {
    logger.info(`正在连接 ${logger.blue(redisUrl)}`)
    await client.connect()
  } catch (err) {
    logger.error(`Redis 错误：${logger.red(err)}`)
    const cmd =
      'redis-server --save 900 1 --save 300 10 --daemonize yes' +
      (await aarch64())
    logger.info('正在启动 Redis...')
    await execAsync(cmd)
    await sleep(1000)
    try {
      client = createClient({ url: redisUrl })
      await client.connect()
    } catch (err) {
      logger.error(`Redis 错误：${logger.red(err)}`)
      logger.error(`请先启动 Redis：${logger.blue(cmd)}`)
      process.exit()
    }
  }
  client.on('error', async err => {
    logger.error(`Redis 错误：${logger.red(err)}`)
    const cmd =
      'redis-server --save 900 1 --save 300 10 --daemonize yes' +
      (await aarch64())
    logger.error(`请先启动 Redis：${cmd}`)
    process.exit()
  })
  /** 全局变量 redis */
  global.redis = client as any
  logger.info('Redis 连接成功')
  return client
}
/**
 *
 * @returns
 */
async function aarch64() {
  if (process.platform == 'win32') return ''
  return await execAsync('uname -m').then(async arch => {
    if (arch.stdout && arch.stdout.includes('aarch64')) {
      /** 判断redis版本 */
      let v = await execAsync('redis-server -v')
      if (v.stdout) {
        const data = v.stdout.match(/v=(\d)./)
        /** 忽略arm警告 */
        if (data && Number(data[1]) >= 6) {
          return ' --ignore-warnings ARM64-COW-BUG'
        }
      }
    }
    return ''
  })
}
await redisInit()
