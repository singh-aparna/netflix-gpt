import React, { useState } from 'react';
import Header from './Header';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    return (
        <div>
            <Header />
            <div className='absolute'>
                <img alt='background' src='https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_large.jpg' />
            </div>
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="absolute bg-black bg-opacity-75 p-8 rounded-md w-full max-w-md">

                    <form>
                        <h2 className="text-white text-3xl mb-6">{isSignInForm ? "Sign In" : "Sign Up"}</h2>

                        {!isSignInForm && (<div className="mb-6 border-[1px]">
                            <input type="text" placeholder="Full Name" className="w-full p-3 text-white bg-black bg-opacity-15 rounded-md focus:outline-none focus:ring-2 focus:ring-white" />
                        </div>)}
                        <div className="mb-4 border-[1px]">
                            <input type="email" placeholder="Email or phone number" className="w-full p-3 text-white  bg-black bg-opacity-15  rounded-md focus:outline-none focus:ring-2 focus:ring-white" />
                        </div>


                        <div className="mb-6 border-[1px]">
                            <input type="password" placeholder="Password" className="w-full p-3 text-white bg-black bg-opacity-15 rounded-md focus:outline-none focus:ring-2 focus:ring-white" />
                        </div>


                        <button type="submit" className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition">{isSignInForm ? "Sign In" : "Sign Up"}</button>
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