import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [createAccount, setCreateAccount] = useState(false)
    const [userCreds, setUserCreds] = useState({ email: '', password: '' })
    const { signup, login } = useAuth()
    const navigate = useNavigate()

    function updateEmail(e) {
        setUserCreds({ ...userCreds, email: e.target.value })
    }

    function updatePassword(e) {
        setUserCreds({ ...userCreds, password: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        // prevents signup if form not completed
        if (!userCreds.email || !userCreds.password) { return }

        // if (createAccount) {
        //     // recommended to add password regex check in here
        //     console.log('Registering')
        //     signup(userCreds.email, userCreds.password)
        // } else {
        //     console.log('Logging in')
        //     login(userCreds.email, userCreds.password)
        //     navigate("/")
        // }

        try {
            setError("");
            setLoading(true);
            await login(userCreds.email, userCreds.password);
            navigate("/");
        } catch {
            setError("Failed to sign in, please check your email or password");
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder='Email' value={userCreds.email} onChange={(e) => {
                updateEmail(e)
            }}></input>
            <input placeholder='Password' type='password' value={userCreds.password} onChange={(e) => {
                updatePassword(e)
            }}></input>
            <button type="submit">Submit</button>
            <button onClick={() => setCreateAccount(!createAccount)}>
                <p>{createAccount ? 'Sign In' : 'Sign Up'}</p>
            </button>
            <Link to="/blog">blooog</Link>
        </form>
    )
}