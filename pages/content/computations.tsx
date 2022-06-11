import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Breadcrumb, Button, Layout, Menu } from 'antd'
import { Footer } from 'antd/lib/layout/layout'
import { useRouter } from 'next/router'

import Map from '../../components/map'
import Sidebar from '../../components/sidebar'

const { Header, Content, Sider } = Layout

const MapPage: NextPage = () => {
  const [location, setLocation] = useState<string>()
  const router = useRouter()

  const handleClick = () => {
    router.push('/content/results')
  }

  return (
    <>
      <Layout style={{ minHeight: '100vh', padding: 24, backgroundColor: 'white' }}>
        <Sider
          width={400}
          style={{
            borderRadius: 12,
            backgroundColor: 'white',
            boxShadow: '0px 3px 26px -7px rgba(0, 70, 143, 0.5)'
          }}
        >
          <Sidebar onLocationChange={(location: string) => setLocation(location)} />
        </Sider>
        <Layout>
          <Content
            style={{
              paddingLeft: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff'
            }}
          >
            <Map location={location} />
          </Content>
          <Footer style={{ textAlign: 'right', backgroundColor: 'white' }}>
            <Button type="primary" size="large" onClick={handleClick}>
              {' '}
              Save{' '}
            </Button>
          </Footer>
        </Layout>
      </Layout>
    </>
  )
}

export default MapPage
