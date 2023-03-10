import React from 'react'
import { ConfigProvider } from 'antd'
import { createBrowserHistory } from 'history'
import { createRoot } from 'react-dom/client'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import RenderRoutes from 'src/routes'
import { m } from './memory'
import reportWebVitals from './reportWebVitals'
import './static/css/index.scss'

const history = createBrowserHistory()

// 缓存信息
m.set('history', history)

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
const render = () => {
  root.render(
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#722ED1',
        colorSuccess: '#722ED1',
        colorWarning: '#FAAD14',
        colorInfo: '#722ED1',
        colorText: '#000',
        fontSize: 14
      }
    }}
    >
      <BrowserRouter>
        <AppContainer>
          <RenderRoutes />
        </AppContainer>
      </BrowserRouter>
    </ConfigProvider>
  )
}

render()

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept('./routes/index.tsx', () => {
    console.log('module.hot')
    render()
  })
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
