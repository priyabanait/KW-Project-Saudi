'use client'
import React from 'react';
import Image from 'next/image';

const Box = ({ src, image, h3 }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative min-h-[76vh] md:min-h-[100vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={src}
            alt="Background"
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Content Box */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[76vh] md:min-h-[100vh] px-4 md:px-10">
          
          {/* Mobile View */}
          <div className="w-full md:hidden flex items-center justify-center">
            <div className="bg-gray-500/50 backdrop-blur-sm max-w-sm mx-auto px-8 py-6 rounded-3xl flex flex-col items-center justify-center text-center">
          
              <h3 className="text-lg font-normal text-white tracking-[0.2em] leading-relaxed">
                {h3}
              </h3>
              <hr className="w-24 h-[1.3px] bg-[rgba(202,3,32,255)] border-0 mb-4" />
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:flex items-center justify-center w-full min-h-[100vh]">
            <div className="bg-gray-500/50 backdrop-blur-sm w-full max-w-xl mx-auto px-12 py-8 rounded-3xl flex flex-col items-center justify-center text-center h-[25vh]">
              <h3 className="text-2xl font-normal text-white tracking-[0.3em] leading-relaxed mb-4">
                {h3}
              </h3>
              <hr className="w-80 h-[1.3px] bg-[rgba(202,3,32,255)] border-0" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Box;
