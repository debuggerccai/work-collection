/**
 * Create by lwcai
 * Description: index
 * Date: 2023-03-06
 */
import React from 'react'
import {
  theme, Row, Col
} from 'antd'
import { Outlet } from 'react-router-dom'
import './login.less'

const { useToken } = theme

const User: React.FC = () => {
  const { token } = useToken()

  return (
    <Row style={{ width: '100%', height: '100%', backgroundColor: token.colorPrimaryActive }}>
      <Col lg={{ span: 16, order: 0 }} md={{ span: 24, order: 1 }} xs={{ span: 24, order: 1 }}>内容展示区1</Col>
      <Col className="login-box-wrap" lg={{ span: 8, order: 0 }} md={{ span: 24, order: 0 }} xs={{ span: 24, order: 0 }}>
        <Row className="login-box" align="middle" justify="center">
          <Outlet />
        </Row>
      </Col>
    </Row>
  )
}

export default User
