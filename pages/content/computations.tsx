import React, { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import { Breadcrumb, Button, Layout, Menu } from 'antd'
import { Footer } from 'antd/lib/layout/layout'
import { useRouter } from 'next/router'

import Map from '../../components/map'
import Sidebar from '../../components/sidebar'
import { calculateOptimumTilt } from '../../services/calculatePanelsInArea'

const { Header, Content, Sider } = Layout

const MapPage: NextPage = () => {
  const [location, setLocation] = useState<string>()
  const [drawing, setDrawing] = useState<any>()
  const [reset, setReset] = useState<boolean>(false)
  const [drawnMap, setDrawnMap] = useState<any>(undefined)
  const router = useRouter()

  const googlemap = useRef(null)

  const computeRectangle = (overlay: any) => {
    console.log(overlay.getBounds().toJSON())
  }

	const computePolygon = (overlay: any) => {
		overlay.getPath().forEach((path: any) => {
			console.log(path.toJSON())
		})
	}

	const handleClick = () => {
		if (drawing.type === 'polygon') {
			computePolygon(drawing.overlay)
		} else if (drawing.type === 'rectangle') {
			computeRectangle(drawing.overlay)
		}
		router.push('/content/results')
	}

	const handleReset = () => {
		setReset(!reset)
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
            <Map location={location} reset={reset} setDrawing={setDrawing}/>
          </Content>
          <Footer style={{ textAlign: 'right', backgroundColor: 'white', display: 'flex' }}>
          <Button type="primary" size="large" onClick={handleReset}>Reset drawing</Button>
          {drawnMap ?  <div id="map" ref={googlemap} /> : <div></div>}
          <div style={{flexGrow: 1}}></div>
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
