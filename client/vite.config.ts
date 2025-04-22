// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// export default defineConfig({
//   plugins: [react()],

//   build: {
//     rollupOptions: {
//       external: ['framer-motion']
//     }

// }})


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: "/", // 👈 SUPER important for correct routing on Netlify

})
