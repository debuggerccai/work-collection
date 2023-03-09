import jwt from 'jsonwebtoken'
import { Context, Next } from 'koa'
import config from '../config'

const matchesPath = (requestedUrl: string, pathList: Array<RegExp | string>) => pathList.some((p: RegExp | string) => (typeof p === 'string' && p === requestedUrl)
      || (p instanceof RegExp && !!p.exec(requestedUrl)))

export default class JwtAuth {
  static signUserToken(userData: { [key: string]: string }, options = { expiresIn: 24 * 60 * 60  }) {
    try {
      return jwt.sign(userData, config.JwtSecret, options)
    } catch (e) {
      throw new Error(`signUserToken error: ${e}`)
    }
  }

  static async verifyUserToken(ctx: Context, next: Next) {
    const { url } = ctx.request

    // 校验白名单
    if (matchesPath(url, config.JwtWhileList)) {
      await next()
    } else {
      const authorization = ctx.get('Authorization')

      if (authorization === '') {
        ctx.throw(401, 'no token detected in http headerAuthorization')
      }

      const token = authorization.split(' ')[1]

      try {
        await jwt.verify(token, config.JwtSecret)
      } catch (e) {
        ctx.throw(401, 'invalid token')
      }

      await next()
    }
  }
}
