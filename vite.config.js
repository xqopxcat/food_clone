import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // VitePWA({
    //         registerType: 'autoUpdate',
    //         devOptions: {
    //             enabled: true
    //         },
    //         manifest: {
    //             "name": "Food Clone",
    //             "short_name": "Food",
    //             "theme_color": "#000000",
    //             "start_url": "./?utm_source=pwa_app",
    //             "id": "/?utm_source=web_app_manifest",
    //             "background_color": "#FFFFFF",
    //             "display": "fullscreen",
    //             "orientation": "portrait",
    //             "prefer_related_applications": false
    //         }
    //     })
    ],
})
