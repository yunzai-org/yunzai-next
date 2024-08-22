import { writeFileSync } from 'fs'
import { createRequire } from 'module'
import { join } from 'path'
const require = createRequire(import.meta.url)
const dir = join(process.cwd(), 'package.json')
const pkg = require(dir)
const args = [...process.argv].slice(2)
const isDelete = args.includes('--delete')
if (pkg['imports']) {
  let t = false
  if (pkg['imports']['#miao']) {
    if (isDelete) {
      delete pkg['imports']['#miao']
      t = true
    }
  } else {
    if (!isDelete) {
      pkg['imports']['#miao'] = './plugins/miao-plugin/components/index.js'
      t = true
    }
  }
  if (pkg['imports']['#miao.models']) {
    if (isDelete) {
      delete pkg['imports']['#miao.models']
      t = true
    }
  } else {
    if (!isDelete) {
      pkg['imports']['#miao.models'] = './plugins/miao-plugin/models/index.js'
      t = true
    }
  }
  if (t) {
    // 需要保持格式化后的字符串，也就是换行
    writeFileSync(dir, JSON.stringify(pkg, null, 2))
  }
}
