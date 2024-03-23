/**
 * If I put content/components outside of the Routes tag, that would not re render when a link is
 * NEED to brush up on dynamic routes
 */


import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Blog from './components/Blog'
import PrivateRoute from './components/PrivateRoute'
import { Route, Routes } from "react-router-dom"
import './App.css'

function App() {
  const { currentUser } = useAuth()

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/blog" element={<Blog />}></Route>
        <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} ></Route>
      </Routes>
      {/* {currentUser ? (<Dashboard />) : (<Login />)} */}
    </div>
  )
}

export default App
