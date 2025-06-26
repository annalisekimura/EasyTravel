import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import './css/App.css'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/contents").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    
    <BrowserRouter>
        <Routes>
            <Route path="/"
            element={
              <div className="home-container">
                <div className="plane-container">
                  <img src="/plane.png" alt="Plane" className="plane-image" />
                </div>
                <h1 className="home-title">PlanPilot
                  <div className="arrow-line">
                    <span className="arrow-head">{">"}</span>
                  </div>
                </h1>
            
                <div className="home-buttons">
                  <Link to="/login">
                    <button className="button green">Login</button>
                  </Link>
                  <Link to="/register">
                    <button className="button blue">Register</button>
                  </Link>
                </div>
              </div>
            } />


            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard/*" element={<Dashboard />} />


        </Routes>
    </BrowserRouter>

  )
}


export default App