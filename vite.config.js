import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import million from 'million/compiler';

// // https://vitejs.dev/config/
export default defineConfig({
  plugins: [million.vite({ auto: true }), react()],
});

// import { dependencies } from './package.json'

// const exclVendors = ['react', 'react-router-dom', 'react-dom']
// function renderChunks(deps) {
//   let chunks = {}
//   Object.keys(deps).forEach((key) => {
//     if (exclVendors.includes(key)) return
//     chunks[key] = [key]
//   })
//   return chunks
// }
// // https://vitejs.dev/config/
// export default defineConfig({
//   build: {
//     sourcemap: false,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           ...renderChunks(dependencies),
//         },
//       },
//     },
//   },
//   test: {
//     environment: "jsdom"
//   }
// })
