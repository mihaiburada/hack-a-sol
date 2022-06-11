import { NextPage } from "next"
import { Layout } from "antd"

import Visualisation from '../../components/selectionVisualisation'
import Statistics from "../../components/statistics"
import { useState } from "react"

const { Sider } = Layout

const ResultsPage: NextPage = () => {

  return (
    <Layout style={{ minHeight: "100vh", padding: 24, backgroundColor: 'white', display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 1 }}>
        <Statistics />
      </div>
      <Sider width={400} style={{
        borderRadius: 12,
        backgroundColor: 'white',
        boxShadow: '0px 3px 26px -7px rgba(0, 70, 143, 0.5)'
      }}>
        <Visualisation />
      </Sider>
    </Layout>
  )
}

export default ResultsPage