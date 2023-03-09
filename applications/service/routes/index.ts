import Router from 'koa-router'
import user from './users'

const router = new Router({
  prefix: '/api'
})

router.use('/user', user.routes(), user.allowedMethods())

export default router
