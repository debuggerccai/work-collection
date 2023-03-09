/**
 * Create by lwcai
 * Description: user
 * Date: 2023-03-06
 */
import ajax from 'src/api/ajax'

export interface LoginParams {
  username: string,
  password: string
}

export interface RegisterParams extends LoginParams {
  email: string,
  code: string
}

export const postLogin = (params: LoginParams) => ajax('/user/login', params, 'POST')

export const postRegister = (params: RegisterParams) => ajax('/user/register', params, 'POST')

export const postVerify = (parmas: Pick<RegisterParams, 'email'>) => ajax('/user/verify', parmas, 'POST')
