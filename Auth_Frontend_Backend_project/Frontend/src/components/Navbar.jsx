import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.jpg"
import { NavLink, Link } from 'react-router-dom'
import axios from "axios"
import AxiosApi from './api/AxiosApi'

const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/detail", label: "Details" },
]
const Navbar = () => {

    const [responseMsg, setResponseMsg] = useState('')
    const [isVerified, setIsVerified] = useState(false)
    useEffect(() => {
        async function getMe() {
            try {
                const res = await AxiosApi.get("/auth/getMe", {
                })
                console.log(res.data);
                await setIsVerified(res.data.User.verified)
                console.log(isVerified);
            }
            catch (err) {
                if (err.response) {
                    setResponseMsg(err.response.data.message || "Something went wrong")
                    console.log(err.response.data.message)
                }
                else if (err.request) {
                    setResponseMsg("Response not send by the server")
                    console.log("Response not send by the server")
                }
                else {
                    setResponseMsg("Server Side Error,Try again later")
                    console.log("Server Side Error,Try again later")
                }
            }
        }
        getMe()
    }, [])

    const logoutMe = async () => {
        try {
            const res = await AxiosApi.get('/auth/logout')
            console.log(res.data);
        }
        catch (err) {
            if(err.response){
                setResponseMsg(err.response.data.message || "Something went wrong")
            }
            else if(err.request){
                setResponseMsg("server did not send any response")
            }
            else{
                setResponseMsg("server side error")
            }
        }
    }

    const baseLiStyle = 'p-1 rounded-md duration-500 cursor-pointer hover:bg-green-400 hover:text-white';
    const activeStyle = 'bg-green-400 text-white';
    return (
        <nav className='px-10 py-4 bg-amber-50 flex justify-between items-center'>

            {/* logo / directs to the home page */}
            <Link to="/" className='w-18 h-18~ flex justify-center items-center'>
                <img src={logo} alt="Security Logo" />
            </Link>

            <ul className='flex gap-5'>
                {navLinks.map((ele) => (
                    <li key={ele.to}>
                        <NavLink to={ele.to} className={({ isActive }) => `${baseLiStyle} ${isActive ? activeStyle : ''}`}>
                            {ele.label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            {isVerified ? (
                <button onClick={logoutMe}
                    className='bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded-md cursor-pointer'
                >
                    Logout
                </button>
            ) : (
                <div className='flex gap-2'>
                    <Link
                        to="/signup"
                        className='bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded-md cursor-pointer'
                    >
                        Sign Up
                    </Link>
                    <Link
                        to="/login"
                        className='bg-green-400 hover:bg-green-600 text-white px-2 py-1 rounded-md cursor-pointer'
                    >
                        Login
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar
