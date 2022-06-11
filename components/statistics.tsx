import { message, Statistic, Input, Slider, Button } from 'antd'
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

const Statistics = () => {

    const router = useRouter()

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

    const computeKWh = ( energyGeneration: EnergyGeneration ) => {
        let sum = 0;
        let carbonFootprint = 0;
        objectMap(energyGeneration.percentages, (percent: any) => sum += percent)
        if(sum !== 100){
            message.error("Percentage doesn't match 100% value")
            return "Error"
        }else{
            Object.keys(energyGeneration.percentages).map(function(key, index) {
                if(key === "cycleGasTurbine"){
                    carbonFootprint += 0.5 * ( (energyGeneration.percentages[key] * energyGeneration.kwh) / 100 )
                }
                if(key === "oil"){
                    carbonFootprint += 0.65  * ( (energyGeneration.percentages[key] * energyGeneration.kwh) /100 )
                }
                if(key === "coal"){
                    carbonFootprint += 0.9  * ( (energyGeneration.percentages[key] * energyGeneration.kwh) / 100 )
                }
                if(key === "nuclear"){
                    carbonFootprint += 0.005  * ( (energyGeneration.percentages[key] * energyGeneration.kwh) / 100 )
                }
                if(key === "pumpedStorage"){
                    carbonFootprint += 0.02  * ( (energyGeneration.percentages[key] * energyGeneration.kwh) / 100 )
                }
                if(key === "nonPumpedStorageHydro"){
                    carbonFootprint +=  0.005 * ( (energyGeneration.percentages[key] * energyGeneration.kwh) / 100 )
                }
                if(key === "windOnShore"){
                    carbonFootprint +=  0.004 * ( (energyGeneration.percentages[key] * energyGeneration.kwh) / 100 )
                }
                if(key === "windOfShore"){
                    carbonFootprint += 0.005  * ( (energyGeneration.percentages[key] * energyGeneration.kwh) / 100 )
                }
                if(key === "solar"){
                    carbonFootprint += 0.058  * ( (energyGeneration.percentages[key] * energyGeneration.kwh) / 100 )
                }
          });
          return carbonFootprint
        }

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
                height: 250,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <SettingOutlined style={{ paddingRight: 6, fontSize: 18}} />
                    <h3 style={{ marginBottom: 4, paddingBottom: 0 }}>Configuration</h3>
                </div>
                <p style={{ padding: 0, margin: 0, fontWeight: 200 }}>You can configure information about something, idk what.</p>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <div style={{ flex: 1, paddingRight: 24 }}>
                        <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                            <span>Anual Consumption (KW)</span>
                        </div>
                        <Input style={{ minWidth: 270 }} placeholder="Type your anual consumption ..." />
                    </div>
                    <div style={{ flex: 1, paddingRight: 24 }}>
                        <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                            <span>Reserved Space (%)</span>
                        </div>
                        <Input type="number" style={{ minWidth: 270 }} placeholder="Type your reserved space ..." />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ paddingBottom: 6, fontWeight: 200 }}>
                            <span>Panel Angle</span>
                        </div>
                        <Slider defaultValue={30} />
                    </div>
                </div>
            </div>
            <div style={{
                borderRadius: 12,
                backgroundColor: 'white',
                boxShadow: '0px 3px 26px -7px rgba(0, 70, 143, 0.5)',
                height: 'calc(100% - 250px)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                marginTop: 24
            }}>
                <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 6 }}>
                    <div style={{ flex: 1 }}>
                        <Statistic title="Saved Amount / Year" value={'$ 350'} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <Statistic title="Panel Cost" value={'$ 500'} />
                         <Statistic title="Carbon footprint" value={computeKWh(energyTest)} />
                         kg CO2
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
                                <span style={{ fontSize: 26 }}>2.3M</span>
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
                                <span style={{ fontSize: 26 }}>0.7M</span>
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
                                <span style={{ fontSize: 26 }}>7.2M</span>
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