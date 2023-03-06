/**
 * Create by lwcai
 * Description: index
 * Date: 2023-02-23
 */
import React, { ReactNode, useEffect, useState } from 'react'
import { Menu } from 'antd'
import { Outlet } from 'react-router-dom'

const Main: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [state, setState] = useState(1)

  useEffect(() => {
    setState(2)
  }, [])

  return (
    <>
      <div className="header">{`headers${state}`}</div>
      <div className="content">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          // items={items2}
        />
        <Outlet />
        {/* { children } */}
      </div>
    </>
  )
}

export default Main
