import { defineConfig } from 'yunzai'
export default defineConfig({
  applications: ['yz-system'],
  middlewares: ['yz-mw-runtime', 'yunzai-mys/mw']
})
