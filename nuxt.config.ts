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
  },
  modules: [
    '@vueuse/motion/nuxt',
    '@pinia/nuxt',
    'nuxt-vuefire',
    'vuetify-nuxt-module',
    '@nuxtjs/mdc',
    '@vueuse/nuxt',
    '@vueuse/motion/nuxt'
  ],

  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },
  build: {
    transpile: ['vuetify'],
    // 최적화된 빌드를 위해 추가 설정
    extractCSS: true,
    optimization: {
      splitChunks: {
        layouts: true,
        pages: true,
        commons: true
      }
    },
    // 추가 설정
    extend(config, { isDev, isClient }) {
      if (!isDev && isClient) {
        config.optimization.minimizer = [
          // JavaScript 최적화 (예: Terser)
          new TerserPlugin(),
          // CSS 최적화 (예: CSSMinimizer)
          new CssMinimizerPlugin()
        ]
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
    { src: '~/plugins/vue-recaptcha-v3.client', mode: 'client' }
  ],

  app: {
    head: {
      title: 'springnote.blog'
    }
  },

  ssr: true,

  css: [
    '@/assets/css/fonts.css',
    '@/assets/css/global.css',
    'highlight.js/styles/stackoverflow-dark.css'
  ],

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
    ssr: true,
    defaultAssets: { font: false, icons: true },
    treeShake: true,
    moduleOptions: {},
    vuetifyOptions: {
      defaultAssets: { font: false, icons: true },
      blueprint: md3,
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

  mdc: {
    highlight: {
      langs: [
        'c#',
        'md',
        'diff',
        'java',
        'js',
        'mermaid',
        'go',
        'python',
        'shell',
        'sql',
        'yaml',
        'json',
        'xml',
        'html',
        'css',
        'php',
        'ruby',
        'rust',
        'typescript',
        'dart',
        'kotlin',
        'swift',
        'scala',
        'groovy',
        'perl',
        'lua',
        'r',
        'haskell',
        'clojure',
        'elixir',
        'lisp',
        'scheme',
        'ocaml',
        'fsharp'
      ],
      theme: 'material-theme-darker'
    },
    components: {
      prose: true,
      map: {
        // p: 'MarkdownP',
        h1: 'MarkdownH1',
        h2: 'MarkdownH2',
        h3: 'MarkdownH3',
        h4: 'MarkdownH4',
        h5: 'MarkdownH5',
        h6: 'MarkdownH6',
        ul: 'MarkdownUl',
        // ol: 'MarkdownOl',
        // li: 'MarkdownLi',
        blockquote: 'MarkdownBlockquote',
        hr: 'MarkdownHr',
        pre: 'MarkdownPre',
        code: 'MarkdownCode',
        table: 'MarkdownTable',
        thead: 'MarkdownThead',
        tbody: 'MarkdownTbody',
        tr: 'MarkdownTr',
        th: 'MarkdownTh',
        td: 'MarkdownTd',
        a: 'MarkdownA',
        img: 'MarkdownImg',
        em: 'MarkdownEm',
        strong: 'MarkdownStrong'
      }
    }
  },

  runtimeConfig: {
    public: {
      siteKey: process.env.RECAPTCHA_SITE_KEY,
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      baseImgUrl: process.env.BASE_IMG_URL || 'http://localhost:3000',
      motion: {
        directives: {
          shake: {
            initial: {
              y: 0,
              x: 0
            },
            enter: {
              y: 8,
              x: 8,
              transition: {
                duration: 1000,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }
          }
        }
      }
    }
  }
})
