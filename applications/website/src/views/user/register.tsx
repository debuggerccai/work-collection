/**
 * Create by lwcai
 * Description: registry
 * Date: 2023-03-06
 */
import React, {
  useCallback, useEffect, useRef, useState, useMemo
} from 'react'
import {
  Button, Form, Input, Typography, Row, Col
} from 'antd'
import { debounce } from 'lodash'
import { postLogin, postVerify } from 'src/services'
import { getRules } from 'src/utils'
import { isEmail } from 'src/utils/isType'

let timer: any = null

const Register: React.FC = () => {
  const [isSendCode, setIsSendCode] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const onFinish = async (values: { username: string, password: string }) => {
    const { result, data } = await postLogin(values)

    // if (result) {
    //
    // }
  }

  const onSendCode = useCallback(async () => {
    setIsSendCode(true)

    timer = setInterval(() => {
      console.log('setInterval...', countdown)

      setCountdown((val) => {
        if (val === 1) {
          setIsSendCode(false)
          clearInterval(timer)

          return 60
        }
        return val - 1
      })
    }, 1000)
  }, [setIsSendCode, countdown, setCountdown])

  const debounceFnSendCode = useMemo(() => debounce(onSendCode, 150), [onSendCode])

  const validateMessages = {
    types: {
      email: '不是有效的邮箱'
    }
  }

  useEffect(() => () => {
    if (timer) clearTimeout(timer)
  }, [])

  return (
    <Form
      style={{ width: '100%' }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="username"
        rules={getRules('input', '用户名')}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={getRules('input', '邮箱', { type: 'email' })}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>

      <Form.Item noStyle>
        <Row gutter={8}>
          <Col span={15}>
            <Form.Item
              name="code"
              rules={getRules('input', '验证码')}
            >
              <Input placeholder="验证码" />
            </Form.Item>
          </Col>
          <Col span={9}>
            {
              isSendCode ? (
                <Button style={{ width: 100 }} type="primary" disabled>{countdown}s</Button>
              ) : (
                <Button style={{ width: 100 }} type="primary" onClick={debounceFnSendCode}>发送验证码</Button>
              )
            }

            {/* <Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.email !== curValues.email}> */}
            {/*  {(form) => { */}
            {/*    const isValid = isEmail(form.getFieldValue('email')) */}

            {/*    return isValid ? ( */}
            {/*      <Button type="primary">发送验证码</Button> */}
            {/*    ) : ( */}
            {/*      <Tooltip title="请输入正确的邮箱地址"> */}
            {/*        <Button disabled>发送验证码</Button> */}
            {/*      </Tooltip> */}
            {/*    ) */}
            {/*  }} */}
            {/* </Form.Item> */}
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="password"
        rules={getRules('input', '密码')}
        hasFeedback
      >
        <Input.Password placeholder="输入密码" />
      </Form.Item>

      <Form.Item
        name="confirm"
        rules={[
          {
            required: true,
            message: '请确认您的密码!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('您输入的两个密码不匹配!'))
            },
          }),
        ]}
        dependencies={['password']}
        hasFeedback
      >
        <Input.Password placeholder="确认密码" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 2 }}>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          注册
        </Button>
      </Form.Item>
      <Form.Item>
        <Typography.Link href="/user/login">已有账户？立即登录</Typography.Link>
      </Form.Item>
    </Form>
  )
}

export default Register
