import { Input, Avatar, Radio, Button, Space, Upload, message } from "antd";
import { useState, useMemo } from "react";
import type { UploadProps } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { useRouter } from 'next/router'

const { Dragger } = Upload;

const SelectionVisualisation = () => {

    const router = useRouter()

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
            <div>
                <p style={{ fontSize: 18, paddingBottom: 0, marginBottom: 0, fontWeight: 200 }}>Dear <span style={{ fontWeight: 400 }}>Silviu-Raul</span>,</p>
                <p style={{ fontSize: 18, fontWeight: 200, paddingTop: 0 }}>This is the representation of your selection together with the solar panels.</p>
            </div>
            <div style={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <img src="/image_house.jpeg" style={{ objectFit: 'fill', width: '100%' }} />
            </div>
            <div style={{ flex: 1, justifyContent: 'flex-end', display: 'flex', flexDirection: 'column' }}>
                <Button onClick={() => router.push('/content/computations')} type="primary">NEW COMPUTING</Button>
            </div>
        </div>
    )
}

export default SelectionVisualisation