import { SmileOutlined } from '@ant-design/icons';
import { Result } from 'antd';



const SelectionVisualisation = () => {


    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: "1.5rem 4rem",
                flex: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div >
                <Result
                    icon={<SmileOutlined />}
                    title="Great, we have done all the operations!"
                    extra={<p style={{ margin: 0, padding: 0, position: 'relative', top: -20, fontSize: 18, fontWeight: 200 }}>The following image represents your selection together with panels.</p>}
                />
            </div>
            <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <img src="/image_house.jpeg" style={{ objectFit: 'fill', width: '100%' }} />
            </div>
        </div>
    )
}

export default SelectionVisualisation