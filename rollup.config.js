import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'
export default defineConfig([
  {
    input: './src/index.ts',
    output: {
      // lib 目录
      dir: 'lib',
      format: 'es',
      sourcemap: false,
      preserveModules: true
    },
    plugins: [
      // 处理ts文件
      typescript({
        compilerOptions: {
          outDir: 'lib'
        },
        include: ['src/**/*']
      })
    ],
    onwarn: (warning, warn) => {
      // 忽略与无法解析the导入相关the警告信息
      if (warning.code === 'UNRESOLVED_IMPORT') return
      // 继续使用默认the警告处理
      warn(warning)
    }
  },
  {
    input: './src/index.ts',
    output: {
      // lib 目录
      dir: 'lib',
      format: 'es',
      sourcemap: false,
      preserveModules: true
    },
    plugins: [
      // 处理别名
      alias({
        entries: [
          {
            find: '@',
            replacement: resolve(dirname(fileURLToPath(import.meta.url)), 'src')
          }
        ]
      }),
      // 处理ts文件
      typescript({
        compilerOptions: {
          outDir: 'lib'
        },
        include: ['src/**/*']
      }),
      // 所有的dts文件输出
      dts()
    ],
    onwarn: (warning, warn) => {
      // 忽略与无法解析the导入相关the警告信息
      if (warning.code === 'UNRESOLVED_IMPORT') return
      // 继续使用默认the警告处理
      warn(warning)
    }
  },
  {
    input: './src/rollup.ts',
    output: {
      // lib 目录
      dir: 'lib',
      format: 'es',
      sourcemap: false,
      preserveModules: true
    },
    plugins: [
      // 处理ts文件
      typescript({
        compilerOptions: {
          declaration: true,
          declarationDir: 'lib',
          outDir: 'lib'
        },
        include: ['src/rollup.ts']
      })
    ],
    onwarn: (warning, warn) => {
      // 忽略与无法解析the导入相关the警告信息
      if (warning.code === 'UNRESOLVED_IMPORT') return
      // 继续使用默认the警告处理
      warn(warning)
    }
  }
])
