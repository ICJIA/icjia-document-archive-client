const config = require('./src/config.json')

module.exports = {
  publicPath: process.env.NODE_ENV === `production` ? config.publicPath : '/',
    transpileDependencies: ['vuetify'],
    css: {
      loaderOptions: {
        sass: {
          data: `@import "~@/sass/main.scss"`,
        },
      },
    },
  }
