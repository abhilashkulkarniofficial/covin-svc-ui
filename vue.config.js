module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://covin-svc-api.herokuapp.com',
        changeOrigin: true
      },
    }
  }
}
