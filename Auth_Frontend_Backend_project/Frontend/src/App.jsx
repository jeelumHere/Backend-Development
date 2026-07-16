import React from 'react'
import { Router , Routes , Route } from 'react-router-dom'
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import Contact from "./components/pages/Contact"
import Detail from "./components/pages/Detail"
import NotFound from "./components/pages/NotFound"
import Singup from './components/pages/Singup'
import Login from './components/pages/Login'

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  )
}

export default App
