import { message, Statistic } from 'antd'
import { useEffect, useState } from 'react'
import { getPanels } from '../services/panels'

const Statistics = () => {

    const [panels, setPanels] = useState()

    useEffect(() => {
        handleGetPanels()
    }, [])

    const handleGetPanels = async () => {
        const panels = await getPanels()
        if (!panels) {
            return message.error("We are not able to receive panels")
        }

        setPanels(panels)
    }

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                paddingRight: '2rem',
                flex: 1,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div style={{
                borderRadius: 12,
                backgroundColor: 'white',
                boxShadow: '0px 3px 26px -7px rgba(0, 70, 143, 0.5)',
                height: 200,
                padding: '1rem'
            }}>
                <h3 style={{ marginBottom: 0, paddingBottom: 0 }}>Configuration</h3>
                <p style={{ padding: 0, margin: 0, fontWeight: 200 }}>You can configure information about something, idk what.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: 1 }}>
                    <Statistic title="Saved Amount / Year" value={'$350'} />
                </div>
                <div style={{ flex: 1 }}>
                    <Statistic title="Panel Cost" value={'$500'} />
                </div>
            </div>
        </div>
    )
}

export default Statistics