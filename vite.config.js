import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
                type: "module"
            },
            manifest: {
                "name": "Food Clone",
                "short_name": "Food",
                "theme_color": "#000000",
                // "icons": [
                //   {
                //     "src": "assets/img/icons192.png",
                //     "type": "image/png",
                //     "sizes": "192x192"
                //   },
                //   {
                //     "src": "assets/img/icons512.png",
                //     "type": "image/png",
                //     "sizes": "512x512"
                //   }
                // ],
                "start_url": "./?utm_source=pwa_app",
                "id": "/?utm_source=web_app_manifest",
                "background_color": "#FFFFFF",
                "display": "fullscreen",
                "orientation": "portrait",
                "prefer_related_applications": false
            },
            workbox: {
                globPatterns: [],
            ignoreURLParametersMatching: [/.*/],
                runtimeCaching: [
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'images',
                            expiration: {
                                maxEntries: 30
                            }
                        }
                    },
                    {
                        urlPattern: /.*\.js.*/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'js',
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 30 * 24 * 60 * 60
                            },
                            cacheableResponse: {
                                statuses: [200, 304]
                            }
                        }
                    },
                    {
                        urlPattern: /.*\.css.*/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'css',
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 30 * 24 * 60 * 60
                            },
                            cacheableResponse: {
                                statuses: [200]
                            }
                        }
                    },
                    {
                        urlPattern: /.*\.html.*/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'html',
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 30 * 24 * 60 * 60
                            },
                            cacheableResponse: {
                                statuses: [200]
                            }
                        }
                    },
                    {
                        urlPattern: /.*\.jsx.*/,
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'jsx',
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 30 * 24 * 60 * 60
                            },
                            cacheableResponse: {
                                statuses: [200, 304]
                            }
                        }
                    },
                ]
            }
        })
    ],
})
