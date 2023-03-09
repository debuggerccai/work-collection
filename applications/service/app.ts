import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import session from 'koa-generic-session'
import json from 'koa-json'
import jwt from 'koa-jwt'
import logger from 'koa-logger'
import RedisStore from 'koa-redis'
import views from 'koa-views'
import mongoose from 'mongoose'

import config from './config'
import JwtAuth from './middlewares/jwt'
import router from './routes'

const app = new Koa()

app.keys = ['keys', 'keyskeys']
app.proxy = true

// middlewares
app.use(
  session({
    store: new RedisStore({ password: 'B8T8mix88GcS' })
  })
)
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(`${__dirname}/public`))

app.use(views(`${__dirname}/views`, {
  extension: 'pug'
}))

// 连接数据库
mongoose.connect(
  config.mongodb,
  {
    authSource: 'admin',
    user: 'root',
    pass: 'example'
  }
)

const db = mongoose.connection
mongoose.Promise = global.Promise

db.on('error', () => {
  console.log('数据库连接出错')
})

db.on('open', () => {
  console.log('数据库连接成功')
})

// logger
app.use(async (ctx, next) => {
  const start = +new Date()
  await next()
  const ms = +new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// token 校验
app.use(jwt({ secret: config.JwtSecret }).unless({
  path: config.JwtWhileList
}))
app.use(JwtAuth.verifyUserToken)

// routes
app.use(router.routes()).use(router.allowedMethods())

// error-handling
app.on('error', (err: Error, ctx) => {
  console.error('server error', err, ctx)
})

app.listen(config.PORT, () => {
  console.log('Server run link', `localhost:${config.PORT}`)
})

export default app
