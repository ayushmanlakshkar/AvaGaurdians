import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL_BACKEND } from '../service/Api'
import { useStatistics, useProbability } from '../store'
import { useToast } from '../store'

function Content() {
    const [input, setInput] = useState("")
    const [cities, setCities] = useState([])
    const { temperature,
        wind_direction,
        wind_speed,
        humidity,
        precipitation,
        latitude,longitude, setStatistics } = useStatistics()
    const { probability, setProbability } = useProbability()
    const [precautions, setPrecautions] = useState([])
    const [ color, setColor ] = useState("")
    const { setToast } = useToast()

    const handleGetreport = async () => {
        await axios.post(`${BASE_URL_BACKEND}home/get_report`, { city: input }).then((response) => {
            console.log(response.data)
            setStatistics(response.data)
            setProbability(response.data.probability)
        }).catch(err => {
            setToast({ message: err.data, type: false })
        })
    }

    const handleCities = async (e) => {
        setInput(e.target.value)
        await axios.post(`${BASE_URL_BACKEND}home/get_cities`, { input: e.target.value }).then((response) => {
            setCities(response.data.cities)
        }).catch((err) => {
            setToast({message:err.response.data,type:false})
        })

        if (e.target.value == "") {
            setCities([])
        }
    }

    useEffect(() => {
        if (probability >= 60) {
            setPrecautions(["Always carry essential avalanche safety equipment, including an avalanche transceiver, probe, and shovel, to facilitate a rapid response in the event of an avalanche.", "Travel with experienced and knowledgeable companions, and ensure everyone in the group is equipped with proper safety gear. This enhances the ability to assist each other in case of an emergency.", "Inform someone reliable about your travel plans, including your route and expected return time, so that help can be summoned if needed.", "Exercise caution and conservative decision-making in unfamiliar or challenging terrain, prioritizing safety over objectives."])
            setColor("red-panel")
        } else if (probability >= 30) {
            setPrecautions(["Choose routes that minimize exposure to potential avalanche-prone areas, sticking to safer, well-traveled paths.", "Steer clear of cornices, as these overhanging snow formations can pose a risk, even in areas with a generally low avalanche hazard.", "If possible, travel with companions. Group travel enhances safety through mutual assistance and shared decision-making."])
            setColor("yellow-panel")
        } else {
            setColor("green-panel")
            setPrecautions(["There is very less chances of Avalanche stay safe tho :)"])
        }
    }, [probability])

    return (
        <div className='content-page'>
            <div className="container-fluid padup">
                <div className="row">
                    <div className="d-flex" role="search">
                        <input className="form-control me-2" type="search" value={input}
                            id='search-input' placeholder="Search" aria-label="Search" onChange={handleCities} />
                        <button className="btn btn-outline-success" onClick={handleGetreport}>Search</button>
                    </div>
                </div>
            </div>
            <div className={`cities ${cities.length > 0 ? <></> : "hidden"}`}>
                {cities.map((city) => <div key={city} onClick={() => { setInput(city.city) }}>{city.city}</div>)}
            </div>

            {/* <div id="map-margin" className=" bg-body-tertiary">
                <div
                    className="position-relative overflow-hidden p-3 p-md-5 text-center ">
                    <div className="col-md-6 p-lg-5">

                    </div>
                    <div className="product-device shadow-sm d-none d-md-block"></div>
                    <div
                        className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                </div>
            </div> */}
            <div className="container">
                <div className="container text-center">
                    <div className="row">
                        <div id="alert-box" className={`col ${color}`}>
                            <h2>Details</h2><hr />
                            <div id="container-alert-caution" className="container-fluid">
                                <div className="container text-center">
                                    <div id="alert-box-prop"
                                        className="row alert-container">
                                        <div className="col box-prop">
                                            Wind-Direction<hr />
                                            {wind_direction}
                                        </div>
                                        <div className="col box-prop">
                                            Wind-Speed<hr />
                                            {wind_speed && `${wind_speed} Km/h`}

                                        </div>
                                        <div className="col box-prop">
                                            Temperature<hr />
                                            {temperature && `${temperature} C`}

                                        </div>
                                        <div className="col box-prop">
                                            Humidity<hr />
                                            {humidity && `${humidity} %`}
                                        </div>
                                        <div className="col box-prop">
                                            Precipitation<hr />
                                            {precipitation && `${precipitation} %`}
                                        </div>
                                        <div className="col box-prop">
                                            Co-Ordinates<hr /> Latitude : {latitude}<br></br>
                                            Longitude : {longitude}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="caution-box" className={`col ${color}`}>
                            <h2>Alerts</h2><hr style={{ margin: "0px" }} />
                            <div className="container-fluid probability-container">
                                <div className="container text-center probability-container">
                                    <div className="row ">
                                        <p id='percentage'>{!probability ? "Search for a city" : `${probability} %`} </p>
                                        {/* <p id='percentage'>0 %</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div id="precaution-box-outside" className="container-fluid">
                <div id="precaution-box" className={`col ${color}`}>
                    <h2>Precautions</h2><hr />
                    <ul style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                        {precautions.map(precaution => <li style={{ margin: "9px 0px" }}>{precaution}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Content
