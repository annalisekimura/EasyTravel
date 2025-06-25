import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import '../css/Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      })

      if (res.status === 200) {
        navigate('/dashboard')
      }

    } catch (err) {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="background-container">
      <img src="/travel_background.png" alt="travel background" className="background-image" />
      <div className="content">
          <h1 className="home-title">Welcome!</h1>
          <form className="register-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

              <button type="submit" className="submit-button">Login</button>

              {error && <p style={{ color: 'red' }}>{error}</p>}

          </form>

          <h3 className="account">Don't have an account?</h3>
          <Link to="/register">Signup Now</Link>

      </div>
    </div>
  )
}

export default Login