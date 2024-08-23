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
      input: 'yunzai-mys/index.ts',
      file: 'yunzai-mys/index.js',
      include: ['yunzai-mys/**/*'],
      declaration: true,
      declarationDir: 'yunzai-mys/types',
      outDir: 'yunzai-mys/types'
    },
    {
      input: 'yunzai-mys/src/middleware.ts',
      file: 'yunzai-mys/middleware.js',
      include: ['yunzai-mys/src/middleware.ts'],
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
    },
    {
      input: 'src/version.ts',
      file: 'src/version.js',
      include: ['src/version.ts'],
      declaration: false,
      declarationDir: undefined,
      outDir: undefined
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
      input: 'middleware/runtime/index.ts',
      file: 'middleware/runtime/index.js',
      include: ['middleware/runtime/**/*'],
      declaration: true,
      declarationDir: 'middleware/runtime/types',
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
