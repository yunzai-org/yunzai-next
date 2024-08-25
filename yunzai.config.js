import { defineConfig } from 'yunzai'
export default defineConfig({
  applications: ['yz-system'],
  middlewares: ['yunzai-mys/runtime', 'yunzai-mys/message']
})
