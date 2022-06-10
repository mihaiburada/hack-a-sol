import { Input, Avatar, Radio, Button, Space, Upload, message } from "antd";
import { useState, useMemo } from "react";
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const Sidebar = () => {

    const [type, setType] = useState('maps')

    const props: UploadProps = {
        name: 'file',
        multiple: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const renderUploadPDF = useMemo(() => {
        return (
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to upload</p>
                <p className="ant-upload-hint">
                    In order to upload your PDF you have to drag your file here
                </p>
            </Dragger>
        )
    }, [])

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                padding: "1.5rem 4rem",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div>
                <Avatar size={164} src="https://joeschmoe.io/api/v1/128" />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ paddingTop: 24 }}>
                    <p style={{ fontSize: 16, padding: 0, margin: 0, fontWeight: 200 }}>Welcome, </p>
                    <p style={{ fontSize: 24, padding: '0px 0px 24px 0px', margin: 0, fontWeight: 500, color: '#1890ff', letterSpacing: 2 }}>Manzur Silviu-Raul </p>
                </div>
                <div style={{ width: '100%' }}>
                    <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                        <span>Address</span>
                    </div>
                    <Input placeholder="Type your address ..." />
                </div>
                <div style={{ width: '100%', paddingTop: 28 }}>
                    <div>
                        <p style={{ fontWeight: 200 }}>Selection Type</p>
                    </div>
                    <Radio.Group onChange={e => setType(e.target.value)} value={type}>
                        <Space direction="vertical">
                            <Radio value={'maps'}>Google Maps</Radio>
                            <Radio value={'pdfs'}>Upload PDF</Radio>
                        </Space>
                    </Radio.Group>
                </div>
                {type === 'pdfs' && <div style={{ paddingTop: 24, width: '100%' }}>
                    {renderUploadPDF}
                </div>}
            </div>
            <div style={{ width: '100%' }}>
                <Button onClick={() => message.info('You are leaving, sorry dude!')} style={{ width: '100%' }} type="primary">Leave</Button>
            </div>
        </div>
    )
}

export default Sidebar