import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Feed from '../Pages/Feed'
import CreatePost from '../Pages/CreatePost'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/feed' element={<Feed />} />
        <Route path='/createPost' element={<CreatePost />} />
      </Routes>
    </Router>
  )
}

export default App
