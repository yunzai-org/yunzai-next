import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
export default defineConfig(
  [
    {
      input: 'yunzai/index.ts',
      file: 'yunzai/index.js',
      include: ['yunzai/**/*'],
      declaration: true,
      declarationDir: 'yunzai/types',
      outDir: 'yunzai/types'
    },
    {
      input: 'yunzai/rollup/index.ts',
      file: 'yunzai/rollup/index.js',
      include: ['yunzai/rollup/index.ts'],
      declaration: false,
      declarationDir: undefined,
      outDir: undefined
    },
    {
      input: 'src/main.ts',
      file: 'src/main.js',
      include: ['src/main.ts'],
      declaration: false,
      declarationDir: undefined,
      outDir: undefined
    }
  ].map(item => {
    return {
      input: item.input,
      output: {
        file: item.file,
        format: 'es',
        sourcemap: false
      },
      plugins: [
        typescript({
          compilerOptions: {
            declaration: item.declaration,
            declarationDir: item.declarationDir,
            outDir: item.outDir
          },
          include: item.include,
          exclude: ['node_modules']
        })
      ],
      onwarn: (warning, warn) => {
        // 忽略与无法解析the导入相关the警告信息
        if (warning.code === 'UNRESOLVED_IMPORT') return
        // 继续使用默认the警告处理
        warn(warning)
      }
    }
  })
)
