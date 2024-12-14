// BackgroundVideo.js
import React from 'react';
import '../styles/video.css'; 
import NavBar from './NavBar';
import SearchFilter from './SearchFilter';

const Hero = () => {
  return (
    <div className="video-container" id='hero'>
         <video
    autoPlay
    loop
    muted
    className="background-video"
    id="backgroundVideo"
  >
    <source src="../public/4770380-hd_1920_1080_30fps.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
      <NavBar/>
      {/* <CityCarousel /> */}

      <div className="overlay-text">

        <h1>effortless property discovery</h1>
        <SearchFilter />

 
<button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0" id='button'>
Explore More
</span>
</button>

      </div>
      
    </div>
  );
};

export default Hero;
