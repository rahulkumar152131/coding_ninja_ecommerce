import React from 'react'
import "./style.scss"
import { useNavigate } from 'react-router-dom'
import { useVaue } from '../../context/productContext';
import { collection, doc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const navigate = useNavigate();
    const { password, setPassword, email, setEmail } = useVaue();
    async function handleSignin(e) {
        e.preventDefault();
        try {
            
            const signInUserCredential = await signInWithEmailAndPassword(auth, email, password);
            const signInUser = signInUserCredential.user;
            // console.log("User logged in:", signInUser);
            // setEmail("");
            // setPassword("");
            navigate("/")
            toast.success('Sucessfully Signin !!', {
                position: toast.POSITION.TOP_RIGHT, // This is required, but not for position
                className: 'custom-toast-right ', // Apply the custom CSS class
                autoClose: 2000, // Close the notification after 3 seconds (optional)
            });
        } catch (error) {
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);

            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT, // This is required, but not for position
                className: 'custom-toast-right ', // Apply the custom CSS class
                autoClose: 2000, // Close the notification after 3 seconds (optional)
            });
        }


    }


    
    return (
        <form onSubmit={(e) => handleSignin(e)} className='signin-cotainer'>
            <div className="title">
                Sign In
            </div>
            <div className="email">
                <input type="text" placeholder='Enter Email' required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="password">
                <input type="password" placeholder='Enter Password' required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="signin">
                <button>Sign In</button>
            </div>
            <div className="signup" onClick={() => navigate("/signup")}>
                Or SignUp instead
            </div>

        </form>
    )
}

export default SignIn