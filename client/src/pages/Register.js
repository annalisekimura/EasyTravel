import React, { useState } from 'react'
import '../css/Register.css'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repass, setRepass] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== repass) {
            setError("Passwords do not match")
            return
        }

        try {
            const response = await axios.post('http://localhost:5000/api/register', { //save info
                email,
                password,
            })

            if (response.status == 201) { //success
                navigate('/login')
            }

        } catch (err) {
            setError(err.response?.data?.msg || "Registration failed")
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

                    <label htmlFor="repass">Re-Enter Password</label>
                    <input type="password" id="password" value={repass} onChange={(e) => setRepass(e.target.value)} required />

                    <button type="submit" className="submit-button">Sign Up</button>

                </form>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <h3 className="already">Already have an account?</h3>
                <Link to="/login">Login now</Link>
                
            </div>
        </div>
        
  )
}

export default Register