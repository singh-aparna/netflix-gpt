import React, { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from 'react-redux';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //sign-out successful
      })
      .catch((error) => {
        //An error happened
        navigate("/error");
      })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  return (
    <div className='w-full absolute z-10 px-8 py-2 bg-gradient-to-b from-black flex justify-between'>
      <img className='w-44' src={LOGO} alt='logo' />
      {user && (<div className='flex items-center gap-x-4'>
        {showGptSearch && (<select className='bg-red-600 text-white rounded-md px-3 py-1' onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map((lang) => (<option key={lang.identifier} value={lang.identifier}>{lang.name}</option>))}
        </select>)}
        {/* <button onClick={handleGptSearchClick} className='text-white bg-red-600 rounded-md px-3 py-1'>{showGptSearch ? "Home Page" : "GPT Search"}</button> */}
        <img className='w-8 h-8' alt='usericon' src={user?.photoURL} />
        <button onClick={handleSignOut} className='bg-red-600 text-white rounded-md px-3 py-1'>Sign Out</button>
      </div>)}
    </div>
  )
}

export default Header;