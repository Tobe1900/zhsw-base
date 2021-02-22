const { name } = require('../package.json')
const dev = process.env.NODE_ENV === "development";
module.exports = {
  publicPath: dev ? `//localhost:7766` : "/",
  outputDir: "dist",
  assetsDir: "static",
  filenameHashing: true,
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    }
  },
  devServer: {
    port: process.env.COMMON_LOGIN_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*' // 主应用获取子应用时跨域响应头
    },
    proxy:{
      "/auth": {
        target: "http://39.99.255.8:8088/",
        changeOrigin: true,
        pathRewrite: {
          "^/auth": "/auth"
        }
      },
    }
  }
}
