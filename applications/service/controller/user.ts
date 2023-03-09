/**
 * Create by lwcai
 * Description: user
 * Date: 2023-03-08
 */
import * as querystring from 'querystring'
import { Context } from 'koa'
import Redis from 'koa-redis'
import NodeMailer from 'nodemailer'
import config from '../config'
import createCtxBody from '../lib/createCtxBody'
import JwtAuth from '../middlewares/jwt'
import User from '../models/users'

const Store = new Redis({ password: 'B8T8mix88GcS' }).client

const nodemailKey = (email: string) => `nodemail: ${email}`

export default class UserController {
  /**
   * 登录
   * @param {Context} ctx
   */
  public static async login(ctx: Context) {
    const { username, password } = ctx.request.body as any

    const userInfo = await User.findOne({ username })

    if (!userInfo) {
      ctx.body = createCtxBody(false, '用户名不存在')
    } else if (userInfo.password !== password) {
      ctx.body = createCtxBody(false, '密码错误')
    } else if (userInfo.password === password) {
      try {
        // 生成 token
        const sysToken = JwtAuth.signUserToken({
          username
        })
        userInfo.token = sysToken

        // 更新 mongoDB 中对应用户名的 token
        await userInfo.save()

        // cookie 配置
        const cookieConfig = {
          httpOnly: true,
          maxAge: 18000 * 1000,
          // domain: 'http://www.lwcai.cn',
        }
        ctx.cookies.set('_auth_token', sysToken, cookieConfig)

        // 重定向
        const { redirect } = ctx.query
        if (redirect) {
          const queryUrl = querystring.stringify({ url: redirect })
          ctx.redirect(queryUrl)
        } else {
          ctx.body = createCtxBody(true, '登录成功')
        }
      } catch (e) {
        ctx.body = createCtxBody(false, `登录失败, ${e || '密码错误'}`)
      }
    }
  }

  /**
   * 注册用户
   * @param ctx
   */
  public static async register(ctx: Context) {
    const {
      username, password, email, code
    } = ctx.request.body as any

    // 验证验证码
    if (code) {
      const saveCode = await Store.hget(nodemailKey(email), 'code') // 已存储的验证码
      const saveExpire = await Store.hget(nodemailKey(email), 'expire') // 过期时间

      if (code === saveCode) {
        if (new Date().getTime() - saveExpire > 0) {
          ctx.body = createCtxBody(false, '验证码已过期，请重新申请')
          return
        }
      } else {
        ctx.body = createCtxBody(false, '验证码错误')
        return
      }
    } else {
      ctx.body = createCtxBody(false, '请填写验证码')
    }

    // 验证用户名
    const userInfo = await User.find({ username })
    if (userInfo.length) {
      ctx.body = createCtxBody(false, '用户名已注册')
      return
    }

    // 用户名未被注册，则写入数据库
    const newUser = await User.create({
      username,
      password,
      email,
      token: JwtAuth.signUserToken({ username })
    })


    // 写入数据库成功，返回注册成功
    if (newUser) {
      ctx.body = createCtxBody(true, '注册成功')
    } else {
      ctx.body = createCtxBody(false, '注册失败')
    }
  }

  /**
   * 发送验证码
   * @param ctx
   */
  public static async sendVerify(ctx: Context) {
    const { email } = ctx.request.body as any
    const saveExpire = await Store.hget(nodemailKey(email), 'expire') // 拿到过期时间

    // 校验已存在的验证码是否过期, 以限制用户频繁发送验证码
    if (saveExpire && new Date().getTime() - saveExpire < 0) {
      ctx.body = createCtxBody(false, '发送过于频繁，请稍后再试')
      return
    }

    // QQ邮箱 smtp 服务权限校验
    const transporter = NodeMailer.createTransport({
      /**
       *  端口465和587用于电子邮件客户端到电子邮件服务器通信 - 发送电子邮件。
       *  端口465用于smtps SSL加密在任何SMTP级别通信之前自动启动。
       *  端口587用于msa
       */
      host: config.Email.smtp.host,
      port: 587,
      secure: false, // 为true时监听465端口，为false时监听其他端口
      auth: {
        user: config.Email.smtp.user,
        pass: config.Email.smtp.pass
      }
    })

    // 邮件需要接受的信息
    const ko = {
      code: config.Email.smtp.code(),
      expire: config.Email.smtp.expire(),
      email,
    }

    // 邮件中展示的信息
    const mailOptions = {
      from: `认证邮件 <${config.Email.smtp.user}>`, // 发送人
      to: ko.email, // 收件人
      subject: 'work-collection 验证码', // 标题
      html: `您正在注册 work-collection，您的验证码是${ko.code}` // 内容
    }

    // 执行发送邮件
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        throw new Error(`transporter.sendMail error: ${err}`)
      } else {
        Store.hmset(nodemailKey(email), 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
      }
    })

    ctx.body = createCtxBody(true, '验证码已发送，有效期5分钟')
  }

  /**
   * 登出
   * @param ctx
   */
  public static async logout(ctx: Context) {
    const authToken = ctx.cookies.get(config.cookieKey.authToken)

    if (!authToken) {
      ctx.redirect('/user/login')
      return
    }

    ctx.cookies.set(config.cookieKey.authToken, '', { maxAge: 0 })
    ctx.redirect('/user/login')
  }
}
