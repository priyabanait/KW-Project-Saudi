'use client'

import { useState,useRef,useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, MessageCircle, Bed, Bath, Square, MapPin } from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/footer';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { FaBed, FaBath, FaVideo, FaPhoneAlt, FaEnvelope, FaRegCalendarAlt, FaRulerCombined, FaSnowflake, FaHome, FaParking, FaMoneyBillWave, FaCar } from 'react-icons/fa';
import { MdOutlineSquareFoot } from 'react-icons/md';
import { PiMapPinLineThin } from 'react-icons/pi';
import { FaArrowLeft ,FaChevronLeft ,FaChevronRight  } from 'react-icons/fa';

import Header from '@/components/header';
import Box from '@/components/box';
export default function PropertyListing() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);  
  const [isAtTop, setIsAtTop] = useState(true);  
  const prevScrollY = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // simulate toggle
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const mapSectionRef = useRef(null);
  const propertyDetailsRef = useRef(null);
  const [similarImageIndices, setSimilarImageIndices] = useState([]);
  const [similarLoading, setSimilarLoading] = useState([]);

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

  useEffect(() => {
    const stored = localStorage.getItem('selectedProperty');
    console.log(stored);
    
    if (stored) {
      const propertyData = JSON.parse(stored);
      setProperty(propertyData);
      // Fetch similar properties after setting the property
      fetchSimilarProperties(propertyData);
    }
  }, []);

  // Function to fetch similar properties
  const fetchSimilarProperties = async (currentProperty) => {
    if (!currentProperty) return;
    
    setLoadingSimilar(true);
    try {
      // Calculate price range for similar properties (±20% of current property price)
      const currentPrice = currentProperty.current_list_price || currentProperty.price || 0;
      const minPrice = Math.max(0, currentPrice * 0.8);
      const maxPrice = currentPrice * 1.2;

      const response = await fetch('https://kw-backend-q6ej.vercel.app/api/listings/list/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property_category: currentProperty.prop_type || currentProperty.property_type,
          property_subtype: currentProperty.property_subtype || currentProperty.subtype,
          min_price: minPrice,
          max_price: maxPrice,
          limit: 6, // Limit to 6 similar properties
          page: 1
        })
      });

      const data = await response.json();
      
      if (data.success && data.data) {
        // Filter out the current property and get up to 6 similar properties
        const filtered = data.data
          .filter(p => p._kw_meta?.id !== currentProperty._kw_meta?.id)
          .slice(0, 6);
        
        setSimilarProperties(filtered);
      }
    } catch (error) {
      console.error('Error fetching similar properties:', error);
    } finally {
      setLoadingSimilar(false);
    }
  };

  const toggleSubmenu = (key) => {
    setOpenSubmenu(prev => (prev === key ? null : key));
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const bedIconUrl = "/bed.png";
  const bathIconUrl = "/bath.png";
  const areaIconUrl = "/area.png";
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+974',
    phone: '',
    message: property ? `I'm interested in ${property.prop_type}. Please provide me more details about this property.` : ''
  });

  // Use property images or fallback
  const propertyImages = property?.photos?.map(photo => photo.ph_url) || [
    "/placeholder1.jpg",
    "/placeholder2.jpg",
    "/placeholder3.jpg",
    "/placeholder4.jpg",
    "/placeholder5.jpg",
    "/placeholder6.jpg",
    "/placeholder7.jpg"
  ];

  // Use property images for thumbnails or fallback
  const thumbnailImages = propertyImages.slice(0, 8);

  // Tab state
  const [activeTab, setActiveTab] = useState('overview');
  const tabList = [
    { key: 'overview', label: 'OVERVIEW' },
    
    { key: 'property details', label: 'PROPERTY DETAILS' },
    { key: 'map', label: 'MAP LOCATION' },
    { key: 'tour', label: '360 TOUR' },
  ];
  const features = [
    'Luxury Gated development',
    '2 Separate units',
    'Guest WC',
    'Air conditioning',
    '616 Sq Ft Double garage',
    '6 Ensuite bedrooms',
    '24-hour concierge',
    '2 Office spaces',
  ];
  const leftFeatures = features.slice(0, 4);
  const rightFeatures = features.slice(4);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyImages.length) % propertyImages.length);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Enquiry submitted successfully!');
  };

  const handleTabClick = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    if (activeTab === 'map' && mapSectionRef.current) {
      // Scroll to the map heading with an offset for sticky headers
      const yOffset = -100; // adjust as needed for your sticky header height
      const y = mapSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // Remove highlight effect (do not add or remove ring classes)
    }
  
    if (activeTab === 'property details' && propertyDetailsRef.current) {
      propertyDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        window.scrollBy({ top: -80, left: 0, behavior: 'smooth' });
      }, 400);
    }
  }, [activeTab]);
  

  if (!property) {
    return <div className="p-8 text-center">Loading property details...</div>;
  }

  // Helper function to format price
  const formatPrice = (price) => {
    if (!price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'QAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Helper function to get property type display
  const getPropertyTypeDisplay = () => {
    const beds = property.total_bed || property.beds || 0;
    const type = property.prop_type || property.property_type || 'Property';
    return `${beds} bed ${type}`;
  };

  // Helper function to get property status
  const getPropertyStatus = () => {
    if (property.status) return property.status;
    if (property.list_type === 'rent') return 'For Rent';
    if (property.list_type === 'sale') return 'For Sale';
    return 'Active';
  };

  // Helper function to get property images
  const getPropertyImages = (property) => {
    const fallbackImages = [
      "/placeholder1.jpg",
      "/placeholder2.jpg",
      "/placeholder3.jpg",
      "/placeholder4.jpg",
      "/placeholder5.jpg",
      "/placeholder6.jpg",
      "/placeholder7.jpg"
    ];
    return property?.photos?.map(photo => photo.ph_url) || fallbackImages;
  };

  // Helper function to get property address
  const getPropertyAddress = (property) => {
    return property.list_address?.address || 
           property.property_address || 
           property.address || 
           property.full_address || 
           'Address not available';
  };

  function SimilarPropertyCard({
    similarProperty,
    propertyImages,
    currentImageIndex,
    loading,
    onNextImage,
    onPrevImage,
    onImageLoad,
    bedIconUrl,
    bathIconUrl,
    areaIconUrl
  }) {
    return (
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden"
        onClick={() => {
          localStorage.setItem('selectedProperty', JSON.stringify(similarProperty));
          window.location.href = '/propertydetails';
        }}
        style={{ cursor: 'pointer' }}
      >
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-white"></div>
            </div>
          )}
          <Image
            src={propertyImages[currentImageIndex] || '/placeholder1.jpg'}
            alt={similarProperty.prop_type || 'Property Image'}
            width={500}
            height={300}
            className="w-full h-40 object-cover rounded-lg"
            onLoadingComplete={onImageLoad}
          />
          <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-between px-2">
            <button onClick={onPrevImage} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={onNextImage} className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors">
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {propertyImages.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full ${currentImageIndex === idx ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
          <div className="absolute top-2 left-2 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-medium z-10">
            360 Virtual Tour
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm md:text-xl">{similarProperty.prop_type}</h3>
          <p className="text-xs text-gray-500">{similarProperty.list_address?.address}</p>
          <div className="flex w-full items-center gap-2 text-sm my-2">
            <span className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-gray-200 p-2">
              <span className="relative h-4 w-4">
                <Image src={bedIconUrl} alt="bed" fill className="object-contain" />
              </span>
              {similarProperty.total_bed}
            </span>
            <span className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-gray-200 p-2">
              <span className="relative h-4 w-4">
                <Image src={bathIconUrl} alt="bath" fill className="object-contain" />
              </span>
              {similarProperty.total_bath}
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-gray-200 px-3 py-2 whitespace-nowrap">
              <span className="relative h-4 w-4">
                <Image src={areaIconUrl} alt="area" fill className="object-contain" />
              </span>
              {similarProperty.lot_size_area} {similarProperty.lot_size_units}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-lg font-bold">{similarProperty.current_list_price} QAR/month</p>
            <button className="text-sm text-white p-2 rounded-lg bg-[rgba(202,3,32,255)]">Enquire now</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-6 md:p-8">
      <Header />
      <div className="absolute top-0 left-0 w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-[rgba(202,3,32,255)] z-0"></div>
<div className='relative bg-gray-100'>
{/* Hero Section */}
<div className="relative min-h-[60vh] md:px-20  md:h-[130vh] w-full">

  {/* Back to Search and Price */}
  <div className="w-full px-4  flex flex-col items-start gap-2 ml-6 mb-4 md:mb-6">
  <div className="flex items-center gap-2 mt-30 md:mt-30 md:gap-3 border rounded-full border-[rgba(202,3,32,255)] px-2 py-1 bg-[rgba(202,3,32,255)]">
    <a href='/properties' className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full bg-white border border-white text-[rgba(202,3,32,255)] hover:bg-gray-100">
      <FaArrowLeft className="w-2 h-2 md:w-3 md:h-3" />
    </a>
    <a href='/properties/active' className="text-[0.6rem] md:text-xs text-white font-medium">Back to Search</a>
  </div>
  <p className='mt-2 md:mt-4 text-sm md:text-base'>{getPropertyTypeDisplay()} {property.list_type === 'rent' ? 'For Rent' : 'For Sale'}</p>
  <h1 className="text-xl md:text-3xl mt-1 font-bold text-black">{formatPrice(property.current_list_price)}</h1>
</div>

  {/* Main Content */}
  <div className="w-full px-4 md:px-8 flex flex-col sm:flex-row gap-2 md:gap-4">

{/* Main Image */}
<div className="relative flex-1 w-full min-w-0">
  <Image
    src={propertyImages[currentImageIndex]}
    alt="Property"
    width={2220}
    height={700}
    className="w-full h-[250px] sm:h-[420px] md:h-[500px] lg:h-[600px] object-cover rounded-xl md:rounded-3xl"
  />

  {/* Label */}
  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/80 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium z-10">
    360 Virtual Tour
  </div>

  {/* Arrows */}
  {propertyImages.length > 1 && (
    <>
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 md:p-2 shadow-lg z-10"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 md:p-2 shadow-lg z-10"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
      </button>
    </>
  )}

  {/* Dots for Mobile */}
  <div className="sm:hidden absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
    {propertyImages.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentImageIndex(index)}
        className={`w-2 h-2 md:w-3 md:h-3 rounded-full border border-white transition-all ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
      />
    ))}
  </div>
</div>

{/* Thumbnail column */}
<div className="hidden sm:flex flex-col gap-2 max-h-[600px] overflow-y-auto ml-2">
  {thumbnailImages.map((image, index) => (
    <div
      key={index}
      className={`w-40 h-40 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${index === currentImageIndex ? 'border-[rgba(202,3,32,255)]' : 'border-transparent'}`}
      onClick={() => handleThumbnailClick(index)}
    >
      <Image
        src={image}
        alt={`Property view ${index + 1}`}
        width={120}
        height={80}
        className="w-full h-full object-cover hover:scale-105 transition-transform"
      />
    </div>
  ))}
</div>
</div>

    
  
    
    </div>


      {/* Tabbed Interface below gray box */}
      <div className="w-full max-w-full mx-auto px-2 md:px-4 sm:px-6 mt-6 md:mt-0 lg:px-8 pb-4 md:pb-8 lg:pb-12">
  
  {/* Tabs and Buttons */}
  <div className="sticky top-0 z-30 flex flex-col md:flex-row md:flex-wrap items-center justify-between  mx-2 md:mx-30  mb-4 md:mb-6 gap-2">
  <div className="flex flex-col md:flex-row flex-wrap gap-1 md:gap-2 w-full md:w-auto justify-center md:justify-start">
    {tabList.map(tab => (
      <button
        key={tab.key}
        onClick={() => handleTabClick(tab.key)}
        className={`w-full md:w-auto px-3 md:px-8 py-1 md:py-2 font-bold text-xs md:text-sm lg:text-base border-b-4 uppercase tracking-wide ${
          activeTab === tab.key
            ? 'border-[rgba(202,3,32,255)] bg-white text-[rgba(202,3,32,255)]'
            : 'border-transparent bg-gray-400 text-white'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
  
</div>
</div>

  
<div className="w-full flex flex-col lg:flex-row gap-4 justify-between md:gap-8 px-4 md:px-34 mt-10">

  {/* LEFT: 360 Virtual Tour and property details */}
  <div className="w-full">
    {/* Heading */}
    <h1 className="text-2xl md:text-4xl font-semibold text-gray-800">{formatPrice(property.current_list_price)}</h1>
        <p className="text-base md:text-xl mt-2">{property.list_address?.address || property.property_address || property.address || property.full_address || 'Address not available'}</p>
        <p className="text-sm md:text-lg text-indigo-600 mt-1">
          {property.list_type === 'rent' ? 'Monthly rent' : 'Estimated payment'}: {formatPrice(property.current_list_price)}
        </p>
        <p className="text-xs md:text-base text-gray-400">Estimation provided by Keller Williams Realty, LLC.</p>

        {/* Property Info */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-4 md:mt-6 text-gray-700 text-sm md:text-base">
          <div className="flex items-center gap-1">
            <Image src={bedIconUrl} alt="Beds" width={20} height={20} className="md:w-[30px] md:h-[30px]" />
            <span className='text-sm md:text-lg'>{property.total_bed || property.beds || 0} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src={bathIconUrl} alt="Baths" width={20} height={20} className="md:w-[30px] md:h-[30px]" />
            <span className='text-sm md:text-lg'>{property.total_bath || property.baths || 0} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Image src={areaIconUrl} alt="Area" width={20} height={20} className="md:w-[30px] md:h-[30px]" />
            <span className='text-sm md:text-lg'>{property.lot_size_area || property.area || property.property_size || 0} sq {property.area_unit || 'm'}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-2 md:mt-4 text-gray-700 text-xs md:text-sm">
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">{getPropertyStatus()}</span>
          <span className="px-2 py-1 rounded-full border text-xs">{property.list_type === 'rent' ? 'For Rent' : 'For Sale'}</span>
        </div>

        {/* Description */}
        <div className="mt-6 md:mt-8">
          <h2 className="font-semibold text-lg md:text-2xl mb-4 md:mb-6 flex items-center gap-2 tracking-[0.1rem]">
            <FaHome className="text-[rgba(202,3,32,255)] text-xl md:text-2xl" />
            PROPERTY DESCRIPTION
          </h2>
          <div className="text-sm md:text-lg leading-relaxed mt-2">
            {showFullDescription ? (
              <p>{property.description || property.long_description || 'Welcome to this beautiful property. Contact us for more details about this amazing opportunity.'}</p>
            ) : (
              <p>
                {(property.description || property.long_description || 'Welcome to this beautiful property. Contact us for more details about this amazing opportunity.').length > 200 
                  ? (property.description || property.long_description || 'Welcome to this beautiful property. Contact us for more details about this amazing opportunity.').substring(0, 200) + '...'
                  : property.description || property.long_description || 'Welcome to this beautiful property. Contact us for more details about this amazing opportunity.'
                }
              </p>
            )}
          </div>
        </div>

        {(property.description || property.long_description || '').length > 200 && (
          <button 
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-2 md:mt-4 text-indigo-600 text-sm md:text-base font-semibold hover:text-indigo-800 transition-colors"
          >
            {showFullDescription ? 'Show Less' : 'Show More'}
          </button>
        )}

        <div className="mt-6 md:mt-10" ref={propertyDetailsRef}>
          <h2 className="mb-3 md:mb-4 font-semibold text-lg md:text-2xl flex items-center gap-2 tracking-[0.1rem]">
            <FaRegCalendarAlt className="text-[rgba(202,3,32,255)] text-xl md:text-2xl" />
            PROPERTY DETAILS
          </h2>
          <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg text-sm md:text-xl text-gray-700">
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><FaHome className="text-gray-500 text-sm md:text-base" /> <span className="font-medium text-xs md:text-base">Property Type:</span></div>
                <div className="text-xs md:text-base">{property.prop_type || property.property_type || 'Not specified'}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image src={areaIconUrl} alt="Area" width={16} height={16} className="md:w-[20px] md:h-[20px]" />
                  <span className="font-medium text-xs md:text-base">Property Size:</span>
                </div>
                <div className="text-xs md:text-base">{property.sqft || property.area || property.property_size || 0} {property.area_unit || 'sq ft'}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><FaRegCalendarAlt className="text-gray-500 text-sm md:text-base" /> <span className="font-medium text-xs md:text-base">Year Built:</span></div>
                <div className="text-xs md:text-base">{property.year_built || property.built_year || 'Not specified'}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><FaSnowflake className="text-gray-500 text-sm md:text-base" /> <span className="font-medium text-xs md:text-base">Address:</span></div>
                <div className="text-xs md:text-base">{property.list_address?.address || property.property_address || property.address || property.full_address || 'Not specified'}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><FaCar className="text-gray-500 text-sm md:text-base" /> <span className="font-medium text-xs md:text-base">Market Center:</span></div>
                <div className="text-xs md:text-base">{
  (() => {
    const val = String(property.market_center || property.office || '');
    if (val === '50449') return 'Jasmin';
    if (val === '2414288') return 'Jeddah';
    return val || 'Not specified';
  })()
}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><FaMoneyBillWave className="text-gray-500 text-sm md:text-base" /> <span className="font-medium text-xs md:text-base">Price per sq ft:</span></div>
                <div className="text-xs md:text-base">{property.price_per_sqft ? `${formatPrice(property.price_per_sqft)}/sq ft` : 'Not specified'}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><FaCar className="text-gray-500 text-sm md:text-base" /> <span className="font-medium text-xs md:text-base">List Type:</span></div>
                <div className="text-xs md:text-base">{property.list_category}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2"><FaCar className="text-gray-500 text-sm md:text-base" /> <span className="font-medium text-xs md:text-base">List KW ID:</span></div>
                <div className="text-xs md:text-base">{property.kw_id || property.list_id || property.id || 'Not specified'}</div>
              </div>
            </div>
          </div>
        </div>

    
     
    {/* Additional Block 2 */}
   
    <h2 ref={mapSectionRef} className="text-lg md:text-2xl mt-6 md:mt-10 font-semibold text-gray-800 text-left flex items-center gap-2 tracking-[0.1rem]">
      <PiMapPinLineThin className="text-[rgba(202,3,32,255)] text-xl md:text-2xl" />
      MAP LOCATION
    </h2>
                

 <div className="bg-gray-100 rounded-xl md:mt-4 shadow-sm p-3 md:p-6">
    <div className="w-full h-64 md:h-full rounded-xl overflow-hidden shadow-md">
  <iframe
    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.222373018991!2d${property.longitude || -122.389936}!3d${property.latitude || 37.768255}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzA1LjciTiAxMjLCsDIzJzIzLjgiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus`}
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded-xl"
  ></iframe>
</div>
</div>
    
    {/* 360 Virtual Tour Section (after MAP) */}
    <div className="flex flex-col items-left justify-left py-6 md:py-12">
      {/* Heading with 360 icon */}
      <div className="flex items-left justify-left mb-4 md:mb-6">
        <Image src="/360logo.png" alt="360°" width={30} height={30} className="mr-2 md:w-[40px] md:h-[40px]" />
        <span className="text-lg md:text-2xl lg:text-3xl font-bold uppercase tracking-wide text-gray-700">VIEW 360 VIRTUAL TOUR</span>
      </div>
      {/* Main image with 360 overlay */}
      <div className="flex flex-col items-left">
  <div
    className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg mb-4 md:mb-6"
    style={{ width: 'min(100%, 750px)' }}
  >
    <Image
      src={propertyImages[currentImageIndex]}
      alt="360 Virtual Tour"
      width={600}
      height={400}
      className="w-full h-[200px] md:h-[300px] lg:h-[400px] object-cover"
    />
    {/* 360 overlay icon */}
    <div className="absolute inset-0 flex items-center justify-center">
      <Image src="/360logo.png" alt="360° Overlay" width={80} height={80} className="md:w-[120px] md:h-[120px]" />
    </div>
  </div>

  {/* Centered Button */}
  <div className="flex justify-center w-full">
    <button 
      onClick={() => {
        // Open the current property image in full screen
        const fullscreenImage = propertyImages[currentImageIndex];
        if (fullscreenImage) {
          const newWindow = window.open(fullscreenImage, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
          if (newWindow) {
            newWindow.document.write(`
              <!DOCTYPE html>
              <html>
                <head>
                  <title>360 Virtual Tour - Full Screen</title>
                  <style>
                    body { 
                      margin: 0; 
                      padding: 0; 
                      background: #000; 
                      display: flex; 
                      justify-content: center; 
                      align-items: center; 
                      height: 100vh;
                      overflow: hidden;
                    }
                    img { 
                      max-width: 100%; 
                      max-height: 100vh; 
                      object-fit: contain;
                      border-radius: 8px;
                    }
                    .close-btn {
                      position: fixed;
                      top: 20px;
                      right: 20px;
                      background: rgba(0,0,0,0.7);
                      color: white;
                      border: none;
                      padding: 10px 15px;
                      border-radius: 5px;
                      cursor: pointer;
                      font-size: 16px;
                      z-index: 1000;
                    }
                    .close-btn:hover {
                      background: rgba(0,0,0,0.9);
                    }
                  </style>
                </head>
                <body>
                  <button class="close-btn" onclick="window.close()">Close</button>
                  <img src="${fullscreenImage}" alt="360 Virtual Tour" />
                </body>
              </html>
            `);
            newWindow.document.close();
          }
        }
      }}
      className="px-4 md:px-8 py-2 md:py-3 rounded-full bg-gray-400 text-white text-sm md:text-lg font-semibold shadow hover:bg-gray-500 transition"
    >
      View in Full Screen
    </button>
  </div>
</div>

<div className="bg-[#f5f5f7] py-6 md:py-12 rounded-2xl md:rounded-3xl mt-6 md:mt-10 px-3 md:px-6">
      {/* Heading */}
      <div className="mb-4 md:mb-6 text-center md:text-left">
        <div className="flex items-start justify-start md:justify-start gap-2 font-bold text-xl md:text-3xl tracking-wide">
          <FaHome className="text-[rgba(202,3,32,255)] text-2xl md:text-3xl mr-2" />
          <span className="text-lg md:text-2xl lg:text-3xl font-bold uppercase tracking-wide text-gray-700">SIMILAR PROPERTIES</span>
        </div>
        <p className="text-gray-700 mt-1 text-sm md:text-xl">
          Properties with similar features, attributes, and price to this current listing
        </p>
      </div>

      {/* Dynamic Similar Properties */}
      {loadingSimilar ? (
        <div className="flex justify-center items-center py-6 md:py-8">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-4 border-b-4 border-[rgba(202,3,32,255)]"></div>
        </div>
      ) : similarProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-6">
          {similarProperties.map((similarProperty, index) => {
            const propertyImages = getPropertyImages(similarProperty);
            const currentImageIndex = similarImageIndices[index] || 0;
            const loading = similarLoading[index] || false;
            const handleNextImage = (e) => {
              e.preventDefault();
              e.stopPropagation();
              setSimilarLoading(prev => {
                const arr = [...prev];
                arr[index] = true;
                return arr;
              });
              setSimilarImageIndices(prev => {
                const arr = [...prev];
                arr[index] = (arr[index] + 1) % propertyImages.length;
                return arr;
              });
            };
            const handlePrevImage = (e) => {
              e.preventDefault();
              e.stopPropagation();
              setSimilarLoading(prev => {
                const arr = [...prev];
                arr[index] = true;
                return arr;
              });
              setSimilarImageIndices(prev => {
                const arr = [...prev];
                arr[index] = (arr[index] - 1 + propertyImages.length) % propertyImages.length;
                return arr;
              });
            };
            const handleImageLoad = () => {
              setSimilarLoading(prev => {
                const arr = [...prev];
                arr[index] = false;
                return arr;
              });
            };
            return (
              <SimilarPropertyCard
                key={similarProperty._kw_meta?.id || similarProperty.id || index}
                similarProperty={similarProperty}
                propertyImages={propertyImages}
                currentImageIndex={currentImageIndex}
                loading={loading}
                onNextImage={handleNextImage}
                onPrevImage={handlePrevImage}
                onImageLoad={handleImageLoad}
                bedIconUrl={bedIconUrl}
                bathIconUrl={bathIconUrl}
                areaIconUrl={areaIconUrl}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-6 md:py-8 text-gray-500">
          <p>No similar properties found at the moment.</p>
        </div>
      )}
    </div>
    
    </div>
  </div>

  {/* RIGHT SIDE: Sticky Agent Box */}
   {/* Agent Details */}
   
   <div className="relative mt-6 md:mt-15 lg:mt-15">
  <div className="sticky top-20 md:top-30 flex justify-center px-4 sm:px-6">
  <div className="bg-white rounded-2xl p-6 w-full lg:w-[400px] lg:min-h-[800px] flex flex-col justify-between shadow-lg">



      <div className="flex items-center">
        <Image
          src={
            property.list_agent_office?.list_agent_url || 
            property.agent_photo || 
            "/images.jpg"
          }
          alt="Agent"
          width={80}
          height={80}
          className="rounded-2xl md:rounded-3xl w-[80px] h-[80px] md:w-[150px] md:h-[150px] object-cover"
          onError={(e) => {
            e.target.src = "/images.jpg";
          }}
        />
        <div>
          <h3 className="font-semibold text-lg md:text-2xl text-gray-800">{property.list_agent_office?.list_agent_full_name
            || property.list_agent_full_name || 'Agent Name'}</h3>
          <p className="text-sm md:text-base font-semibold text-gray-500">{property.location?.region || property.agent_city || 'City not specified'}</p>
          
        </div>
      </div>

      <div className="mt-3 md:mt-4 text-xs md:text-sm text-gray-700">
        <p className="flex items-center gap-2"><FaPhoneAlt className="text-gray-500" /> {property.list_agent_office?.
          list_agent_preferred_phone || property.agent_phone || '(206) 739-2150'}</p>
        <p className="mt-1 flex items-center gap-2 text-indigo-600 text-xs"><FaEnvelope className="text-gray-500" /> {property.list_agent_office?.list_office_email || property.agent_email || 'agent@kw.com'}</p>
      </div>

      <div className="mt-3 md:mt-4">
        <textarea
          className="w-full p-2 border rounded-md text-xs md:text-sm"
          rows="3"
          defaultValue={`I would like to learn more about the property this property.`}
        ></textarea>

        <button className="w-full mt-3 md:mt-4 py-2 rounded-full bg-[rgba(202,3,32,255)] text-white text-xs md:text-sm font-semibold">Contact {property.agent?.name || property.agent_name || 'Agent'}</button>
       
      </div>
    </div>
  </div>
</div>
        </div>
     
      
    
  </div>
      <Footer />
    </div>
  );
}