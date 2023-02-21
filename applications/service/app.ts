import {Context, Next} from "koa";

const config = require('./config')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx: Context, next: Next) => {
  const start = +new Date()
  await next()
  const ms = +new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err: string, ctx: Context) => {
  console.error('server error', err, ctx)
});

app.listen(config.PORT, (err: Error) => {
  if (err) console.log("Error in server setup")
  console.log("Server run link", `localhost:${config.PORT}`);
})

module.exports = app
