'use client'
import React from 'react';
import Header from '@/components/header';
import Box from '@/components/box';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { BsInstagram, BsTwitterX, BsLinkedin } from "react-icons/bs";

const Footer = dynamic(() => import('@/components/footer'), { ssr: false });

const Agent = () => {
const agents = [
  {
    name: "Ahmed Jaber Alamri",
    phone: "+966544434242",
    email: "ahmadalamri@kwsaudiarabia.com",
    city: "JEDDAH",
    image: "https://avatar.kwconnect.com/2000068942.jpeg",
  },
  {
    name: "Fatimah Al-Harbi",
    phone: "+966533221122",
    email: "fatimah@kwsaudiarabia.com",
    city: "RIYADH",
    image: "https://avatar.kwconnect.com/2000070266.jpeg",
  },
  {
    name: "Mohammed Al-Qahtani",
    phone: "+966512345678",
    email: "mohammed@kwsaudiarabia.com",
    city: "DAMMAM",
    image: "https://avatar.kwconnect.com/2000059012.jpeg",
  },
  {
    name: "Layla Al-Zahrani",
    phone: "+966598765432",
    email: "layla@kwsaudiarabia.com",
    city: "MAKKAH",
    image: "https://avatar.kwconnect.com/2000046763.jpeg",
  },
];


  return (
    <div className="relative">
      <Header />

      <Box
        h3="Find an Agent"
        src="/agentbg.jpg"
        image="https://static.wixstatic.com/media/36a881_81438044a1d045b894b318b12b06aa24~mv2.png/v1/fill/w_271,h_180,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/3-removebg-preview.png"
      />

    <main className="px-2 md:py-6 mt-4 md:mt-10 md:mx-10">
  <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-2">
    {/* Search Filters */}
    <div className="flex flex-col md:flex-row items-start md:items-end justify-start gap-4 mb-8 w-full">
      
      {/* Agent Name Input */}
      <div className="flex-1 w-full md:ml-2 md:mr-70">
        <label htmlFor="name" className="block mb-2 md:text-base md:font-normal text-base font-normal">Agent Name</label>
        <input 
          type="text" 
          id="name"
          placeholder="Type Name.." 
          className="w-full px-4 py-2 border rounded md:text-sm text-black text-[0.7rem]"
        />
      </div>

      {/* Market Center Dropdown */}
      <div className="flex-1 w-full">
     
        <select id="market" 
        className="w-full px-4 py-2 border border-transparent rounded md:text-[0.8rem] md:font-normal text-[0.8rem] hover:border-gray-500 focus:border-gray-500 focus:outline-none">
          <option>MARKET CENTER</option>
          <option>Jasmin</option>
          <option>Jeddah</option>
        </select>
      </div>

      {/* City Dropdown */}
      <div className="flex-1 w-full">
      
        <select id="city" 
        className="w-full px-4 py-2 md:text-[0.8rem] md:font-normal border border-transparent rounded text-[0.8rem] hover:border-gray-500 focus:border-gray-500 focus:outline-none">
          <option>CITY</option>
        </select>
      </div>
    </div>
  </div>
</main>



<div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] bg-gray-100 md:mx-0 p-4 md:p-4 gap-0 rounded-4xl">
  {/* Left: Agents List */}
  <div className="space-y-6 md:pr-6 md:my-15">
    <h2 className="font-semibold text-center text-sm ">OUR AGENTS</h2>
    <hr className="bg-gray-500 h-[1px] border-0 md:w-160 w-30mx-auto" />


    <div className="grid grid-cols-1 gap-6">
      {agents.map((agent, idx) => (
        <article
          key={idx}
          className="bg-gray-200 p-4 rounded-xl md:mx-3 shadow-md flex flex-row items-start gap-4 relative hover:shadow-lg transition-shadow"
        >
          {/* Agent Image */}
          <div className="w-32 h-32 md:w-50 md:h-50 flex-shrink-0 relative md:mx-3">
            <Link href={'/agent/newdetails'}>
              <Image 
                src={agent.image} 
                alt={`Portrait of ${agent.name}`}
                width={128}
                height={128}
                className="rounded-lg object-cover w-full h-full"
              />
            </Link>
          </div>

          {/* Agent Info */}
          <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 ">
  <h3 className="text-xs font-normal md:font-semibold md:text-base md:tracking-[0.2em] uppercase md:mb-2">{agent.name}</h3>
  <p className="text-sm text-gray-500 ml-auto">{agent.city}</p>
</div>

            <p className="md:text-sm text-[0.7rem]  mb-2 md:mb-2 break-all">{agent.phone}</p>
          
            <p className="md:text-sm text-[0.7rem] mb-4 md:mb-12 break-all">
  {agent.email}
</p>


            <div className="space-y-1">
              <a href="#" className="block md:text-sm text-[0.8rem]">Get Evaluation</a>
              <hr  className='hidden md:flex w-60 bg-[rgba(202,3,32,255)] h-[1px] my-2 border-0'/>
              <a href="#" className="block md:text-sm text-[0.8rem]">View Details and Properties</a>
            </div>
          </div>

          {/* Social Icons */}
          <div className=" hidden md:flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:space-y-3 absolute right-4 top-4 sm:top-14">
            
            <a href="#" aria-label="Instagram" className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
              <BsInstagram size={12} />
            </a>
            <a href="#" aria-label="Twitter" className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
              <BsTwitterX size={12} />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
              <BsLinkedin size={12} />
            </a>
          </div>
        </article>
      ))}
    </div>

    <div className="block md:hidden mt-4">
      <button className="w-full bg-black text-white py-2  rounded-full text-sm hover:bg-[rgba(202,3,32,255)] transition">
        Load More..
      </button>
    </div>
  </div>

  {/* Vertical Divider */}
  <div className="hidden md:block w-px bg-gray-300 mx-2" />

  {/* Right: Map */}
  <div className="pl-0 md:pl-6 my-6 md:my-10">
    <div className="relative w-full h-full  overflow-hidden border border-gray-200 min-h-[300px]">
      <iframe
        title="Saudi Arabia Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4444535.330365576!2d41.51259970861697!3d23.8006960408425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e8e4f105f8aaaf%3A0x70a8a6a2cb7f9405!2sSaudi%20Arabia!5e0!3m2!1sen!2sin!4v1717315040974!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</div>

      <div className="hidden md:flex justify-start ml-42 mt-6">
        <button className="w-70 bg-black text-white py-4 rounded-full text-sm md:text-base hover:bg-[rgba(202,3,32,255)] transition">
          Load More..
        </button>
      </div>

     <div className="order-1 md:order-2 flex flex-col items-center justify-center py-4 md:py-16">
            <Image
              src="/howwillyouthink.png"
              alt="How Will You Thrive"
              width={800}
              height={400}
             className="w-70 h-20 md:w-[950px] md:h-[400px] object-contain"
            />
          </div>


      <hr className="w-5/12 mx-auto bg-[rgba(202,3,32,255)] h-[1.5px] border-0 mt-2 md:mt-20 mb-10" />
      <Footer />
    </div>
  );
};

export default Agent;
