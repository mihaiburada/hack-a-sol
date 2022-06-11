import React, { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import { Breadcrumb, Button, Layout, Menu } from 'antd'
import { Footer } from 'antd/lib/layout/layout'
import { useRouter } from 'next/router'
import { getAreaOfPolygon } from 'geolib'

import Map from '../../components/map'
import Sidebar from '../../components/sidebar'
import { calculateOptimumTilt } from '../../services/calculatePanelsInArea'

const { Header, Content, Sider } = Layout

const MapPage: NextPage = () => {
	const [location, setLocation] = useState<string>()
	const [drawing, setDrawing] = useState<any>()
	const [reset, setReset] = useState<boolean>(false)
	const [drawnMap, setDrawnMap] = useState<any>(undefined)
	const [disableSave, setDisableSave] = useState<boolean>(true)
	const router = useRouter()

	const googlemap = useRef(null)

	const polyArea = (points: { lat: number; lng: number }[]) => {
		var i = 0,
			area = 0,
			len = points.length
		while (i < len) {
			const p1 = points[i++]
			const p2 = points[i % len]
			area += Math.abs(Math.abs(p1.lng * p2.lat) - Math.abs(p1.lat * p2.lng))

		}
		return Math.abs(0.5 * area)
	}

	const computeRectangle = (overlay: any) => {
		const points: { lat: number; lng: number }[] = []

		const res = overlay.getBounds()
		points.push({ lat: res.Ab.h, lng: res.Ab.j })
		points.push({ lat: res.Ua.h, lng: res.Ua.j })
		points.push({ lat: res.Ab.h, lng: res.Ua.j })
		points.push({ lat: res.Ua.h, lng: res.Ab.j })
		localStorage.removeItem('points')
		localStorage.setItem('points', JSON.stringify(points))
		localStorage.setItem('area', String((getAreaOfPolygon(points))))
	}

	const computePolygon = (overlay: any) => {
		const points: { lat: number; lng: number }[] = []
		overlay.getPath().forEach((path: any) => {
			points.push({
				lat: path.lat(),
				lng: path.lng()
			})
		})
		console.log(polyArea(points))
		localStorage.removeItem('points')
		localStorage.removeItem('area')
		localStorage.setItem('points', JSON.stringify(points))
		localStorage.setItem('area', String((getAreaOfPolygon(points))))
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

	useEffect(() => {
		setDisableSave(true)
	}, [reset])

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
						<Map location={location} reset={reset} setDrawing={setDrawing} setDisableSave={setDisableSave} />
					</Content>
					<Footer style={{ textAlign: 'right', backgroundColor: 'white', display: 'flex' }}>
						<Button type="primary" style={{ position: 'relative', left: -25 }} onClick={handleReset}>Reset drawing</Button>
						{drawnMap ? <div id="map" ref={googlemap} /> : <div></div>}
						<div style={{ flexGrow: 1 }}></div>
						<Button style={{ position: 'relative', left: 50 }} type="primary" onClick={handleClick} disabled={disableSave}>
							{' '}
							Process{' '}
						</Button>
					</Footer>
				</Layout>
			</Layout>
		</>
	)
}

export default MapPage
