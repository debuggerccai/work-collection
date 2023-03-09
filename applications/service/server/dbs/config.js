/**
 * Create by lwcai
 * Description: config.ts
 * Date: 2023-03-07
 */

// mongo 连接地址
const dbs = 'mongodb://127.0.0.1:8081/db/work-collection'

// redis 地址和端口
const redis = {
  get host() {
    return '127.0.0.1'
  },
  get port() {
    return 8082
  }
}

// qq 邮箱配置
const smtp = {
  get host() {
    return 'smtp.qq.com'
  },
  get user() {
    // TODO: 临时使用，新邮箱通过后删除
    return 'cailiangwu@outlook.com'
    // return 'x-work-collection@qq.com' // qq邮箱名
  },
  get pass() {
    return 'dczwhiwnvascbhjg'
    // return 'TgwFKjtZq6tL' // qq邮箱授权码
  },
  // 生成邮箱验证码
  get code() {
    return () => Math.random()
      .toString(16)
      .slice(2, 6)
      .toUpperCase()
  },
  // 定义验证码过期时间rules，5分钟
  get expire() {
    return () => new Date().getTime() + (5 * 60 * 1000)
  }
}

export {
  dbs,
  redis,
  smtp
}
