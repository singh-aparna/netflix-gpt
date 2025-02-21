import React from 'react'
import lang from '../utils/languageConstants';
import { useSelector } from 'react-redux';

const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang);
    return (
        <div className=' bg-[#f0f0f0] '>
            <form className='flex flex-col gap-y-4 pt-24 p-5 mx-80 w-1/3'>
                <input type='text' className='px-3 py-1 rounded-md' placeholder={lang[langKey].gptSearchPlaceholder} />
                <button className='bg-red-600 text-white rounded-md px-3 py-1'>{lang[langKey].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar;