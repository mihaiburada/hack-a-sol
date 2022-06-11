import { message, Statistic, Input, Slider, Button, Tabs, Col, InputNumber, Row } from 'antd'
import { useEffect, useState } from 'react'
import { SettingOutlined } from '@ant-design/icons'
import { getPanels } from '../services/panels'
import { useRouter } from 'next/router'

const objectMap = (obj: any, fn: any) =>
    Object.fromEntries(
        Object.entries(obj).map(
            ([k, v], i) => [k, fn(v, k, i)]
        )
    )

const energyTest: EnergyGeneration = {
    kwh: 1000,
    percentages: {
        cycleGasTurbine: 0,
        oil: 0,
        coal: 0,
        nuclear: 0,
        pumpedStorage: 0,
        nonPumpedStorageHydro: 0,
        windOnShore: 50,
        windOfShore: 40,
        solar: 10
    }
}

export interface EnergySourcesPercentage {
    cycleGasTurbine: number,
    oil: number,
    coal: number,
    nuclear: number,
    pumpedStorage: number,
    nonPumpedStorageHydro: number,
    windOnShore: number,
    windOfShore: number,
    solar: number
}

export interface EnergyGeneration {
    kwh: number,
    percentages: EnergySourcesPercentage
}
const { TabPane } = Tabs;

