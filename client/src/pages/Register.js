import React from 'react'
import '../css/Register.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function Register() {
  return (
        <div className="background-container">
            <img src="/travel_background.png" alt="travel background" className="background-image" />
            <div className="content">
                <h1 className="home-title">Welcome!</h1>

                <form className="register-form">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" />

                    <label htmlFor="repass">Re-Enter Password</label>
                    <input type="password" id="password" name="repass" />

                    <button type="submit" className="submit-button">Sign Up</button>

                </form>

                <h3 className="already">Already have an account?</h3>
                <Link to="/login">Login now</Link>
                
            </div>
        </div>
        
  )
}

export default Register