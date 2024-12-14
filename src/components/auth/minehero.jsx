import React from 'react';
import '../styles/video.css'; 
import MineNav from './MineNav';
import MineSearch from './MineSearch';
import { Link as ScrollLink } from 'react-scroll';
import {Link} from 'react-router-dom';

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
      <MineNav/>

      <div className="overlay-text">

        <h1>effortless property discovery</h1>
        <MineSearch />

 
<button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
<span class="relative px-5 py-1 transition-all ease-in duration-75  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0" id='button'>
   <ScrollLink to="prop" smooth={true} duration={10} className="block py-2 pr-3 pl-2 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 text-white cursor-pointer">
   Explore More       
    </ScrollLink>
</span>
</button>
      </div>
      
    </div>
  );
};

export default Hero;
