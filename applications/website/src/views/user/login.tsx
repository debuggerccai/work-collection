/**
 * Create by lwcai
 * Description: login
 * Date: 2023-02-23
 */
import React from 'react'
import {
  Form, Input, Button, Typography
} from 'antd'
import { postLogin, LoginParams } from 'src/services'
import { getRules } from 'src/utils'

const Login: React.FC = () => {
  const onFinish = async (values: LoginParams) => {
    const { result, data } = await postLogin(values)

    if (result) {

    }
  }

  return (
    <Form
      style={{ width: '100%' }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={getRules('input', '用户名')}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={getRules('input', '密码')}
      >
        <Input.Password placeholder="输入密码" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 2 }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          登录
        </Button>
      </Form.Item>
      <Form.Item>
        <Typography.Link href="/user/register">没有账户？立即注册</Typography.Link>
      </Form.Item>
    </Form>

  )
}

export default Login
