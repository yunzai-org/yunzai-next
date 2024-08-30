import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'

const onwarn = (warning, warn) => {
  // 忽略与无法解析the导入相关the警告信息
  if (warning.code === 'UNRESOLVED_IMPORT') return
  // 继续使用默认the警告处理
  warn(warning)
}

const babelPlugin = babel({
  babelHelpers: 'bundled',
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  // 编译插件
  plugins: [
    [
      'module-resolver',
      {
        // 根
        root: ['./'],
        // @ 别名 -> 当前目录
        alias: {
          '@': './yunzai'
        }
      }
    ]
  ]
})

export default defineConfig([
  {
    input: 'yunzai/index.ts',
    output: {
      file: 'yunzai/index.js',
      format: 'es',
      sourcemap: false
    },
    plugins: [
      babelPlugin,
      typescript({
        compilerOptions: {
          declaration: true,
          declarationDir: 'yunzai/types',
          outDir: 'yunzai/types'
        },
        include: ['yunzai/**/*']
      })
    ],
    onwarn: onwarn
  },
  {
    input: 'yunzai/rollup/index.ts',
    output: {
      file: 'yunzai/rollup/index.js',
      format: 'es',
      sourcemap: false
    },
    plugins: [
      typescript({
        compilerOptions: {
          declaration: false
        },
        include: ['yunzai/rollup/index.ts']
      })
    ],
    onwarn: onwarn
  },
  {
    input: 'src/main.ts',
    output: {
      file: 'src/main.js',
      format: 'es',
      sourcemap: false
    },
    plugins: [
      typescript({
        compilerOptions: {
          declaration: false
        },
        include: ['src/main.ts']
      })
    ],
    onwarn: onwarn
  }
])
