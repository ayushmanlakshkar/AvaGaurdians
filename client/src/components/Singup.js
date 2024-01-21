import React, { useState } from 'react'
import { useLogin, useOTP } from '../store'
// import Otp from './Otp'
import axios from 'axios'
import { BASE_URL_BACKEND } from '../service/Api'
import { useToast, useAuthentication } from '../store'
import { useUser } from '../store'


function Singup() {
    const { status, toggleLogin } = useLogin()
    const [contact, setContact] = useState()
    const [password, setPassword] = useState()
    const [confirmpassword, setConfirmPassword] = useState()

    const { toggleAuthentication } = useAuthentication()
    const { setToast } = useToast()
    const { setUser } = useUser()

    // const{otp_status,toggleOTP}=useOTP()
    const handleSignup = async () => {
        await axios.post(`${BASE_URL_BACKEND}auth/signup`, { contact, password, confirmpassword }).then((response) => {
            setToast({ message: response.data.message, type: true })
            setUser(contact)
            toggleAuthentication()
        }).catch(err => {
            setToast({ message: err.response.data, type: false })
        })
    }

    return (
        <div className="center-center">
            {/* {!otp_status? */}
            <div className="form">
                <p className="form-title">Create an Account</p>
                <div className="input-container">
                    <input placeholder="Phone Number" value={contact} onChange={(e) => { setContact(e.target.value) }} type="text" />
                </div>
                <div className="input-container">
                    <input placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" />
                </div>
                <div className="input-container">
                    <input placeholder="Confirm password" value={confirmpassword} onChange={(e) => { setConfirmPassword(e.target.value) }} type="password" />
                </div>
                <button className="submit-signin"
                    // onClick={()=>toggleOTP()}
                    onClick={handleSignup}
                >
                    Sign up
                </button>
                <p className="signup-link">
                    Already have an account?
                    <span id='singup_togo' onClick={toggleLogin}>  Sing In</span>
                </p>
            </div>
            {/*  :<Otp/>}  */}
        </div>
    )
}

export default Singup
