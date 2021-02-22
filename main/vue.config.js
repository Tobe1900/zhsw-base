module.exports = {
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port: 8080,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy:{
      "/auth": {
        target: "http://39.99.255.8:8088",
        changeOrigin: true,
        pathRewrite: {
          "^/auth": "/auth"
        }
      },
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "./src/assets/css/variables/variables.scss";`
      }
    }
  }
}
