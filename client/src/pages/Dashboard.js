import React from 'react'
import '../css/Dashboard.css'
import Sidebar from "../components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Flights from './Flights'
import Hotels from './Hotels'
import Airbnbs from './Airbnbs'
import Restaurants from './Restaurants'
import Attractions from './Attractions'
import Budget from './Budget'
import Cars from './Cars'

function Dashboard() {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#B4E2EF' }}>
        <Sidebar />
        <div className="dashboard-main-content" style={{marginLeft: "250px", padding: "20px" }}>

            <Routes>
            <   Route index element={
                    <div className="dashboard-container">
                        <div className="dashboard-title">Your Itinerary</div>
                    </div>
                } />
                <Route path="flights" element={<Flights />} />
                <Route path="hotels" element={<Hotels />} />
                <Route path="airbnbs" element={<Airbnbs />} />
                <Route path="restaurants" element={<Restaurants />} />
                <Route path="attractions" element={<Attractions />} />
                <Route path="budget" element={<Budget />} />
                <Route path="cars" element={<Cars />} />

            </Routes>
        </div>
    </div>
  )
}

export default Dashboard