const DEV = process.env.NODE_ENV !== 'production'

module.exports = {
  serverPort: 8000,
  apiDomain: '/api', // 代理请求前缀
  proxyServer: '',
  DEV
}