import { Input, Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons'

const Sidebar = () => {
    return (
        <div
            style={{
                height: '100%',
                padding: "4em",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div>
                <Avatar size={164} src="https://joeschmoe.io/api/v1/128" style={{ border: '1px solid rgba(0,0,0,0.1)' }} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ paddingTop: 12 }}>
                    <h1>Manzur Silviu-Raul</h1>
                </div>
                <div>
                    <Input placeholder="Type your address ..." />
                </div>
            </div>
            <div>
                <span>test</span>
            </div>
        </div>
    )
}

export default Sidebar