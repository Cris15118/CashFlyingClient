import type { NuxtConfig } from "@nuxt/types";
const config: NuxtConfig = {
  buildModules: [
    "@nuxt/typescript-build",
    '@nuxtjs/style-resources',
    '@pinia/nuxt',
  ],
  plugins: [
    { src: "~/plugins/element-plus.js", ssr: false }
  ],
  css: [
    "element-plus/dist/index.css"
  ],
  modules: [
    "@element-plus/nuxt",
    'nuxt-icon',
    '@nuxtjs/google-fonts',
  
  ],
  styleResources: {
    scss: [
      '~/assets/styles/variables.scss',
    ]
  },
  googleFonts: {
    families: {
      Roboto: true,
      'Josefin+Sans': true,
      Lato: [100, 300],
      Kurale: {
        wght: [400],
        ital: [100]
      },
      Sedan: {
        wght: [400, 800],
        ital: [400],
      }
    }
  },
 
}

export default config