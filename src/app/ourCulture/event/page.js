'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/header';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import Box from '@/components/box';
export default function Page(){
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/blogs');
        const data = await res.json();
        setBlogs(data);
        console.log(data);
        
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <Header />
      
      <Box
       
          h3="Events"
          src="/buildexperties.jpg"
        />
      {/* Filter Bar */}
      <div className="flex justify-between items-center my-10 px-6 md:px-20">
        <h1 className="text-sm text-gray-500">All Posts</h1>
        <button className="text-gray-500 hover:text-black">
          <FiSearch className="w-4 h-4" />
        </button>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 px-6 md:px-20 pb-10">
        {blogs.map((post, index) => (
          <div key={index} className="w-60 h-[22rem]">
            <div className="w-full h-60 bg-gray-200">
              <Image
                src={post.image || '/event.png'}
                alt={post.title}
                width={240}
                height={240}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4">
              <p className="text-xl mb-2 font-semibold">{post.title}</p>
              <p className="text-black text-sm line-clamp-3">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

