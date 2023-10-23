// required to get around CORS issue in browser
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/subscriptionquery/v1/subscription-options',
    createProxyMiddleware({
      target: 'https://production-api.gousto.co.uk',
      changeOrigin: true,
    })
  );

  app.use(
    '/boxPrices',
    createProxyMiddleware({
      target: 'https://production-api.gousto.co.uk',
      changeOrigin: true,
    })
  );
};
