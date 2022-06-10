import { NextPage } from "next";
import { Breadcrumb, Button, Layout, Menu } from "antd";
import { Footer } from "antd/lib/layout/layout";
import { useRouter } from 'next/router'

import Map from '../../components/map'
import Sidebar from '../../components/sidebar'

const { Header, Content, Sider } = Layout;

const MapPage: NextPage = () => {

  const router = useRouter()

  const handleClick = () => {
    router.push("/content/results")
  }

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={200}>
          <Sidebar />
        </Sider>
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff'
            }}
          >
            <Map />
          </Content>
          <Footer style={{ textAlign: 'right' }}>
            <Button type="primary" size="large" onClick={handleClick}> Save </Button>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default MapPage;
