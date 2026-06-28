import React from 'react'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import CreatePost from './page/createPost'
import Feed from './page/Feed'

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/createPost" element={<CreatePost/>}/>
        <Route path="/feed" element={<Feed/>}/>
      </Routes>
    </Router>
    </>
  )
}
export default App
