'use client'
import React from 'react';
import Header from '@/components/header';
import Box from '@/components/box';
import Footer from '@/components/footer';
import PropertyType from '@/components/propertype'
import Properties from '@/components/property';
const Sold = () => {
    return (
        <div>
          <Header />
      <Box h3={"Sold  Listings"} src="/kwbg-image.jpg" image="/properties2.jpg" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 text-[10px] md:text-xs w-full mt-4 md:mt-12 max-w-full px-4 md:px-34 mb-10">
 

      </div>
   <PropertyType type='Sold'></PropertyType>
      <Footer></Footer>
        </div>
    );
}

export default Sold;
