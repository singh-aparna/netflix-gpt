import React, { useState, useRef } from 'react';
import Header from './Header';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {BACKGROUND_IMAGE, USER_AVATAR} from '../utils/constants'
import { checkValidateData } from '../utils/validate';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    const handleButtonClick = () => {
        //validate the form data
        const message = checkValidateData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;
        //Sign in and sign up logic
        if (!isSignInForm) {
            //Sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: USER_AVATAR
                    })
                        .then(() => {
                            const { uid, email, displayName, photoURL } = auth.currentUser;
                            dispatch(
                                addUser({
                                    uid: uid,
                                    email: email,
                                    displayName: displayName,
                                    photoURL: photoURL,
                                })
                            )
                            // navigate("/browse");
                        })
                        .catch(error => {
                            setErrorMessage(error.message);
                        })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                })
        }
        else {
            //sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log(user);
                    // navigate("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                })
        }
    }
    return (
        <div>
            <Header />
            <div className='absolute'>
                <img alt='backgroundImage' src={BACKGROUND_IMAGE} />
            </div>
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="absolute bg-black bg-opacity-75 p-8 rounded-md w-full max-w-md">

                    <form onSubmit={(e) => e.preventDefault()}>
                        <h2 className="text-white text-3xl mb-6">{isSignInForm ? "Sign In" : "Sign Up"}</h2>

                        {!isSignInForm && (<div className="mb-6 border-[1px]">
                            <input type="text" ref={name} placeholder="Full Name" className="w-full p-3 text-white bg-black bg-opacity-15 rounded-md focus:outline-none focus:ring-2 focus:ring-white" />
                        </div>)}

                        <div className="mb-4 border-[1px]">
                            <input type="email" ref={email} placeholder="Email or phone number" className="w-full p-3 text-white  bg-black bg-opacity-15  rounded-md focus:outline-none focus:ring-2 focus:ring-white" />
                        </div>

                        <div className="mb-4 border-[1px]">
                            <input type="password" ref={password} placeholder="Password" className="w-full p-3 text-white bg-black bg-opacity-15 rounded-md focus:outline-none focus:ring-2 focus:ring-white" />
                        </div>

                        <p className='text-red-600 mb-2'>{errorMessage}</p>
                        <button onClick={handleButtonClick} type="submit" className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition">{isSignInForm ? "Sign In" : "Sign Up"}</button>
                        {isSignInForm && (<div>
                            <h2 className='text-white text-center m-2'>OR</h2>
                            <button type="submit" className="w-full bg-[#ccc] bg-opacity-25 text-white p-2 rounded-md hover:bg-opacity-15 transition">Use a sign-in-code</button>
                            <a className='text-white text-center'>Forgot Password?</a>
                        </div>)}


                        <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
                            <div>
                                <input type="checkbox" id="remember" className="mr-1" />
                                <label for="remember">Remember me</label>
                            </div>
                            <a href="#" className="hover:underline">Need help?</a>
                        </div>
                        <p className="text-gray-500 mt-8">{isSignInForm ? "New to Netflix? " : "Already registered "}<a href="#" onClick={toggleSignInForm} className="text-white hover:underline">{isSignInForm ? "Sign up now." : "Sign in"}</a>.</p>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login;