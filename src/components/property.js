import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const Properties = () => {
     const [price, setPrice] = useState(750000);
     const [visibleCount, setVisibleCount] = useState(6);
 
//      const fetchListings = async () => {
//   try {
//     const response = await fetch(
//       'https://partners.api.kw.com/v2/listings/region/50394?page[offset]=1&page[limit]=100',
//       {
//         method: 'GET',
//         headers: {
//           Authorization: 'Basic b2FoNkRibjE2dHFvOE52M0RaVXk0NHFVUXAyRjNHYjI6eHRscnJmNUlqYVZpckl3Mg==',
//           Accept: 'application/json',
//         },
//       }
//     );
// console.log(response);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('API data:', data);
//   } catch (err) {
//     console.error('Failed to fetch listings:', err);
//   }
// };

// fetchListings();


  const properties = [
    {
      image: "https://storage.googleapis.com/attachment-listing-prod-5af4/2000043179/listing/734aaecdaf1936be42f85a35/cv7r6851g1lc70qjejgg.jpeg",
      price: 750000,
      agent: "Meshary Almalki",
      type: "Residential",
      beds: 4,
      baths: 2,
      area: 280,
      location: "Jeddah, Saudi Arabia",
    },
     {
      image: "https://storage.googleapis.com/attachment-listing-prod-5af4/2000095310/listing/266bf11f6f1a642adf96b812/cukvcdqhr9cs770mt8h0.png",
      price: 960000,
      agent: "Saad Alotaibi",
      type: "Commercial",
      beds: 0,
      baths: 2,
      area: 850,
      location: "Tabuk, Saudi Arabia",
    },
    {
      image: "https://storage.googleapis.com/attachment-listing-prod-5af4/2000043542/listing/30cbbba08226bd44d555e39b/cu4ddknndonc773t63hg.png",
      price: 580000,
      agent: "Aisha Alghamdi",
      type: "Residential",
      beds: 2,
      baths: 1,
      area: 200,
      location: "Hail, Saudi Arabia",
    },
    {
      image: "https://storage.googleapis.com/attachment-listing-prod-5af4/2000043542/listing/46a12c34c40bc918adfe272e/cu940vrpaooc70pb9f4g.png",
      price: 715000,
      agent: "Khaled Alrashid",
      type: "Residential",
      beds: 3,
      baths: 2,
      area: 310,
      location: "Taif, Saudi Arabia",
    },
    
    {
      image: "https://storage.googleapis.com/attachment-listing-prod-5af4/2000043179/listing/e36de373fe8179a94c991478/cudvqtahr9cs770mmdi0.jpeg",
      price: 980000,
      agent: "Badr Alzahrani",
      type: "Residential",
      beds: 4,
      baths: 3,
      area: 370,
      location: "Al Khobar, Saudi Arabia",
    },
    {
      image: "https://storage.googleapis.com/attachment-listing-prod-5af4/2000043179/listing/4a588fa29f9735dc22d6a40a/cudvs69u8mjc70kegq9g.jpeg",
      price: 675000,
      agent: "Huda Aljohani",
      type: "Residential",
      beds: 3,
      baths: 2,
      area: 290,
      location: "Jazan, Saudi Arabia",
    },
    {
      image: "https://storage.googleapis.com/attachment-listing-prod-5af4/2000043179/listing/7a67ea5d225fc6d8aab293b9/cudvognklprc7765jj0g.jpeg",
      price: 870000,
      agent: "Talal Alnasser",
      type: "Commercial",
      beds: 0,
      baths: 2,
      area: 720,
      location: "Najran, Saudi Arabia",
    },
    {
      image: "https://storage.googleapis.com/attachment-listing-prod-5af4/2000095310/listing/5d94e50f0f72b839a8d718fb/cukvipfklprc7765qgc0.png",
      price: 535000,
      agent: "Sarah Alotaibi",
      type: "Residential",
      beds: 2,
      baths: 1,
      area: 230,
      location: "Al Baha, Saudi Arabia",
    },
    {
      image: "https://storage.googleapis.com/attachment-listing-prod-5af4/2000043542/listing/5c1a9082279a92531156e9f1/cuksspqhr9cs770mt59g.png",
      price: 1020000,
      agent: "Mansour Aljaber",
      type: "Residential",
      beds: 5,
      baths: 4,
      area: 450,
      location: "Sakaka, Saudi Arabia",
    },
    {
      image: "https://storage.googleapis.com/attachment-listing-prod-5af4/2000043542/listing/d4ec15602aac7608656baa02/cuhn3vihr9cs770mpu1g.png",
      price: 780000,
      agent: "Laila Alnami",
      type: "Commercial",
      beds: 0,
      baths: 2,
      area: 640,
      location: "Madinah, Saudi Arabia",
    },
     {
      image: "https://storage.googleapis.com/attachment-listing-prod-5af4/2000043179/listing/e36de373fe8179a94c991478/cudvqtahr9cs770mmdi0.jpeg",
      price: 980000,
      agent: "Badr Alzahrani",
      type: "Residential",
      beds: 4,
      baths: 3,
      area: 370,
      location: "Al Khobar, Saudi Arabia",
    },
    {
      image: "https://storage.googleapis.com/attachment-listing-prod-5af4/2000043542/listing/f5f164daabf06943d4ee27d4/cuh2t42hr9cs770mp0n0.png",
      price: 695000,
      agent: "Salem Alsuwailem",
      type: "Residential",
      beds: 3,
      baths: 2,
      area: 305,
      location: "Buraydah, Saudi Arabia",
    },
  ];

  const bedIconUrl = "/bed.png";
  const bathIconUrl = "/bath.png";
  const areaIconUrl = "/area.png";
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 text-[10px] md:text-xs w-full mt-4 md:mt-12 max-w-full px-4 md:px-34">
  {/* Row 1 - First two dropdowns */}
  <div className="col-span-1">
    <select className="w-full text-sm md:text-[0.9rem] md:leading-normal p-1 md:p-0 flex justify-center text-center">
      <option>PROPERTY TYPE</option>
      <option>All</option>
      <option>Commercial</option>
      <option>Farm and Agriculture</option>
      <option>Lots and Land</option>
      <option>Residential</option>
    </select>
  </div>
  
  <div className="col-span-1">
    <select className="w-full text-sm md:text-[0.9rem] md:leading-normal p-1 md:p-0 flex justify-center text-center">
      <option>MARKET CENTER</option>
      <option>All</option>
      <option>Jasmin</option>
      <option>Jeddah</option>
    </select>
  </div>

  {/* Row 2 - Next two dropdowns */}
  <div className="col-span-1 mt-3 md:mt-0">
    <select className="w-full text-sm md:text-[0.9rem] md:leading-normal p-1 md:p-0 flex justify-center text-center">
      <option>PROPERTY SUBTYPE</option>
      <option>All</option>
      <option>Apartment</option>
      <option>Condominium</option>
      <option>Duplex</option>
      <option>Hotel-Motel</option>
      <option>Industrial</option>
      <option>Mobile Home</option>
      <option>Multi-Family</option>
      <option>Other</option>
      <option>Quadruplex</option>
      <option>Ranch</option>
      <option>Single Family Attach</option>
      <option>Single Family detached</option>
      <option>Townhouse</option>
      <option>Unimproved land</option>
      <option>Warehouse</option>
    </select>
  </div>

  <div className="col-span-1 mt-3 md:mt-0">
    <select className="w-full text-sm md:text-[0.9rem] md:leading-normal p-1 md:p-0 flex justify-center text-center">
      <option>CITY</option>
      <option>All</option>
      <option>ALRIYADH</option>
      <option>JED</option>
      <option>JEDDAH</option>
      <option>Jeddah</option>
      <option>Jeddah city</option>
      <option>KSA</option>
      <option>Khobar</option>
      <option>Riyadh</option>
      <option>Saudi Arabia</option>
      <option>alriyadh</option>
      <option>jeddah</option>
      <option>jedah</option>
      <option>riyad</option>
      <option>riyadh</option>
      <option>الرياض</option>
      <option>جدة</option>
      <option>جده</option>
    </select>
  </div>

 

  <div className="flex flex-col col-span-2 md:col-span-1 items-center md:items-start text-center md:text-left md:ml-10">
  <label htmlFor="price" className="mb-1 mr-33 md:mr-0 text-gray-700 text-sm md:text-[0.9rem] leading-tight ">
    PRICE
  </label>
  <input
    type="range"
    id="price"
    min="0"
    max="1000000"
    step="10000"
    defaultValue="1000000"
    className="w-40 h-1 bg-black rounded-lg appearance-none 
      [&::-webkit-slider-thumb]:appearance-none 
      [&::-webkit-slider-thumb]:h-4 
      [&::-webkit-slider-thumb]:w-4 
      [&::-webkit-slider-thumb]:rounded-full 
      [&::-webkit-slider-thumb]:bg-[rgba(202,3,32,255)]"
  />
  <span className="md:text-[0.9rem] text-sm mt-4 ml-35 md:ml-28">750000 SAR</span>
</div>

      </div>

      <p className="md:mt-6 mt-2 md:text-[0.9rem] text-sm leading-tight ml-6 text-gray-700">
        Total Listings : <span className="text-[rgba(202,3,32,255)] font-semibold">{properties.length}</span>
      </p>

      <div className="min-h-screen p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.slice(0, visibleCount).map((prop, idx) => (
  <div key={idx} className="bg-gray-100 rounded-3xl overflow-hidden w-full">
    <div className="relative w-full h-60">
      <Link href={`/properties/propertyDetails`} passHref>
       
          <Image
            src={prop.image}
            alt="property"
            fill
            className="object-cover rounded-3xl cursor-pointer hover:opacity-90 transition-opacity"
          />
     
      </Link>
    
              </div>
              <div className="p-4">
                <div className="flex justify-between items-baseline mb-1 md:my-6 my-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <span className="relative w-5 h-5">
                      <Image src='/currency.png' alt="currency" fill className="object-cover rounded-3xl" />
                    </span>
                    {prop.price.toLocaleString()}
                  </h2>
                  <p className="text-sm">{prop.agent}</p>
                </div>

                <div className="flex justify-between items-center md:my-6 my-4">
                  <div className="flex items-center text-sm mb-2">
                    <span className="flex items-center gap-2 mr-4">
                      <span className="relative w-6 h-6">
                        <Image src={bathIconUrl} alt="bath" fill className="object-contain" />
                      </span>
                      {prop.baths}
                    </span>
                    <span className="flex items-center gap-2 mr-4">
                      <span className="relative w-6 h-6">
                        <Image src={bedIconUrl} alt="bed" fill className="object-contain" />
                      </span>
                      {prop.beds}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="relative w-6 h-6">
                        <Image src={areaIconUrl} alt="area" fill className="object-contain" />
                      </span>
                      {prop.area}
                    </span>
                  </div>
                  <p className="text-[0.7rem] mb-2">{prop.type}</p>
                </div>

                <p className="text-xs">{prop.location}</p>
                <button className="mt-10 w-full bg-black text-white py-2 rounded-full md:text-base text-sm hover:bg-[rgba(202,3,32,255)] transition">
                  View Property Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {visibleCount < properties.length && (
        <div className="flex justify-center items-center md:mt-5">
         <button
  className="md:w-3/6 w-40 md:py-2 py-2 mb-10 md:mb-0 px-4  bg-[rgba(202,3,32,255)] hover:bg-red-950 text-white text-xs md:text-lg font-semibold rounded-full transition whitespace-nowrap"
  onClick={() => setVisibleCount(c => c + 6)}
>
  View More Properties..
</button>

        </div>
      )}
<div className="hidden md:flex justify-center py-4 md:py-16">
        <Image
          src="/howwillyouthink.png"
          alt="How Will You Thrive"
          width={800}
          height={400}
         className="w-70 h-20 md:w-[950px] md:h-[400px] object-contain"
        />
      </div>

      <hr className="hidden md:block w-6/12 mx-auto bg-[rgba(202,3,32,255)] border-0 h-[1.5px] mt-5 md:mt-20 mb-16" />
     
   
        </div>
    );
}

export default Properties;
