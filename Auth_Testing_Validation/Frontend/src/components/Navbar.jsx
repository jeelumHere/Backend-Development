import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import logo from "../assets/test.jpg"

const Navbar = () => {
    const navItems = [
        { item: "Home", route: "/" },
        { item: "Contact", route: "/contact" },
        { item: "About", route: "/about" },
        { item: "Detail", route: "/detail" }
    ]
    const baseStyle = "rounded-md p-1 cursor-pointer duration-300"
    const activeStyle = "bg-green-500 text-white"
    return (
        <>
            <section>
                <nav className='flex justify-between items-center px-5 py-2'>

                    {/* first part */}
                    <Link to='/' className='w-28 h-28 rounded-md flex justify-center items-center'><img className='object-contain' src={logo} alt="Logo" /></Link>


                    {/* second part */}
                    <div className='flex gap-2'>
                        {navItems.map((ele) => (
                            <li key={ele.route}className='list-none'>
                                <NavLink to={ele.route} className={({isActive})=> `${baseStyle} ${isActive? activeStyle:''}`}>
                                    {ele.item}
                                </NavLink>
                            </li>
                        ))}
                    </div>


                    {/* third part */}
                    <div className='flex gap-2'>
                        <Link to="/signup" className='bg-blue-500 text-white hover:bg-blue-600 px-2 py-1 hover:cursor-pointer rounded-md'><button className=' hover:cursor-pointer' type="button">Sign Up</button></Link>
                        <Link to="/login" className='bg-blue-500 text-white hover:bg-blue-600 px-2 py-1 rounded-md hover:cursor-pointer'><button className='hover:cursor-pointer' type="button">Login</button></Link>
                    </div>

                    
                    <Link to="/logout" className='bg-blue-500 text-white hover:bg-blue-600 px-2 py-1 hover:cursor-pointer rounded-md'><button className=' hover:cursor-pointer' type="button">Logout</button></Link>


                </nav>
            </section>
        </>
    )
}

export default Navbar
