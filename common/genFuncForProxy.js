let originHost = "";

export const onProxyReq = () => {
  return (proxyReq, req) => {
    const cookie = req.headers["cookie"];
    if (cookie) {
      proxyReq.setHeader("cookie", cookie);
    }
  };
};

export const onProxyRes = (domain) => {
  return (proxyRes) => {
    if (proxyRes.headers["set-cookie"]) {
      proxyRes.headers["set-cookie"] = proxyRes.headers["set-cookie"].map(
        (v) => {
          return v.replace(`domain=${domain}`, "domain=" + originHost);
        }
      );
    }
  };
};
