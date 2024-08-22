import { defineConfig } from 'yunzai'
export default defineConfig({
  applications: ['yz-system'],
  middlewares: ['yz-mw-runtime', 'yz-mw-star-rail']
})
