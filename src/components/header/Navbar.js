import React, { useEffect, useState } from 'react'
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useVaue } from '../../context/productContext';


const Navbar = () => {
    // const [login, setlogin] = useState(true);
    const navigate = useNavigate();
    const {user}=useVaue();


    

    return (
        <div className='navbar-container' >
            <div className="page-logo" onClick={() => navigate("/")} >
                Busy Buy
            </div>
            {user ? (
                <div className="navigate-icon">
                    <div className="home" onClick={() => navigate("/")}>
                        <img src="https://cdn-icons-png.flaticon.com/128/619/619032.png" alt="" />
                        Home
                    </div>
                    <div className="myorder" onClick={() => navigate("/myorder")}>
                        <img src="https://cdn-icons-png.flaticon.com/128/3081/3081559.png" alt="" />
                        My orders
                    </div>
                    <div className="cart" onClick={() => navigate("/cart")}>
                        <img src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png" alt="" />
                        Cart
                    </div>
                    <div className="singInSignUp" onClick={() => {
                        navigate("/");
                        signOut(auth);
                        toast.success('Sucessfully Logout !!', {
                            position: toast.POSITION.TOP_RIGHT, // This is required, but not for position
                            className: 'custom-toast-right ', // Apply the custom CSS class
                            autoClose: 2000, // Close the notification after 3 seconds (optional)
                        });
                    }}>
                        <img src="https://cdn-icons-png.flaticon.com/128/8568/8568973.png" alt="" />
                        Logout
                    </div>
                </div>
            ) : (
                <div className="logo">
                    <div className="home" onClick={() => navigate("/")}>
                        <img src="https://cdn-icons-png.flaticon.com/128/619/619032.png" alt="" />
                        Home
                    </div>

                    <div className="singIn" onClick={() => {
                        navigate("/signin");
                    }}>
                        <img src="https://cdn-icons-png.flaticon.com/128/8568/8568973.png" alt="" />
                        Login
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar