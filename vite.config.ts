import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), basicSsl(), ],
  base: "/Anime-Tracking-Bot-MiniApp/",
  server: {
    proxy:{
      '/api/bot/getSeason':{
        target: 'http://animetracking.duckdns.org/',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
