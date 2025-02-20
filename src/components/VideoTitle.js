import React from 'react';

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='w-screen aspect-video absolute pt-[20%] px-20 text-white bg-gradient-to-r from black'>
            <h1 className='text-5xl font-bold'>{title}</h1>
            <p className='py-6 text-md w-1/4'>{overview}</p>
            <div className='flex gap-x-2'>
                <button className='bg-white text-black px-6 py-1 rounded-md hover:bg-opacity-50'>Play</button>
                <button className='bg-[#f0f0f0] text-black px-5 py-1 rounded-md'>! More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle;