import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 5174,
    open: true
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
}) 