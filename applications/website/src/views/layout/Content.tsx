/**
 * Create by lwcai
 * Description: Content
 * Date: 2023-03-09
 */
import React, { useCallback, useMemo, useState } from 'react'
import { QrcodeOutlined, CodeTwoTone, PlayCircleTwoTone } from '@ant-design/icons'
import {
  Row, Col, Card, theme, Modal
} from 'antd'
import styles from './content.module.scss'

type WorkListType = Array<{
  key: string
  name: string,
  description: string
  logoUrl?: string
}>

const { Meta } = Card
const { useToken } = theme

const workList: WorkListType = [
  {
    key: 'scroll',
    name: '虚拟滚动',
    description: '',
    logoUrl: 'https://camo.githubusercontent.com/3b35e9ed29f25c06ce0a0af13bf50a96ed8fdd2556350ad09b35c185fa32cdc3/68747470733a2f2f647075627374617469632e7564616368652e636f6d2f7374617469632f64707562696d672f745f4c36764167512d452f6c6f676f2e737667'
  },
  {
    key: 'lazy_load',
    name: '图片懒加载',
    description: ''
  },
  {
    key: 'file_system',
    name: '文件服务',
    description: ''
  },
  {
    key: 'editor',
    name: '编辑器',
    description: ''
  },
  {
    key: 'chat',
    name: '聊天室',
    description: ''
  },
  {
    key: 'buy',
    name: '购物车',
    description: ''
  },
  {
    key: 'video',
    name: '视频播放',
    description: ''
  },
]

const Content: React.FC = () => {
  const { token } = useToken()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalConfig, setModalConfig] = useState({
    title: ''
  })

  const onClickPlay = useCallback((key: string) => {
    setIsModalOpen(true)
  }, [])

  return (
    <>
      <Row className={styles['work-collection']} justify="center">
        <Col sm={20} xs={20}>
          <Row
            gutter={[16, 16]}
            className={styles['work-list']}
          >
            {
              workList.map(({
                key, name, description, logoUrl
              }) => (
                <Col xxl={4} xl={6} md={8} sm={12} xs={24} key={key}>
                  <Card
                    hoverable
                    cover={(
                      <img
                        style={{ width: '100%', height: 120, objectFit: 'contain' }}
                        src={logoUrl || 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
                        alt=""
                      />
                    )}
                    actions={[
                      <PlayCircleTwoTone style={{ fontSize: 18 }} twoToneColor={token.colorPrimary} onClick={() => onClickPlay(key)} />,
                      <QrcodeOutlined style={{ fontSize: 18 }} twoToneColor={token.colorPrimary} />,
                      <CodeTwoTone style={{ fontSize: 18 }} twoToneColor="#1890ff" />
                    ]}
                  >
                    <Meta title={name} description={description || 'www.lwcai.cn'} />
                  </Card>
                  {/* <div className={styles['work-list-item']}> */}
                  {/*   <div className={styles.logo}>{name.split('')[0]}</div> */}
                  {/*   <div className={styles.name}> */}
                  {/*     {name} */}
                  {/*   </div> */}
                  {/* </div> */}
                </Col>
              ))
            }
          </Row>
        </Col>
      </Row>
      <Modal open={isModalOpen} closable={false} maskClosable>
        123
      </Modal>
    </>

  )
}

export default Content
