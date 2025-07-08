'use client'
import React from 'react';
import Image from 'next/image';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { ArrowRight } from 'lucide-react';
import { useState,useRef,useEffect,useMemo } from 'react';
import { FaChevronUp,FaChevronDown } from 'react-icons/fa';
import { FaSearch, FaCheckCircle,FaBars, FaGavel, FaTimes,FaStar, FaGlobeAmericas, FaHome } from 'react-icons/fa';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
const Properties = () => {
  const scrollRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Dynamic property types state
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [typesError, setTypesError] = useState(null);

  const [listings, setListings] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [listingsError, setListingsError] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      setLoadingListings(true);
      setListingsError(null);
      try {
        const res = await fetch('http://localhost:5000/api/listings/list/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        let fetched = [];
        if (Array.isArray(data?.data)) {
          fetched = data.data;
        }
        setListings(fetched);
      } catch (err) {
        setListingsError('Failed to load listings');
      } finally {
        setLoadingListings(false);
      }
    }
    fetchListings();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;

    const checkOverflow = () => {
      if (el && el.scrollWidth > el.clientWidth) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    checkOverflow(); // Initial check
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [listings]);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
       const [isVisible, setIsVisible] = useState(true);  
       const [isAtTop, setIsAtTop] = useState(true);  
       const prevScrollY = useRef(0);
      
   
 
 
       const [openSubmenu, setOpenSubmenu] = useState(null);
     
       const toggleSubmenu = (key) => {
         setOpenSubmenu(prev => (prev === key ? null : key));
       };
       const toggleMenu = () => {
         setIsMenuOpen(!isMenuOpen);
       };
     
       useEffect(() => {  
         const handleScroll = () => {  
           const currentScrollY = window.scrollY;  
     
           // At the very top  
           if (currentScrollY < 10) {  
             setIsAtTop(true);  
             setIsVisible(true);  
             return;  
           } else {  
             setIsAtTop(false);  
           }  
     
           // Scrolling down → Hide header  
           if (currentScrollY > prevScrollY.current) {  
             setIsVisible(false);  
           }  
           // Scrolling up → Show header  
           else {  
             setIsVisible(true);  
           }  
     
           prevScrollY.current = currentScrollY;  
         };  
     
         window.addEventListener('scroll', handleScroll, { passive: true });  
         return () => window.removeEventListener('scroll', handleScroll);  
       }, []);
       const menuItems = [
         { label: 'PROPERTIES', key: 'properties',  submenu: [
           { label: 'ACTIVE', href: '/properties/active' },
           { label: 'SOLD', href: '/properties/sold' },
           { label: 'RENT', href: '/properties/rent' },
           { label: 'AUCTION', href: '/properties/auction' },
           { label: 'INTERNATIONAL', href: 'https://www.kw.com/search/sale?viewport=56.41671222773751%2C120.63362495324327%2C-14.684966046563696%2C-6.807781296756721' }
         ]},
         { label: 'MARKET CENTER', key: 'market', submenu: [
           { label: 'ALL MC', href: '/marketCenter' },
           { label: 'JASMINE', href: '/riyadh' },
           { label: 'JEDDAH', href: '/jeddah' }
         ] },
         { label: 'BUYER', key: 'buyer', submenu: [
           { label: 'SEARCH PROPERTY', href: '/properties' },
           { label: 'AUCTION', href: '/properties/auction' },
           { label: 'NEW DEVELOPMENT', href: '/properties/newdevelopment' },
           { label: 'BUYING GUIDE', href: '/buyer/buyerguid' }
         ]},
         { label: 'TENANT', key: 'tenant', submenu: [
           { label: 'RENT SEARCH', href: '/properties/rent' },
           { label: 'TENANT GUIDE', href: '/tenant' }
         ] },
         { label: 'SELLER', key: 'seller',  submenu: [
           { label: 'SEARCH AGENT', href: '/agent' },
           { label: 'FIVE STEPS TO SELL', href: '/seller' },
           { label: 'SELLER GUIDE', href: 'seller/sellerguid' }
         ]},
         { label: 'OUR CULTURE', key: 'culture', submenu: [
           { label: 'OUR PROMISE', href: '/ourpromise' },
           { label: 'ABOUT US', href: '/ourCulture' },
           { label: 'WHY KW', href: '/ourCulture/whyKW' },
           { label: 'KW TRAINING', href: '/culture/training' },
           { label: 'KW TECHNOLOGY', href: '/ourCulture/kwuniversity"' }
         ] },
         { label: 'FRANCHISE', key: 'franchise',href: '/franchise'   },
    { label: 'LOGIN', key: 'login',href: '/franchise' },
    { label: 'CONTACT US', key: 'contact',href: '/contactUs' },
    { label: 'JOIN US', key: 'join' ,href: '/joinus'},
    { label: 'INSTANT VALUATION', key: 'valuation',href: '/instantvaluation' },
    { label: 'TERMS & POLICY', key: 'terms',href: '#' },
       ];
      
     
       useEffect(() => {  
         const handleScroll = () => {  
           const currentScrollY = window.scrollY;  
     
           // At the very top  
           if (currentScrollY < 10) {  
             setIsAtTop(true);  
             setIsVisible(true);  
             return;  
           } else {  
             setIsAtTop(false);  
           }  
     
           // Scrolling down → Hide header  
           if (currentScrollY > prevScrollY.current) {  
             setIsVisible(false);  
           }  
           // Scrolling up → Show header  
           else {  
             setIsVisible(true);  
           }  
     
           prevScrollY.current = currentScrollY;  
         };  
     
         window.addEventListener('scroll', handleScroll, { passive: true });  
         return () => window.removeEventListener('scroll', handleScroll);  
       }, []);
     
  const categories = [
    {
      image:'/residential.png',
      title: 'Residential',
      subtitle: 'Active Properties',
      href: '/residential'
    },
    {
      image:'/commercial.png',
      title: 'Commercial',
      subtitle: 'Active Properties',
      href: '/commercial'
    },
    {
      image:'/sold3.png',
      title: 'Sold',
      subtitle: 'Properties',
      href: '/sold'
    },
    {
      image:'/rental.png',
      title: 'Rental',
      subtitle: 'Properties',
      href: '/rental'
    },
    {
      image:'/auction.png',
      title: 'Auction',
      subtitle: 'Properties',
      href: '/auction'
    },
    {
      image:'/newdevelopment.png',
      title: 'New',
      subtitle: 'Development',
      href: '/new-development'
    },
    {
      image:'/international.png',
      title: 'International',
      subtitle: 'Properties',
      href: '/international'
    }
  ];

  // Add refs for each property section
  const residentialRef = useRef(null);
  const soldRef = useRef(null);
  const CommercialRef = useRef(null);
  const rentalRef = useRef(null);
  const auctionRef = useRef(null);
  const newDevRef = useRef(null);
  const internationalRef = useRef(null);

  // Map categories to refs (order must match grid order)
  const sectionRefs = [
    residentialRef, // Residential
    CommercialRef,           // Commercial (no section)
    soldRef,        // Sold
    rentalRef,      // Rental
    auctionRef,     // Auction
    newDevRef,      // New Development
    internationalRef // International
  ];

  useEffect(() => {
    // Fetch property types from API
    async function fetchPropertyTypes() {
      setLoadingTypes(true);
      setTypesError(null);
      try {
        const res = await fetch('http://localhost:5000/api/listings/list/properties', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        let listings = [];
        if (Array.isArray(data?.data)) {
          listings = data.data;
        }
        const types = Array.from(new Set(listings.map(item => item.propertyType || item.prop_type).filter(Boolean)));
        setPropertyTypes(types);
      } catch (err) {
        setTypesError('Failed to load property types');
      } finally {
        setLoadingTypes(false);
      }
    }
    fetchPropertyTypes();
  }, []);

  return (
    <div className="min-h-screen ">
      <Header></Header>

      <main className="max-w-full mx-auto px-4 mt-10 md:mt-35 py-8 md:py-4">
        {/* Icon and Title */}
        <div className="text-center mb-10">
        <div className="mx-auto md:mb-4 mb-2 relative w-15 h-15 md:w-[90px] md:h-[90px]">
  <Image 
    src="/property.jpg" 
    alt="property" 
    fill 
    className="object-cover rounded-full"
  />
</div>

  <h1 className="text-3xl mx-10 md:text-2xl md:tracking-[0.2em] tracking-[0.1em]font-normal mb-4">Properties In Saudi Arabia</h1>
  <p className="text-[0.8rem] md:text-[0.9rem] md:tracking-[0.1em] text-gray-600 max-w-full mx-auto px-4">
    Looking For A New Home And Not Sure Which Neighborhood Suits You? Explore Everything You 
  </p>
  <p className="text-[0.8rem] md:text-[0.9rem] md:tracking-[0.1em] text-gray-600 max-w-full mx-auto px-4">
   Need To Know About The Communities In Doha. View Nearby Locations, Landmarks, Reviews, 
  </p>
  <p className="text-[0.8rem] md:text-[0.9rem] md:tracking-[0.1em] text-gray-600 max-w-full mx-auto px-4">
  Prices, FAQ&rsquo;s, And More.
</p>

</div>

{/* Search Section */}
<div className="max-w-[920px] mx-auto md:mb-20">
  {/* Laptop View (unchanged) */}
  <div className="hidden md:flex flex-row w-full shadow-md overflow-hidden rounded-full border">
    {/* Search Input */}
    <div className="flex-1 relative">
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
      <input
        type="text"
        placeholder="City, Area or Building"
        className="w-full pl-12 pr-4 py-3 text-sm md:text-base text-gray-800 focus:outline-none focus:ring-0"
      />
    </div>

    <div className="md:w-48 w-20 border-l border-gray-400 flex items-center">
  <select className="w-full py-3 px-4 text-sm md:text-base bg-white text-gray-700 focus:outline-none focus:ring-0">
    <option value="">Property Type</option>
    <option value="apartment">Apartment</option>
    <option value="villa">Villa</option>
    <option value="office">Office</option>
  </select>
</div>


    {/* Search Button */}
    <button className="bg-[rgba(202,3,32,255)] text-white px-12 py-3 text-sm md:text-base font-medium border-none outline-none">
  Search
</button>

  </div>



  {/* Mobile View (search input and dropdown in one group, button below) */}
  <div className="md:hidden flex flex-col gap-2 mx-4">
  <div className="flex w-full max-w-md mx-auto">
  {/* Search Input */}
  <div className="flex-1 relative">
    <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
    <input
      type="text"
      placeholder="City, Area or Building"
      className="w-full pl-10 pr-2 py-2 text-[0.8rem] md:text-sm border border-gray-500 rounded-l-lg focus:outline-none focus:ring-0"
    />
  </div>

  {/* Property Type Dropdown */}
  <select className="w-32 py-2 px-2 text-sm border border-gray-500 border-l-0 rounded-r-lg focus:outline-none focus:ring-0">
    <option value="">Type</option>
    <option value="apartment">Apartment</option>
    <option value="villa">Villa</option>
  </select>
</div>

    {/* Search Button (full width below) */}
    <button className="bg-[rgba(202,3,32,255)] text-white justify-center items-center font-semibold w-30 py-2 text-xs rounded-full mt-1 focus:outline-none focus:ring-0 block mx-auto">
  Search
</button>
  </div>
</div>


        {/* Property Categories */}
        {/* Mobile: horizontal scroll for first 4, rest centered below */}
        {/* <div className="md:hidden">
          <div className="flex overflow-x-auto gap-4 pb-2 mx-1 mt-2">
            {categories.slice(0, 4).map((category, index) => (
              <button
                key={index}
                type="button"
                className="flex-shrink-0 focus:outline-none"
                onClick={() => {
                  const ref = sectionRefs[index];
                  if (ref && ref.current) {
                    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                style={{ background: 'none', border: 'none', padding: 0, margin: 0, width: 'auto' }}
              >
                <div className="flex flex-col items-center p-2 rounded-lg text-center bg-white">
                  <Image 
                    src={category.image} 
                    alt={category.title + ' icon'} 
                    width={48} 
                    height={48} 
                    className="object-contain w-8 h-8" 
                  />
                  <p className="text-[0.5rem] text-gray-700 mt-1">{category.title}</p>
                  <p className="text-[0.5rem] text-gray-700">{category.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {categories.slice(4).map((category, index) => (
              <button
                key={index + 4}
                type="button"
                className="focus:outline-none"
                onClick={() => {
                  const ref = sectionRefs[index + 4];
                  if (ref && ref.current) {
                    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                style={{ background: 'none', border: 'none', padding: 0, margin: 0, width: 'auto' }}
              >
                <div className="flex flex-col items-center p-2 rounded-lg text-center bg-white">
                  <Image 
                    src={category.image} 
                    alt={category.title + ' icon'} 
                    width={48} 
                    height={48} 
                    className="object-contain w-8 h-8" 
                  />
                  <p className="text-[0.5rem] text-gray-700 mt-1">{category.title}</p>
                  <p className="text-[0.5rem] text-gray-700">{category.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </div> */}
        {/* Desktop: grid layout */}
        {/* <div className="hidden md:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 max-w-full mx-12">
          {categories.map((category, index) => (
            <button
              key={index}
              type="button"
              className="group focus:outline-none"
              onClick={() => {
                const ref = sectionRefs[index];
                if (ref && ref.current) {
                  ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              style={{ background: 'none', border: 'none', padding: 0, margin: 0, width: '100%' }}
            >
              <div className="flex flex-col items-center p-0 rounded-lg text-center ">
                <div className="mb-2">
                  <Image 
                    src={category.image} 
                    alt={category.title + ' icon'} 
                    width={48} 
                    height={48} 
                    className="object-contain w-12 h-12" 
                  />
                </div>
                <p className="text-base text-gray-500 mb-1">{category.title}</p>
                <p className="text-base text-gray-500">{category.subtitle}</p>
              </div>
            </button>
          ))}
        </div> */}
        {/* <div className="flex justify-center items-center md:my-22 my-4 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-8">
  <hr className="md:w-140 w-50 mx-auto bg-[rgba(202,3,32,255)] border-0 h-[1.5px]" />
</div> */}
        {/* New Property Cards Section */}
        <div ref={residentialRef} className="md:mt-10 mt-10 md:mx-12 scroll-mt-24">
  <div className="flex items-center justify-between md:mx-10 flex-wrap gap-4">
    <p className="flex items-center text-xl md:text-3xl font-normal"> 
      <Image
        src="/residential.png"
        alt="Residential"
        width={40}
        height={40}
        className="w-8 h-8 md:w-16 md:h-16 mr-5"></Image>
      <span className="text-gray-500 ">Residential Active Properties</span>
    </p>

    {/* Right: Button */}
    <Link href="/properties/active">
    <button className="hidden md:flex text-sm md:text-base font-semibold bg-[rgba(202,3,32,255)] text-white px-4 py-2 rounded-lg hover:bg-red-950 transition">
      Click Here To View All Residential Properties
    </button>
    </Link>
    </div>
    


          {/* First Home Block */}
          <div className="mb-2 md:mb-10">
           {/* First Home Block */}
      <div className="relative w-full px-5 md:px-10 md:py-10 py-5 bg-white">
    {loadingListings ? (
      <div className="text-center text-gray-500 py-10">Loading listings...</div>
    ) : listingsError ? (
      <div className="text-center text-red-500 py-10">{listingsError}</div>
    ) : listings.length === 0 ? (
      <div className="text-center text-gray-500 py-10">No listings found.</div>
    ) : (
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar w-full"
      >
        {listings.map((property, index) => (
          <div
            key={property._kw_meta?.id || property.id || index}
            className="flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 max-w-[80%] sm:max-w-[50%] md:max-w-[30%] md:h-[330px] h-[200px] rounded-xl overflow-hidden shadow-md bg-white relative"
          >
            <Image
              src={
                property.image ||
                (Array.isArray(property.images) && property.images[0]) ||
                (Array.isArray(property.photos) && property.photos[0]?.ph_url) ||
                '/property.jpg'
              }
              alt={property.title || property.prop_type || 'Property'}
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white drop-shadow">
              <h3 className="text-md font-semibold">{property.title || property.prop_type || 'Property'}</h3>
              <p className="text-sm">
                {typeof property.location === 'string'
                  ? property.location
                  : property.city || property.region || property.municipality || '-'}
              </p>
            </div>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {property.price ? `SAR ${property.price}` : property.current_list_price || ''}
            </div>
          </div>
        ))}
      </div>
    )}
    {showScrollButton && !loadingListings && listings.length > 0 && (
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 \
              bg-white border border-gray-300 rounded-full p-2 md:p-4 \
              shadow-md z-10 hover:shadow-lg transition"
      >
        <ChevronRight 
          className="cursor-pointer text-[rgba(202,3,32,255)] w-6 h-6 md:w-[50px] md:h-[50px]" 
        />
      </button>
    )}
</div>
           
          </div>
        </div>
        <Link href="/properties/active">
    <button className="block md:hidden mx-auto text-sm mb-10 md:text-base font-semibold bg-[rgba(202,3,32,255)] text-white px-4 py-1 rounded-lg hover:bg-red-700 transition">
      Click Here
    </button>
    </Link>
     {/* New Property Cards Section */}
     <div ref={CommercialRef} className="md:mt-10 mt-10 md:mx-12 scroll-mt-24">
  <div className="flex items-center justify-between md:mx-10 flex-wrap gap-4">
    <p className="flex items-center text-xl md:text-3xl font-normal"> 
      <Image
        src="/commercial.png"
        alt="commercial"
        width={40}
        height={40}
        className="w-8 h-8 md:w-16 md:h-16 mr-5"></Image>
      <span className="text-gray-500 ">Commercial Active Properties</span>
    </p>

    {/* Right: Button */}
    <Link href="/properties/active">
    <button className="hidden md:flex text-sm md:text-base font-semibold bg-[rgba(202,3,32,255)] text-white px-4 py-2 rounded-lg hover:bg-red-950 transition">
      Click Here To View All Commercial Active Properties
    </button>
    </Link>
    </div>
    


          {/* First Home Block */}
          <div className="mb-2 md:mb-10">
           {/* First Home Block */}
      <div className="relative w-full px-5 md:px-10 md:py-10 py-5 bg-white">
    {loadingListings ? (
      <div className="text-center text-gray-500 py-10">Loading listings...</div>
    ) : listingsError ? (
      <div className="text-center text-red-500 py-10">{listingsError}</div>
    ) : listings.length === 0 ? (
      <div className="text-center text-gray-500 py-10">No listings found.</div>
    ) : (
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar w-full"
      >
        {listings.map((property, index) => (
          <div
            key={property._kw_meta?.id || property.id || index}
            className="flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 max-w-[80%] sm:max-w-[50%] md:max-w-[30%] md:h-[330px] h-[200px] rounded-xl overflow-hidden shadow-md bg-white relative"
          >
            <Image
              src={
                property.image ||
                (Array.isArray(property.images) && property.images[0]) ||
                (Array.isArray(property.photos) && property.photos[0]?.ph_url) ||
                '/property.jpg'
              }
              alt={property.title || property.prop_type || 'Property'}
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white drop-shadow">
              <h3 className="text-md font-semibold">{property.title || property.prop_type || 'Property'}</h3>
              <p className="text-sm">
                {typeof property.location === 'string'
                  ? property.location
                  : property.city || property.region || property.municipality || '-'}
              </p>
            </div>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
              {property.price ? `SAR ${property.price}` : property.current_list_price || ''}
            </div>
          </div>
        ))}
      </div>
    )}
    {showScrollButton && !loadingListings && listings.length > 0 && (
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 \
              bg-white border border-gray-300 rounded-full p-2 md:p-4 \
              shadow-md z-10 hover:shadow-lg transition"
      >
        <ChevronRight 
          className="cursor-pointer text-[rgba(202,3,32,255)] w-6 h-6 md:w-[50px] md:h-[50px]" 
        />
      </button>
    )}
</div>
           
          </div>
        </div>
        <Link href="/properties/active">
    <button className="block md:hidden mx-auto text-sm mb-10 md:text-base font-semibold bg-[rgba(202,3,32,255)] text-white px-4 py-1 rounded-lg hover:bg-red-700 transition">
      Click Here
    </button>
    </Link>
  
         {/* sold Property Cards Section */}
         <div ref={soldRef} className="md:mt-10 mt-4 md:mx-12 scroll-mt-24">
  <div className="flex items-center justify-between md:mx-10">
    <p className="flex items-center text-xl md:text-3xl font-normal"> 
      <Image
        src="/sold3.png"
        alt="Residential"
        width={40} 
        height={40}
        className="w-8 h-8 md:w-16 md:h-16 mr-5"
      />
      <span className="text-gray-500">Sold Properties</span>
    </p>

    {/* Right: Button */}
    <Link href="/properties/sold"> 
    <button className="hidden md:flex text-sm md:text-base font-semibold bg-[rgba(202,3,32,255)] text-white px-4 py-2 rounded-lg hover:bg-red-950 transition">
      Click Here To View All Sold Properties
    </button>
    </Link>
    </div>
   
  

  {/* First Home Block */}
  <div className="mb-2 md:mb-10">
   {/* First Home Block */}
   <div className="relative w-full px-6 md:px-10 md:py-10 py-5 bg-white">
  {loadingListings ? (
    <div className="text-center text-gray-500 py-10">Loading listings...</div>
  ) : listingsError ? (
    <div className="text-center text-red-500 py-10">{listingsError}</div>
  ) : listings.length === 0 ? (
    <div className="text-center text-gray-500 py-10">No listings found.</div>
  ) : (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar w-full"
    >
      {listings.map((property, index) => (
        <div
          key={property._kw_meta?.id || property.id || index}
          className="flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 max-w-[80%] sm:max-w-[50%] md:max-w-[30%] md:h-[330px] h-[200px] rounded-xl overflow-hidden shadow-md bg-white relative"
        >
          <Image
            src={
              property.image ||
              (Array.isArray(property.images) && property.images[0]) ||
              (Array.isArray(property.photos) && property.photos[0]?.ph_url) ||
              '/property.jpg'
            }
            alt={property.title || property.prop_type || 'Property'}
            fill
            className="w-full h-full object-cover"
          />
       
          <div className="absolute bottom-4 left-4 text-white drop-shadow">
            <h3 className="text-md font-semibold">{property.title || property.prop_type || 'Property'}</h3>
            <p className="text-sm">
              {typeof property.location === 'string'
                ? property.location
                : property.city || property.region || property.municipality || '-'}
            </p>
          </div>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {property.price ? `SAR ${property.price}` : property.current_list_price || ''}
          </div>
        </div>
      ))}
    </div>
  )}

  {showScrollButton && !loadingListings && listings.length > 0 && (
    <button
    onClick={scrollRight}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 
               bg-white border border-gray-300 rounded-full p-2 md:p-4 
               shadow-md z-10 hover:shadow-lg transition"
  >
   <ChevronRight 
   className="cursor-pointer text-[rgba(202,3,32,255)] w-6 h-6 md:w-[50px] md:h-[50px]" 
 />
 
  </button>
  )}
</div>
  </div>


        </div>
        <Link href="/properties/sold">
    <button className="block md:hidden text-sm mb-10 md:text-base mx-auto font-semibold bg-[rgba(202,3,32,255)] text-white px-4 py-1 rounded-lg hover:bg-red-700 transition">
      Click Here
    </button>
    </Link>
         {/* sold Property Cards Section */}
         <div ref={rentalRef} className="md:mt-10 mt-4 md:mx-12 scroll-mt-24">
  <div className="flex items-center justify-between md:mx-10 flex-wrap gap-4">
    <p className="flex items-center text-xl md:text-3xl font-normal"> 
      <Image src="/rental.png" alt="Residential" width={40} 
  height={40}
  className="w-8 h-8 md:w-16 md:h-16 mr-5"></Image>
      <span className="text-gray-500">Rental Properties</span>
    </p>

    {/* Right: Button */}
    <Link href="/properties/rent">
    <button className="hidden md:flex text-sm md:text-base font-semibold bg-[rgba(202,3,32,255)] text-white px-4 py-2 rounded-lg hover:bg-red-950 transition">
      Click Here To View All Rental Properties
    </button>
    </Link>
    </div>
   



          {/* First Home Block */}
          <div className="mb-2 md:mb-10">
            {/* First Home Block */}
      <div className="relative w-full md:px-10 px-6 md:py-10 py-5 bg-white">
  {loadingListings ? (
    <div className="text-center text-gray-500 py-10">Loading listings...</div>
  ) : listingsError ? (
    <div className="text-center text-red-500 py-10">{listingsError}</div>
  ) : listings.length === 0 ? (
    <div className="text-center text-gray-500 py-10">No listings found.</div>
  ) : (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar w-full"
    >
      {listings.map((property, index) => (
        <div
          key={property._kw_meta?.id || property.id || index}
          className="flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 max-w-[80%] sm:max-w-[50%] md:max-w-[30%] md:h-[330px] h-[200px] rounded-xl overflow-hidden shadow-md bg-white relative"
        >
          <Image
            src={
              property.image ||
              (Array.isArray(property.images) && property.images[0]) ||
              (Array.isArray(property.photos) && property.photos[0]?.ph_url) ||
              '/property.jpg'
            }
            alt={property.title || property.prop_type || 'Property'}
            fill
            className="w-full h-full object-cover"
          />
       
          <div className="absolute bottom-4 left-4 text-white drop-shadow">
            <h3 className="text-md font-semibold">{property.title || property.prop_type || 'Property'}</h3>
            <p className="text-sm">
              {typeof property.location === 'string'
                ? property.location
                : property.city || property.region || property.municipality || '-'}
            </p>
          </div>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {property.price ? `SAR ${property.price}` : property.current_list_price || ''}
          </div>
        </div>
      ))}
    </div>
  )}

  {showScrollButton && !loadingListings && listings.length > 0 && (
     <button
     onClick={scrollRight}
     className="absolute right-0 top-1/2 transform -translate-y-1/2 
                bg-white border border-gray-300 rounded-full p-2 md:p-4 
                shadow-md z-10 hover:shadow-lg transition"
   >
    <ChevronRight 
    className="cursor-pointer text-[rgba(202,3,32,255)] w-6 h-6 md:w-[50px] md:h-[50px]" 
  />
  
   </button>
  )}
</div>
           
          </div>
        </div>
        <Link href="/properties/rent">
    <button className="block md:hidden mx-auto text-sm mb-10 md:text-base font-semibold bg-[rgba(202,3,32,255)] text-white px-4 py-1 rounded-lg hover:bg-red-700 transition">
      Click Here
    </button>
    </Link>
         {/* sold Property Cards Section */}
         <div ref={auctionRef} className="md:mt-10 mt-4 md:mx-12 scroll-mt-24">
  <div className="flex items-center justify-between md:mx-10 flex-wrap gap-4">
    <p className="flex items-center text-xl md:text-3xl font-normal"> 
      <Image src="/auction.png" alt="Residential"width={40} 
  height={40}
  className="w-8 h-8 md:w-16 md:h-16 mr-5"></Image>
      <span className="text-gray-500">Auction Properties</span>
    </p>

    {/* Right: Button */}
    <Link href="/properties/auction">
    <button className="hidden md:flex text-sm md:text-base font-semibold bg-[rgba(202,3,32,255)] text-white px-4 py-2 rounded-lg hover:bg-red-950 transition">
      Click Here To View All Auction Properties
    </button>
    </Link>
    
  </div>

 
          {/* First Home Block */}
          <div className=" mb-2 md:mb-10">
           {/* First Home Block */}
      <div className="relative w-full md:px-10 px-6 md:py-10 py-5 bg-white">
  {loadingListings ? (
    <div className="text-center text-gray-500 py-10">Loading listings...</div>
  ) : listingsError ? (
    <div className="text-center text-red-500 py-10">{listingsError}</div>
  ) : listings.length === 0 ? (
    <div className="text-center text-gray-500 py-10">No listings found.</div>
  ) : (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar w-full"
    >
      {listings.map((property, index) => (
        <div
          key={property._kw_meta?.id || property.id || index}
          className="flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 max-w-[80%] sm:max-w-[50%] md:max-w-[30%] md:h-[330px] h-[200px] rounded-xl overflow-hidden shadow-md bg-white relative"
        >
          <Image
            src={
              property.image ||
              (Array.isArray(property.images) && property.images[0]) ||
              (Array.isArray(property.photos) && property.photos[0]?.ph_url) ||
              '/property.jpg'
            }
            alt={property.title || property.prop_type || 'Property'}
            fill
            className="w-full h-full object-cover"
          />
       
          <div className="absolute bottom-4 left-4 text-white drop-shadow">
            <h3 className="text-md font-semibold">{property.title || property.prop_type || 'Property'}</h3>
            <p className="text-sm">
              {typeof property.location === 'string'
                ? property.location
                : property.city || property.region || property.municipality || '-'}
            </p>
          </div>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {property.price ? `SAR ${property.price}` : property.current_list_price || ''}
          </div>
        </div>
      ))}
    </div>
  )}

  {showScrollButton && !loadingListings && listings.length > 0 && (
    <button
    onClick={scrollRight}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 
               bg-white border border-gray-300 rounded-full p-2 md:p-4 
               shadow-md z-10 hover:shadow-lg transition"
  >
   <ChevronRight 
   className="cursor-pointer text-[rgba(202,3,32,255)] w-6 h-6 md:w-[50px] md:h-[50px]" 
 />
 
  </button>
  )}
</div>
           
          </div>
        </div>
        <Link href="/properties/auction">
    <button className="block md:hidden mx-auto mb-10 text-sm md:text-base font-semibold bg-[rgba(202,3,32,255)] text-white px-4 py-1 rounded-lg hover:bg-red-700 transition">
      Click Here
    </button>
    </Link>
         {/* sold Property Cards Section */}
         <div ref={newDevRef} className="md:mt-10 mt-4 md:mx-12 scroll-mt-24">
  <div className="flex items-center justify-between md:mx-10 flex-wrap gap-4">
    <p className="flex items-center text-xl md:text-3xl font-normal"> 
      <Image
        src="/newdevelopment.png"
        alt="Residential"
        width={40} 
        height={40}
        className="w-8 h-8 md:w-16 md:h-16 mr-5"></Image>
      <span className="text-gray-500">New Development</span>
    </p>

    {/* Right: Button */}
    <Link href="/properties/newdevelopment">
    <button className="hidden md:flex text-sm md:text-base font-semibold bg-[rgba(202,3,32,255)] text-white px-4 py-2 rounded-lg hover:bg-red-950 transition">
      Click Here To View All New Development Properties
    </button>
    </Link>
    

  </div>
 

          {/* First Home Block */}
          <div className=" mb-2 md:mb-10">
         {/* First Home Block */}
      <div className="relative w-full px-6 md:px-10 md:py-10 py-5 bg-white">
  {loadingListings ? (
    <div className="text-center text-gray-500 py-10">Loading listings...</div>
  ) : listingsError ? (
    <div className="text-center text-red-500 py-10">{listingsError}</div>
  ) : listings.length === 0 ? (
    <div className="text-center text-gray-500 py-10">No listings found.</div>
  ) : (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar w-full"
    >
      {listings.map((property, index) => (
        <div
          key={property._kw_meta?.id || property.id || index}
          className="flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 max-w-[80%] sm:max-w-[50%] md:max-w-[30%] md:h-[330px] h-[200px] rounded-xl overflow-hidden shadow-md bg-white relative"
        >
          <Image
            src={
              property.image ||
              (Array.isArray(property.images) && property.images[0]) ||
              (Array.isArray(property.photos) && property.photos[0]?.ph_url) ||
              '/property.jpg'
            }
            alt={property.title || property.prop_type || 'Property'}
            fill
            className="w-full h-full object-cover"
          />
       
          <div className="absolute bottom-4 left-4 text-white drop-shadow">
            <h3 className="text-md font-semibold">{property.title || property.prop_type || 'Property'}</h3>
            <p className="text-sm">
              {typeof property.location === 'string'
                ? property.location
                : property.city || property.region || property.municipality || '-'}
            </p>
          </div>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {property.price ? `SAR ${property.price}` : property.current_list_price || ''}
          </div>
        </div>
      ))}
    </div>
  )}

  {showScrollButton && !loadingListings && listings.length > 0 && (
    <button
    onClick={scrollRight}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 
               bg-white border border-gray-300 rounded-full p-2 md:p-4 
               shadow-md z-10 hover:shadow-lg transition"
  >
   <ChevronRight 
   className="cursor-pointer text-[rgba(202,3,32,255)] w-6 h-6 md:w-[50px] md:h-[50px]" 
 />
 
  </button>
  )}
</div>
           
          </div>
        </div>
        <Link href="/properties/newdevelopment">
  <button className="block md:hidden mx-auto text-sm mb-10 md:text-base font-semibold bg-[rgba(202,3,32,255)] text-white px-4 py-1 rounded-lg hover:bg-red-700 transition">
    Click Here
  </button>
</Link>
         {/* sold Property Cards Section */}
         <div ref={internationalRef} className="md:mt-10 mt-4 md:mx-12 scroll-mt-24">
  <div className="flex items-center justify-between md:mx-10 flex-wrap gap-4">
    <p className="flex items-center text-xl md:text-3xl font-normal"> 
      <Image
        src="/international.png"
        alt="Residential"
        width={40} 
        height={40}
        className="w-8 h-8 md:w-16 md:h-16 mr-5"></Image>
      <span className="text-gray-500">International Properties</span>
    </p>

    {/* Right: Button */}
    <Link href="https://www.kw.com/search/sale?viewport=56.41671222773751%2C120.63362495324327%2C-14.684966046563696%2C-6.807781296756721">
    <button className="hidden md:flex text-sm font-semibold md:text-base  bg-[rgba(202,3,32,255)] text-white px-4 py-2 rounded-lg hover:bg-red-950 transition">
      Click Here To View All International Properties
    </button>
    </Link>
    </div>
    
 


          {/* First Home Block */}
          <div className=" mb-2">
            {/* First Home Block */}
      <div className="relative w-full px-6 md:px-10 md:py-10 py-5 bg-white">
  {loadingListings ? (
    <div className="text-center text-gray-500 py-10">Loading listings...</div>
  ) : listingsError ? (
    <div className="text-center text-red-500 py-10">{listingsError}</div>
  ) : listings.length === 0 ? (
    <div className="text-center text-gray-500 py-10">No listings found.</div>
  ) : (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar w-full"
    >
      {listings.map((property, index) => (
        <div
          key={property._kw_meta?.id || property.id || index}
          className="flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 max-w-[80%] sm:max-w-[50%] md:max-w-[30%] md:h-[330px] h-[200px] rounded-xl overflow-hidden shadow-md bg-white relative"
        >
          <Image
            src={
              property.image ||
              (Array.isArray(property.images) && property.images[0]) ||
              (Array.isArray(property.photos) && property.photos[0]?.ph_url) ||
              '/property.jpg'
            }
            alt={property.title || property.prop_type || 'Property'}
            fill
            className="w-full h-full object-cover"
          />
       
          <div className="absolute bottom-4 left-4 text-white drop-shadow">
            <h3 className="text-md font-semibold">{property.title || property.prop_type || 'Property'}</h3>
            <p className="text-sm">
              {typeof property.location === 'string'
                ? property.location
                : property.city || property.region || property.municipality || '-'}
            </p>
          </div>
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
            {property.price ? `SAR ${property.price}` : property.current_list_price || ''}
          </div>
        </div>
      ))}
    </div>
  )}

  {showScrollButton && !loadingListings && listings.length > 0 && (
    <button
    onClick={scrollRight}
    className="absolute right-0 top-1/2 transform -translate-y-1/2 
               bg-white border border-gray-300 rounded-full p-2 md:p-4 
               shadow-md z-10 hover:shadow-lg transition"
  >
   <ChevronRight 
   className="cursor-pointer text-[rgba(202,3,32,255)] w-6 h-6 md:w-[50px] md:h-[50px]" 
 />
 
  </button>
  )}
</div>
           
          </div>
        </div>
        <Link href="https://www.kw.com/search/sale?viewport=56.41671222773751%2C120.63362495324327%2C-14.684966046563696%2C-6.807781296756721">
    <button className="block md:hidden mx-auto mb-10 text-sm md:text-base font-semibold bg-[rgba(202,3,32,255)] text-white px-4 py-1 rounded-lg hover:bg-red-700 transition">
      Click Here
    </button>
    </Link>
      </main>
      {/* How Will You Think image and KW logo bar */}
      <div className="flex flex-col">
        <div className="order-1 md:order-2 flex flex-col items-center justify-center">
          <Image
            src="/howwillyouthink.png"
            alt="How Will You Thrive"
            width={800}
            height={400}
            className="w-70 h-20 md:w-[950px] md:h-[400px] object-contain"
          />
          <button className="bg-[rgba(202,3,32,255)] w-40 text-white px-8 py-1.5 text-xs font-semibold rounded-full block mx-auto md:hidden mt-4 mb-4">
            JOIN US
          </button>
        </div>
        {/* Red bar with centered KW logo */}
        <div className="order-2 md:order-1 bg-[rgba(202,3,32,255)] flex items-center justify-center h-[25px] md:h-[80px]">
          <Image
            src="/kwline1.png"
            alt="KW Logo Center"
            width={80}
            height={80}
            className="object-contain mx-auto w-7 h-7 md:w-20 md:h-20"
          />
        </div>
      </div>
      {/* Red horizontal line */}
      <div className="hidden md:flex justify-center items-center my-20 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-8">
        <hr className="md:w-160 w-60 mx-auto bg-[rgba(202,3,32,255)] border-0  h-[1.5px]" />
      </div>
      {/* Dynamic Property Types Section */}
     
      <Footer />
    </div>
  );
};

export default Properties;
