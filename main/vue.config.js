let originHost = "";
const onProxyReq = (proxyReq, req) => {
  const cookie = req.headers["cookie"];
  if (cookie) {
    proxyReq.setHeader("cookie", cookie);
  }
};
const onProxyRes = (proxyRes) => {
  if (proxyRes.headers["set-cookie"]) {
    proxyRes.headers["set-cookie"] = proxyRes.headers["set-cookie"].map((v) => {
      return v.replace(`domain=39.99.255.8`, "domain=" + originHost);
    });
  }
};
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port: 8080,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      "/auth": {
        target: "http://39.99.255.8:8088",
        changeOrigin: true,
        pathRewrite: {
          "^/auth": "/auth",
        },
        onProxyReq,
        onProxyRes,
      },
      "/uaa": {
        target: "http://39.99.255.8:8088/",
        changeOrigin: true,
        pathRewrite: {
          "^/uaa": "/uaa",
        },
        onProxyReq,
        onProxyRes,
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "./src/assets/css/variables/variables.scss";`,
      },
    },
  },
  chainWebpack(config) {
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
};
