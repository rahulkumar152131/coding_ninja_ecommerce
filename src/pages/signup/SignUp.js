import React from 'react'
import "./style.scss"
import { useVaue } from '../../context/productContext'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, getDocs, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { toast } from 'react-toastify'

const SignUp = () => {
    const navigate = useNavigate();
    const { name, setName, email, setEmail, password, setPassword } = useVaue();
    async function handleSignup(e) {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(auth.currentUser, {
                displayName: name,
            });

            await signInWithEmailAndPassword(auth, email, password);
            setName("");
            setEmail("");
            setPassword("");
            navigate("/");
            toast.success('Sucessfully Signup !!', {
                position: toast.POSITION.TOP_RIGHT, // This is required, but not for position
                className: 'custom-toast-right ', // Apply the custom CSS class
                autoClose: 2000, // Close the notification after 3 seconds (optional)
            });

        } catch (error) {
            // const errorCode = error.code;
            const errorMessage = error.message;

            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT, // This is required, but not for position
                className: 'custom-toast-right ', // Apply the custom CSS class
                autoClose: 2000, // Close the notification after 3 seconds (optional)
            });
        }
    }

    return (
        <form onSubmit={(e) => {
            handleSignup(e);
        }} className='signup-cotainer'>
            <div className="title">
                Sign Up
            </div>
            <div className="name">
                <input type="text" value={name} placeholder='Enter Name' onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="email">
                <input type="email" value={email} placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="password">
                <input type="password" value={password} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="signup">
                <button >Sign Up</button>
            </div>
        </form>
    )
}

export default SignUp