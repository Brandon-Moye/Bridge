import React from 'react'
import { useNavigate } from 'react-router'
import { doc, increment, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth } from '../context/AuthContext'
import { db } from '../../firebase';

export default function Dashboard() {
    const navigate = useNavigate()

    const { logout, currentUser } = useAuth()

    async function handleIncrement() {
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(userRef, { counter: increment(1), timestamp: serverTimestamp() }, { merge: true });
    }

    return (
        <div>
            <p>welcome to the dashboard</p>
            <button onClick={handleIncrement}>Increment database</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}