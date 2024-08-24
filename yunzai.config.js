import { defineConfig } from 'yunzai'
export default defineConfig({
  applications: ['yz-system'],
  middlewares: ['yunzai-runtime/v3', 'yunzai-mys/mw']
})
