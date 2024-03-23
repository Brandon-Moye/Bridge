import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { doc, increment, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth } from '../context/AuthContext'
import { db } from '../../firebase';

export default function Dashboard() {
    const [error, setError] = useState()
    const navigate = useNavigate()

    const { logout, currentUser } = useAuth()

    async function handleIncrement() {
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(userRef, { counter: increment(1), timestamp: serverTimestamp() }, { merge: true });
    }

    async function handleLogout() {
        setError("");

        try {
            await logout();
            navigate("/login")
        } catch {
            setError("Failed to log out")
        }
    }

    return (
        <div>
            <p>welcome to the dashboard</p>
            <button onClick={handleIncrement}>Increment database</button>
            <button onClick={handleLogout} type="link">Logout</button>
        </div>
    )
}