import pkg from './package'

export default {
  mode: 'spa',
  
  server: {
    port: 9999, // default: 3000
    host: '127.0.0.1', // default: localhost
  },
  /*
  ** Headers of the page
  */
  head: {
    title: `Genratr | ${pkg.description}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Genratr is a free and open source strong password generator. Your passwords are only generated on your browser!' },
      { name: 'theme-color', content: '#000' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#000' },

  /*
  ** Global CSS
  */
  // css: [
  // ],

  /*
  ** Plugins to load before mounting the App
  */
  // plugins: [
  // ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    //'@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    //'@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  */
  // axios: {
  //   // See https://github.com/nuxt-community/axios-module#options
  // },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
