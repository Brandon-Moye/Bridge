import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const { currentUser } = useAuth()

  return (
    <div>
      {currentUser ? (<Dashboard />) : (<Login />)}
    </div>
  )
}

export default App
