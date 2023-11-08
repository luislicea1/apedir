import { defineConfig, splitVendorChunkPlugin } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), splitVendorChunkPlugin()],
// })


import { dependencies } from './package.json'
 
const exclVendors = ['react', 'react-router-dom', 'react-dom']
function renderChunks(deps) {
  let chunks = {}
  Object.keys(deps).forEach((key) => {
    if (exclVendors.includes(key)) return
    chunks[key] = [key]
  })
  return chunks
}
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          ...renderChunks(dependencies),
        },
      },
    },
  },
})