import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), basicSsl(), ],
  base: "/AnimeTrackingDemo_frontend/",
  server: {
    proxy:{
      '/api/bot/getSeason':{
        target: 'http://localhost:5152',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
