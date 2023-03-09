export default {
  PORT: 3000,
  OPENAI_API_KEY: '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',
  mongodb: 'mongodb://127.0.0.1:27017/work-collection',
  JwtSecret: 'jwtSecret1',
  JwtWhileList: [
    /^\/api\/user/,
  ],
  cookieKey: {
    authToken: '_auth_token'
  },
  Email: {
    smtp: {
      host: 'smtp.qq.com',
      user: '291898675@qq.com',
      pass: 'wgayyqlkyeajbhgc',
      code() {
        return Math.random()
          .toString(16)
          .slice(2, 8)
          .toUpperCase()
      },
      expire() {
        return new Date().getTime() + (5 * 60 * 1000)
      }
    }
  }
}
