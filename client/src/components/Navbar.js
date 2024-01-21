import React, { useState, useEffect } from 'react';
import { BASE_URL_BACKEND } from '../service/Api';
import { useUser,usePage } from '../store';
import { useStatistics,useAuthentication,useProbability } from '../store'
import { useToast } from '../store'
import axios from 'axios'

function Navbar() {
    const [collapse, setCollapse] = useState(false);
    const { contact } = useUser()
const {page,changePage} = usePage();
const { setStatistics }= useStatistics()
const{toggleAuthentication} = useAuthentication()
const {setProbability} = useProbability()
const {setToast}=useToast()

const toggleNavbar = () => {
    setCollapse(!collapse);
};

const handleLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          await axios.post(`${BASE_URL_BACKEND}home/get_report`, {latitude,longitude}).then((response) => {
            setStatistics(response.data)
            setProbability(response.data.probability)

        }).catch(err => {
            setToast({message:err.message,type:false})
        })
        },
        (error) => {
          setToast({message:error.message,type:false})
        }
      );
    } else {setToast({message:"Geolocation is not supported",type:false})
    }
  };


    useEffect(() => {
        const handleResize = () => {
            setCollapse(window.innerWidth < 991);
        };
        handleResize(); // Set initial state based on window width
    }, []);


    return (
        <header>
            <nav className="my-navbar navbar navbar-expand-lg">
                <div id="product">
                    <div id="product-logo">
                        <img src={`${BASE_URL_BACKEND}images/logo.png`} alt="Avagaurdian" />
                    </div>
                    <span id="product-name">AvaGaurdian</span>
                </div>
                <div id="navbar-options" className="container-fluid ">
                    <a className="navbar-brand" href="#"> </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded={!collapse}
                        aria-label="Toggle navigation"
                        onClick={toggleNavbar}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`${collapse ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-itemss">
                            <li className={`nav-item ${page==="home"?"front":""}`} onClick={()=>{changePage("home")}}>
                                Home
                            </li>
                            <li className={`nav-item ${page==="about"?"front":""}`}onClick={()=>{changePage("about")}}>
                                About
                            </li>
                            {/* <li className={`nav-item ${page==="contact"?"front":""}`} onClick={()=>{changePage("contact")}}>
                                Contact Us
                            </li> */}
                            {contact ?
                                <li id="getLocationButton" className="nav-item" onClick={handleLocation}>
                                    Location
                                </li> : <li className="nav-item" onClick={toggleAuthentication}>
                                    Sing In
                                </li>}

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
