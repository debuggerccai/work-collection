/**
 * Create by lwcai
 * Description: index
 * Date: 2023-02-22
 */
import React from 'react'
import { useRoutes } from 'react-router-dom'

import Main from 'src/views/layout'
import { User, Login, Register } from 'src/views/user'

const RenderRoutes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Main />,
      children: [
        {
        }
      ]
    },
    {
      path: '/user',
      element: <User />,
      children: [
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        }
      ]
    }
  ])

  return element
}

// const renderRoutes = () => hot(() => fullRoutes())
export default RenderRoutes
