/**
 * Create by lwcai
 * Description: index
 * Date: 2023-02-23
 */
import React, { ReactNode, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Content from 'src/views/layout/Content'
import Header from 'src/views/layout/Header'
import styles from './index.module.scss'

const Main: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles['layout-header']}>
        <Header />
      </div>
      <div className={styles['layout-content']}>
        <Content />
      </div>
    </div>
  )
}

export default Main
