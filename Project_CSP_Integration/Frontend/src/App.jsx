import React from 'react'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hello Reactjs</h1>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