const Statistics = () => {

    const router = useRouter()

    const [panels, setPanels] = useState()
    const [anualCons, setAnualCons] = useState('1')
    const [reserverdSpace, setReservedSpace] = useState('0')
    const [angle, setAngle] = useState(0)
    const [activeTab, setActiveTab] = useState('now')
    const [activeTabConf, setActiveTabConf] = useState('general')
    const [co2Options, setCo2Options] = useState({
        'Coal': '22',
        'Oil': '1',
        'Cycle Gas Turbine': '16',
        'Nuclear': '21',
        'PS': '0',
        'NPS Hydro': '26',
        'Wind Onshore': '12',
        'Wind Offshore': '0',
        'Solar': '2'
    })

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

    const computeCarbonFootprint = (energyGeneration: EnergyGeneration, carsOrTrees?: 'cars' | 'trees') => {
        let sum = 0;
        let carbonFootprint = 0;
        objectMap(energyGeneration.percentages, (percent: any) => sum += percent)
        if (sum !== 100) {
            return 0
        } else {
            Object.keys(energyGeneration.percentages).map(function (key, index) {
                if (key === "cycleGasTurbine") {
                    carbonFootprint += 0.5 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "oil") {
                    carbonFootprint += 0.65 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "coal") {
                    carbonFootprint += 0.9 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "nuclear") {
                    carbonFootprint += 0.005 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "pumpedStorage") {
                    carbonFootprint += 0.02 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "nonPumpedStorageHydro") {
                    carbonFootprint += 0.005 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "windOnShore") {
                    carbonFootprint += 0.004 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "windOfShore") {
                    carbonFootprint += 0.005 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
                if (key === "solar") {
                    carbonFootprint += 0.058 * ((energyGeneration.percentages[key] * energyGeneration.kwh) / 100)
                }
            });

            if(carsOrTrees === 'cars'){
               return Number((carbonFootprint / 1000) / 4.6).toFixed(1)
            }else if(carsOrTrees === 'trees'){
                return Number((carbonFootprint / 1000) / 0.2).toFixed(0)
            }else{
                return Number(carbonFootprint / 1000).toFixed(2)
            }
    }
    }

    const handleOnTabChange = (key: string) => setActiveTab(key)

    const handleOnTabConfChange = (key: string) => {
        setActiveTabConf(key)
    }

    const getPanelNumbers = (coordinates: any) => {
        return 30
    }

    const onSliderCo2Change = (value: any, key: string) => {
        const co2OptionsCopy: any = { ...co2Options } as any
        (co2OptionsCopy as any)[key] = String(value)
        const sum: any = Object.values(co2OptionsCopy).reduce((cur: any, acc: any) => Number(cur) + Number(acc), 0)
        if (sum > 100) {
            return
        }
        setCo2Options(co2OptionsCopy)
    }

    const mapCo2Configuration = () => {
        const energyTest: EnergyGeneration = {
            kwh: Number(anualCons),
            percentages: {
                cycleGasTurbine: Number(co2Options['Cycle Gas Turbine']),
                oil: Number(co2Options['Oil']),
                coal: Number(co2Options['Coal']),
                nuclear: Number(co2Options['Nuclear']),
                pumpedStorage: Number(co2Options['PS']),
                nonPumpedStorageHydro: Number(co2Options['NPS Hydro']),
                windOnShore: Number(co2Options['Wind Onshore']),
                windOfShore: Number(co2Options['Wind Offshore']),
                solar: Number(co2Options['Solar']),
            }
        }

        return energyTest

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
                height: activeTabConf === 'general' ? 300 : 500,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <SettingOutlined style={{ paddingRight: 6, fontSize: 18 }} />
                    <h3 style={{ marginBottom: 4, paddingBottom: 0 }}>Configuration</h3>
                </div>
                <p style={{ padding: 0, margin: 0, fontWeight: 200 }}>You can configure information about something, idk what.</p>
                <Tabs defaultActiveKey={activeTab} onChange={handleOnTabConfChange}>
                    <TabPane tab="General" key="general">
                    </TabPane>
                    <TabPane tab="CO2" key="co2">
                    </TabPane>
                </Tabs>
                {activeTabConf === 'general' ? <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <div style={{ flex: 1, paddingRight: 24 }}>
                        <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                            <span>Anual Consumption (KWh)</span>
                        </div>
                        <Input type="number" value={anualCons} onChange={e => setAnualCons(e.target.value)} style={{ minWidth: 270 }} placeholder="Type your anual consumption ..." />
                    </div>
                    <div style={{ flex: 1, paddingRight: 24 }}>
                        <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                            <span>Reserved Space (%)</span>
                        </div>
                        <Input type="number" value={reserverdSpace} onChange={e => setReservedSpace(e.target.value)} style={{ minWidth: 270 }} placeholder="Type your reserved space ..." />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                            <span>Panel Angle</span>
                        </div>
                        <Slider onChange={(value) => setAngle(value)} defaultValue={angle} />
                    </div>
                </div> :
                    <div style={{ display: 'flex', flexDirection: 'row', height: '100%', justifyContent: 'center' }}>
                        {Object.keys(co2Options).map((key: string) => {
                            return (
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
                                    <div style={{ flex: 1 }}>
                                        <Slider
                                            vertical
                                            min={0}
                                            max={100}
                                            value={Number((co2Options as any)[key])}
                                            onChange={(value) => onSliderCo2Change(value, key)}
                                        />
                                    </div>
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <InputNumber
                                            min={0}
                                            max={100}
                                            value={(co2Options as any)[key]}
                                            onChange={(value) => onSliderCo2Change(value, key)}
                                        />
                                        <div style={{ paddingTop: 6 }}>
                                            <span style={{ fontSize: 12 }}>{key}</span>

                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                }
            </div>
            <div style={{
                borderRadius: 12,
                backgroundColor: 'white',
                boxShadow: '0px 3px 26px -7px rgba(0, 70, 143, 0.5)',
                height: `calc(100% - ${activeTabConf === 'general' ? 300 : 500}px)`,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                marginTop: 24
            }}>
                <Tabs defaultActiveKey={activeTab} onChange={handleOnTabChange}>
                    <TabPane tab="Right Now" key="now">
                    </TabPane>
                    <TabPane tab="Current Year" key="current">
                    </TabPane>
                    <TabPane tab="Last year" key="last">
                    </TabPane>
                </Tabs>
                <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 6 }}>
                    <div style={{ flex: 1 }}>
                        <Statistic title="Saved Amount / Year" value={'$ 350'} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <Statistic title="Panels Number" value={getPanelNumbers([])} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <Statistic title="Panels Cost" value={'$ 500'} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <Statistic title="Recover Money In" value={'2 Years'} />
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 56 }}>
                    <h3 style={{ marginBottom: 0, paddingBottom: 0 }}>Potential Impact</h3>
                    <p style={{ padding: 0, margin: 0, fontWeight: 200 }}>If all the viable solar installations were implemented, the amount of avoided
                        CO2 emissions from the electricity sector in the country would be:</p>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', flex: 1 }}>
                            <img src="/co2icon.jpeg" style={{ objectFit: 'fill' }} height={65} />
                            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 24 }}>
                                <span style={{ fontWeight: 200 }}>Carbon Dioxide</span>
                                <span style={{ fontSize: 26 }}>{computeCarbonFootprint(mapCo2Configuration())}M</span>
                                <span style={{ fontWeight: 200 }}>metric tone</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <span style={{ fontSize: 42 }}>=</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', flex: 1 }}>
                            <img src="/caricon.png" style={{ objectFit: 'fill' }} height={65} />
                            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 24 }}>
                                <span style={{ fontWeight: 200 }}>Passenger cars</span>
                                <span style={{ fontSize: 26 }}>{computeCarbonFootprint(mapCo2Configuration(),'cars')}</span>
                                <span style={{ fontWeight: 200 }}>taken off the road</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <span style={{ fontSize: 42 }}>=</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', flex: 1 }}>
                            <img src="/treeicon.png" style={{ objectFit: 'fill' }} height={65} />
                            <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 24 }}>
                                <span style={{ fontWeight: 200 }}>Tree seedlings</span>
                                <span style={{ fontSize: 26 }}>{computeCarbonFootprint(mapCo2Configuration(),'trees')}</span>
                                <span style={{ fontWeight: 200 }}>grown for 10 yrs</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 56 }}>
                    <h3 style={{ marginBottom: 0, paddingBottom: 0 }}>Ask for Offer</h3>
                    <p style={{ padding: 0, margin: 0, fontWeight: 200 }}>If you consider that our results will help you and also the entire world you can ask for an offer.</p>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 6, alignItems: 'center', flex: 1 }}>
                            <img id="img-transform" src="/company1.png" style={{ objectFit: 'fill', cursor: 'pointer' }} height={200} />

                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <img id="img-transform" src="/company2.jpeg" style={{ objectFit: 'fill', cursor: 'pointer' }} height={200} />

                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 24, alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                            <img id="img-transform" src="/company3.jpeg" style={{ objectFit: 'fill', cursor: 'pointer' }} height={200} />

                        </div>
                    </div>
                </div>
                <div style={{ flex: 1, alignItems: 'center', display: 'flex', marginTop: 12 }}>
                    <Button onClick={() => router.push("/content/computations")} type="primary">BACK</Button>
                </div>
            </div>
        </div>
    )
}

export default Statistics