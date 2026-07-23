import React from 'react'
import Navbar from './components/Navbar'
import {Router,Routes,Route} from "react-router-dom"
import Home from './components/pages/Home'
import Contact from './components/pages/Contact'
import About from './components/pages/About'
import Detail from './components/pages/Detail'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import Logout from './components/pages/Logout'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/detail' element={<Detail/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/logout' element={<Logout/>}/>
    </Routes>
    </>
  )
}

export default App
