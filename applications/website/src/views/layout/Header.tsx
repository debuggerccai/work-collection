/**
 * Create by lwcai
 * Description: Header
 * Date: 2023-03-09
 */
import React, { useEffect } from 'react'
import { GithubOutlined, UserOutlined } from '@ant-design/icons'
import {
  Row, Col, Grid, Popover, Menu, MenuProps
} from 'antd'
import { Link } from 'react-router-dom'
import styles from './header.module.scss'

const { useBreakpoint } = Grid

const Header: React.FC = () => {
  const screens = useBreakpoint()

  const content = () => (
    <div>
      <p>个人信息</p>
      <p>退出登录</p>
    </div>
  )

  const onClick = (e: any) => {

  }

  return (
    <header className={styles.header}>
      <Row>
        <Col xs={24} sm={24} md={10} lg={10}>
          <Row align="middle" wrap={false}>
            <h1>
              <Link to="">
                <>
                  <GithubOutlined />
                  <span style={{ marginLeft: 8 }}>Work Collection</span>
                </>
              </Link>
            </h1>
          </Row>
        </Col>
        <Col xs={0} sm={0} md={14} lg={14}>
          <Row align="middle" justify="end" style={{ height: '100%' }}>
            <Popover content={content}>
              <span>
                <svg style={{ width: 36, height: 36 }} aria-hidden="true">
                  <use xlinkHref="#icon-1_user5" />
                </svg>
              </span>
              {/* <UserOutlined style={{ fontSize: 24 }} /> */}
            </Popover>
          </Row>
        </Col>
      </Row>
    </header>
  )
}

export default Header
