import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import logo from "../assets/test.jpg"
import axios from "axios"

const Navbar = () => {
    const navItems = [
        { item: "Home", route: "/" },
        { item: "Contact", route: "/contact" },
        { item: "About", route: "/about" },
        { item: "Detail", route: "/detail" }
    ]
    const baseStyle = "rounded-md p-1 cursor-pointer duration-300"
    const activeStyle = "bg-green-500 text-white"
    const [userLogin, setUserLogin] = useState(false)

    useEffect(() => {
        // 1. Create an AbortController instance to handle cleanup
        const controller = new AbortController();

        const getMe = async () => {
            try {
                const res = await axios.get("/api/auth/getMe", { credentials: true }, {
                    signal: controller.signal // Link the request to our controller
                });
                console.log("Success data:", res.data);
                if (res.data.User) {
                    setUserLogin(true)
                }
                console.log(userLogin);
            }

            catch (err) {
                // Ignore errors caused by intentional request cancellation
                if (axios.isCancel(err)) {
                    console.log("Request canceled successfully");
                    return;
                }

                if (err.response) {
                    // Server responded with a status code outside the 2xx range
                    console.log("Server Error Status:", err.response.status);
                    console.log("Server Error Data:", err.response.data);
                } else if (err.request) {
                    // Request was made but no response was received (Network / CORS issues)
                    console.log("Network Error: No response received from server");
                } else {
                    // Something went wrong setting up the request (Client-side issue)
                    console.log("Axios Configuration Error:", err.message);
                }
            }
        };

        getMe();

        // 2. Return a clean arrow function that cancels the request on unmount
        return () => {
            controller.abort();
        };
    }, []);



    return (

        <>
            <section>
                <nav className='flex justify-between items-center px-5 py-2'>

                    {/* first part */}
                    <Link to='/' className='w-28 h-28 rounded-md flex justify-center items-center'><img className='object-contain' src={logo} alt="Logo" /></Link>


                    {/* second part */}
                    <div className='flex gap-2'>
                        {navItems.map((ele) => (
                            <li key={ele.route} className='list-none'>
                                <NavLink to={ele.route} className={({ isActive }) => `${baseStyle} ${isActive ? activeStyle : ''}`}>
                                    {ele.item}
                                </NavLink>
                            </li>
                        ))}
                    </div>


                    {/* third part  */}
                    {userLogin ? (
                        <Link to="/logout" className='bg-blue-500 text-white hover:bg-blue-600 px-2 py-1 hover:cursor-pointer rounded-md'><button className=' hover:cursor-pointer' type="button">Logout</button></Link>
                    ) : (
                        <div className='flex gap-2'>

                            <Link to="/signup" className='bg-blue-500 text-white hover:bg-blue-600 px-2 py-1 hover:cursor-pointer rounded-md'><button className=' hover:cursor-pointer' type="button">Sign Up</button></Link>

                            <Link to="/login" className='bg-blue-500 text-white hover:bg-blue-600 px-2 py-1 rounded-md hover:cursor-pointer'><button className='hover:cursor-pointer' type="button">Login</button></Link>

                        </div>
                    )}






                </nav>
            </section>
        </>
    )
}

export default Navbar
