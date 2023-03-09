import { Context } from 'koa'
import Router from 'koa-router'
import UserController from '../controller/user'


// 获取 redis 的客户端

const router: Router = new Router()

// 发送验证码
router.post('/verify', UserController.sendVerify)

// 用户注册
router.post('/register', UserController.register)

// 用户登录
router.post('/login', UserController.login)

// 用户登出
router.get('/logout', UserController.logout)

export default router
