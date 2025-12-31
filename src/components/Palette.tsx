'use client';
import React, { useState } from "react";

const Color = ({ isActive, firstColors, secondColors, thirdColors }: {
  isActive: { first: boolean; second: boolean; third: boolean };
  firstColors: () => void;
  secondColors: () => void;
  thirdColors: () => void;
}) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className='absolute top-1/2 right-[5%] z-10'>
      <div
        className={`hidden lg-custom:block w-[50px] h-[50px] bg-no-repeat bg-center bg-[length:32px] p-4 cursor-pointer transition-all duration-300 ${
          toggle 
            ? 'bg-[url("../assets/images/ico-brush-close.png")]' 
            : 'bg-[url("../assets/images/ico-brush.png")]'
        }`}
        onClick={() => setToggle(!toggle)}
      ></div>

      <div
        className={`absolute bottom-8 left-0 flex-col w-auto p-[0.2em] -z-10 animate-colors-up ${toggle ? 'flex' : 'hidden'}`}
      >
        <ul
          className={`flex p-[0.1em] border border-dashed cursor-pointer ${
            isActive.first ? 'border-bright' : 'border-transparent'
          }`}
          onClick={firstColors}
        >
          <li className='w-3 h-3 m-[0.1em] border border-bright bg-[#1c1c1c]'></li>
          <li className='w-3 h-3 m-[0.1em] ml-[0.3em] border border-bright bg-[#ed1c24]'></li>
        </ul>
        <ul
          className={`flex p-[0.1em] border border-dashed cursor-pointer ${
            isActive.second ? 'border-bright' : 'border-transparent'
          }`}
          onClick={secondColors}
        >
          <li className='w-3 h-3 m-[0.1em] border border-bright bg-[#29335C]'></li>
          <li className='w-3 h-3 m-[0.1em] ml-[0.3em] border border-bright bg-[#F3A712]'></li>
        </ul>
        <ul
          className={`flex p-[0.1em] border border-dashed cursor-pointer ${
            isActive.third ? 'border-bright' : 'border-transparent'
          }`}
          onClick={thirdColors}
        >
          <li className='w-3 h-3 m-[0.1em] border border-bright bg-[#757575]'></li>
          <li className='w-3 h-3 m-[0.1em] ml-[0.3em] border border-bright bg-[#03A9F4]'></li>
        </ul>
      </div>
    </div>
  );
};

export default Color;
