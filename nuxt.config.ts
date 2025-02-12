import { md3 } from 'vuetify/blueprints'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-19',
  devtools: { enabled: false },
  routeRules: {
    '/': { swr: true },
    '/posts/:id': { swr: true },
    '/post-list': { swr: true },
    '/series-list': { swr: true },
    '/series/:id': { swr: true },
    '/term': { swr: true },
    '/privacy-policy': { swr: true }
  },
  modules: [
    '@vueuse/motion/nuxt',
    '@pinia/nuxt',
    'nuxt-vuefire',
    'vuetify-nuxt-module',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt',
    '@nuxt/image'
  ],

  nitro: {
    compressPublicAssets: true
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },
  build: {
    transpile: ['vuetify'],

    extractCSS: true,
    optimization: {
      splitChunks: {
        layouts: true,
        pages: true,
        commons: true
      }
    },
    terser: {
      compress: {
        drop_console: true // 콘솔 로그 제거
      }
    }

  },

  // ssr 모드이지만, 서버사이드에서는 인증이 필요 없으므로, 오직 클라이언트 모듈만 사용한다.
  //ref : https://github.com/vuejs/vuefire/discussions/1511
  hooks: {
    'app:resolve': app => {
      app.plugins = app.plugins.filter(
        // Remove the VueFire authentication server plugin
        p => !p.src.includes('auth/plugin-authenticate-user.server')
      )
    }
  },

  components: true,
  plugins: [
    { src: '~/plugins/analytics.client', mode: 'client' },
    '~/plugins/ssr-client-hints'
  ],

  app: {
    head: {
      title: 'springnote.blog',
      link: [
        // preconnect 설정
        { rel: 'preconnect', href: 'https://www.google.com' },
        { rel: 'preconnect', href: 'https://firebase.googleapis.com' },
        // dns-prefetch 설정
        { rel: 'dns-prefetch', href: 'https://www.google.com' },
        { rel: 'dns-prefetch', href: 'https://firebase.googleapis.com' }
      ],
      meta: [
        {
          name: 'springnote.blog',
          description: 'springnote.blog 는 백엔드 관련 기술을 주로 다루는 개발 블로그입니다.',
          'og:title': 'springnote.blog',
          'og:description': 'springnote.blog 는 백엔드 관련 기술을 주로 다루는 개발 블로그입니다.',
          'og:type': 'article',
          'og:site_name': 'springnote.blog',
          'og:locale': 'ko_KR'
        }
      ]
    }
  },

  ssr: true,

  css: [],

  pinia: {
    storesDirs: ['./stores/**']
  },

  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
    }
  },
  features: {
    inlineStyles: false
  },

  vuetify: {
    moduleOptions: {
      ssrClientHints: {
        viewportSize: true,
        prefersColorScheme: true,
        prefersReducedMotion: true,
        reloadOnFirstRequest: false
      },
      defaultAssets: {
        font: false,   // 기본 폰트(예: Roboto) 제거
        icons: false   // 기본 아이콘 폰트 자동 로드를 제거
      }
    },


    defaultAssets: {
      font: false,   // 기본 폰트(예: Roboto) 제거
      icons: false   // 기본 아이콘 폰트 자동 로드를 제거
    },
    treeShake: true,

    vuetifyOptions: {

      iconfont: 'mdiSvg',
      blueprint: md3,
      defaultAssets: {
        font: false,   // 기본 폰트(예: Roboto) 제거
        icons: false   // 기본 아이콘 폰트 자동 로드를 제거
      },
      theme: {
        defaultTheme: 'darkSpringTheme',
        themes: {
          darkSpringTheme: {
            dark: true,
            colors: {
              primary: '#43A047',
              accent: '#424242',
              secondary: '#66BB6A',
              info: '#CDDC39',
              warning: '#FFC107',
              error: '#DD2C00',
              success: '#121212'
            }
          }
        }
      }
    }
  },

  image: {
    inject: true,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    presets: {
      default: {
        modifiers: {
          format: 'webp',
          quality: 80
        }
      }
    }
  },

  runtimeConfig: {
    public: {
      siteKey: process.env.RECAPTCHA_SITE_KEY,
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      baseImgUrl: process.env.BASE_IMG_URL || 'http://localhost:3000'
    }
  }
})
