// pages/index.js
'use client'
import React from "react";
import {
    FaChevronDown,
    FaHome,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaBuilding,FaWarehouse ,FaShoppingBag  
  } from "react-icons/fa";
  import { BsListUl, BsMap } from "react-icons/bs";
  import { FiFilter } from "react-icons/fi";
  import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
  import Image from "next/image";
  import { useState, useRef, useEffect } from "react";
  import axios from 'axios';
  import { GoogleMap, Marker, useJsApiLoader, InfoWindow, OverlayView } from '@react-google-maps/api';
import Header from "@/components/header";
import Box from "@/components/box";
  // Add this new component before the Home component
  const PropertyCard = ({ property, bedIconUrl, bathIconUrl, areaIconUrl, onHover, onLeave }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(false); // image loading state
    
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
      
      return property.photos?.map(photo => photo.ph_url) || fallbackImages;
    };

    const handleNextImage = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setLoading(true); // start loader
      setCurrentImageIndex((prev) => (prev + 1) % 7);
    };

    const handlePrevImage = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setLoading(true); // start loader
      setCurrentImageIndex((prev) => (prev - 1 + 7) % 7);
    };

    useEffect(() => {
      setLoading(true); // start loader when image index changes
    }, [currentImageIndex]);

    return (
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div
          className="block relative cursor-pointer"
          onClick={() => {
            localStorage.setItem('selectedProperty', JSON.stringify(property));
            window.location.href = '/propertydetails';
          }}
        >
          <div className="relative">
            {/* Loader overlay for image */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-20">
                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-white"></div>
              </div>
            )}
            <Image
              src={getPropertyImages(property)[currentImageIndex] || '/placeholder1.jpg'}
              alt={property.prop_type || "Property Image"}
              width={500}
              height={300}
              className="w-full h-40 object-cover rounded-lg"
              onLoadingComplete={() => setLoading(false)}
            />
            <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-between px-2">
              <button 
                onClick={handlePrevImage}
                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNextImage}
                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {[...Array(7)].map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full ${
                    currentImageIndex === idx ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
            <div className="absolute top-2 left-2 sm:top-2 sm:left-2 bg-black/80 text-white px-2 sm:px-2 py-1 rounded-full text-xs sm:text-sm font-medium z-10">
              360 Virtual Tour
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm md:text-xl">
            {property.prop_type}
          </h3>
          <p className="text-xs text-gray-500">{property.list_address?.address}</p>
          <div className="flex w-full items-center gap-2 text-sm my-2">
            <span className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-gray-200 p-2">
              <span className="relative h-4 w-4">
                <Image
                  src={bedIconUrl}
                  alt="bed"
                  fill
                  className="object-contain"
                />
              </span>
              {property.total_bed}
            </span>
            <span className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-gray-200 p-2">
              <span className="relative h-4 w-4">
                <Image
                  src={bathIconUrl}
                  alt="bath"
                  fill
                  className="object-contain"
                />
              </span>
              {property.total_bath}
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-gray-200 px-3 py-2 whitespace-nowrap">
              <span className="relative h-4 w-4">
                <Image
                  src={areaIconUrl}
                  alt="area"
                  fill
                  className="object-contain"
                />
              </span>
              {property.lot_size_area} {property.lot_size_units}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-lg font-bold">{property.current_list_price} QAR/month</p>
            <button className="text-sm text-white p-2 rounded-lg bg-[rgba(202,3,32,255)]">
              Enquire now
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default function Home(props) {
    const [viewMode, setViewMode] = useState("list");
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [imageIndices, setImageIndices] = useState({}); // Track current image index for each property
    const propertiesPerPage = 10;
    const filterPanelRef = useRef(null);
    const [properties, setProperties] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [totalCount, setTotalCount] = useState(0); // <-- add this for backend total count
    const [propertyType, setPropertyType] = useState('For Sale');
    const [propertyCategory, setPropertyCategory] = useState('All');
    const [propertySubtype, setPropertySubtype] = useState('All');
    const [marketCenter, setMarketCenter] = useState('All');
    const [location, setLocation] = useState('All');
    const [priceRange, setPriceRange] = useState('All');
    const [hoveredProperty, setHoveredProperty] = useState(null);
    const [loading, setLoading] = useState(false);
    const [mapProjection, setMapProjection] = useState(null);
    // Helper to check if marker is near the bottom of the map (desktop only)
    const isNearBottom = (coords) => {
  if (!desktopMap || !mapProjection) return false;

  const latLng = new window.google.maps.LatLng(coords.lat, coords.lng);
  const projPoint = mapProjection.fromLatLngToPoint(latLng);
  const scale = Math.pow(2, desktopMap.getZoom());
  const bounds = desktopMap.getBounds();
  if (!bounds) return false;

  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();
  const topRight = mapProjection.fromLatLngToPoint(ne);
  const bottomLeft = mapProjection.fromLatLngToPoint(sw);

  const y = (projPoint.y - topRight.y) * scale;
  const mapHeight = desktopMap.getDiv().clientHeight;

  // Bottom 25% of map = risky zone
  return y > mapHeight * 0.75;
};

    
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: "AIzaSyDG48YF2dsvPN0qHX3_vSaTJj6aqg3-Oc4"
    });
    const [desktopMap, setDesktopMap] = useState(null);
    const mobileMapRef = useRef(null);

    useEffect(() => {
      if (!showMobileFilters) return;
      function handleClickOutside(event) {
        if (filterPanelRef.current && !filterPanelRef.current.contains(event.target)) {
          setShowMobileFilters(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showMobileFilters]);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const bedIconUrl = "/bed.png";
    const bathIconUrl = "/bath.png";
    const areaIconUrl = "/area.png";

    // Pagination logic
    const currentProperties = properties; // backend returns paginated data
    const totalPages = Math.ceil(totalCount / propertiesPerPage); // use backend totalCount

    const handlePrevPage = () => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    // Function to handle next image
    const handleNextImage = (propertyId) => {
      setImageIndices(prev => ({
        ...prev,
        [propertyId]: ((prev[propertyId] || 0) + 1) % 7 // Assuming 7 images per property
      }));
    };

    // Function to handle previous image
    const handlePrevImage = (propertyId) => {
      setImageIndices(prev => ({
        ...prev,
        [propertyId]: ((prev[propertyId] || 0) - 1 + 7) % 7 // Assuming 7 images per property
      }));
    };

    // Helper to get property images (move outside PropertyCard for reuse)
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

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          // Map priceRange to min/max price
          let minPrice = undefined, maxPrice = undefined;
          if (priceRange === 'Below QAR 50,000') {
            maxPrice = 50000;
          } else if (priceRange === 'QAR 50,000 – 100,000') {
            minPrice = 50000;
            maxPrice = 100000;
          } else if (priceRange === 'Above QAR 100,000') {
            minPrice = 100000;
          }
          // Map marketCenter to API value
          const marketCenterMap = {
            Jasmin: '50449',
            Jeddah: '2414288',
          };
          const apiMarketCenter = marketCenterMap[marketCenter] || undefined;
          const response = await axios.post('https://kw-backend-q6ej.vercel.app//api/listings/list/properties', {
            market_center: apiMarketCenter,
            list_category: propertyType, // <-- add this line
            property_category: propertyCategory === 'All' ? undefined : propertyCategory,
            property_subtype: propertySubtype === 'All' ? undefined : propertySubtype,
            location: location === 'All' ? undefined : location,
            min_price: minPrice,
            max_price: maxPrice,
            page: currentPage,
            limit: propertiesPerPage,
          });
          setProperties(response.data.data);
          setTotalCount(response.data.total || 0);
          // Debug: Check properties data
          console.log('Properties from API:', response.data.data);
          console.log('Properties with coordinates:', response.data.data.filter(p => p.property_address?.coordinates_gs?.coordinates));
        } catch (error) {
          console.error('POST request error:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [currentPage, propertiesPerPage,  propertyCategory, propertySubtype, marketCenter, location, priceRange, propertyType]);
    
    // Helper to get map src based on hovered property
    const getMapSrc = () => {
      if (
        hoveredProperty &&
        hoveredProperty.coordinates_gs &&
        hoveredProperty.coordinates_gs.coordinates &&
        hoveredProperty.coordinates_gs.coordinates.length === 2
      ) {
        const [lng, lat] = hoveredProperty.coordinates_gs.coordinates;
        return `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
      }
      // Default location
      return "https://www.google.com/maps?q=2740+King+Fahd+Branch+Rd,+Riyadh,+Saudi+Arabia&output=embed";
    };

    // Loader spinner component
    const Loader = () => (
      <div className="flex justify-center items-center w-full h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );

    // Helper to offset overlapping markers
    function getOffsetCoords(baseCoords, offsetIndex) {
      if (!offsetIndex) return { lat: baseCoords[1], lng: baseCoords[0] };
      // Offset in a circle pattern
      const R = 0.0002; // ~20m offset
      const angle = (offsetIndex - 1) * (Math.PI / 4); // 8 directions
      return {
        lat: baseCoords[1] + R * Math.cos(angle),
        lng: baseCoords[0] + R * Math.sin(angle),
      };
    }

    // Helper to get map center and zoom with offset for hovered property
    const getMapCenter = () => {
      if (
        hoveredProperty &&
        hoveredProperty.coordinates_gs &&
        hoveredProperty.coordinates_gs.coordinates &&
        hoveredProperty.coordinates_gs.coordinates.length === 2
      ) {
        // Offset latitude to move marker toward top (e.g., 0.01 degree)
        const [lng, lat] = hoveredProperty.coordinates_gs.coordinates;
        return { lat: lat + 0.01, lng };
      }
      return { lat: 24.7136, lng: 46.6753 };
    };
    const getMapZoom = () => {
      if (
        hoveredProperty &&
        hoveredProperty.coordinates_gs &&
        hoveredProperty.coordinates_gs.coordinates &&
        hoveredProperty.coordinates_gs.coordinates.length === 2
      ) {
        return 16; // zoom in when hovering
      }
      return 10; // default zoom
    };

    // Smooth pan/zoom on hover for desktop map
    useEffect(() => {
      if (
        desktopMap &&
        hoveredProperty &&
        hoveredProperty.coordinates_gs &&
        hoveredProperty.coordinates_gs.coordinates &&
        hoveredProperty.coordinates_gs.coordinates.length === 2
      ) {
        const [lng, lat] = hoveredProperty.coordinates_gs.coordinates;
        // Offset latitude to move marker toward top
        const offsetLat = lat + 0.03;
        desktopMap.panTo({ lat: offsetLat, lng });
        desktopMap.setZoom(16);
      }
    }, [hoveredProperty, desktopMap]);

    useEffect(() => {
      if (
        desktopMap &&
        (!hoveredProperty ||
          !hoveredProperty.coordinates_gs ||
          !hoveredProperty.coordinates_gs.coordinates ||
          hoveredProperty.coordinates_gs.coordinates.length !== 2)
      ) {
        desktopMap.panTo({ lat: 24.7136, lng: 46.6753 });
        desktopMap.setZoom(10);
      }
    }, [hoveredProperty, desktopMap]);

    // Fit map to all property markers (mobile)
    useEffect(() => {
      if (!mobileMapRef.current || !isLoaded || !properties.length) return;
      setTimeout(() => {
        const bounds = new window.google.maps.LatLngBounds();
        let hasCoords = false;
        properties.forEach(property => {
          const coords = property.property_address?.coordinates_gs?.coordinates;
          if (coords && coords.length === 2) {
            bounds.extend({ lat: coords[1], lng: coords[0] });
            hasCoords = true;
          }
        });
        if (hasCoords) {
          mobileMapRef.current.fitBounds(bounds);
        }
      }, 0);
    }, [properties, isLoaded]);

    // Map type prop to list_status value(s)
    // const statusMap = {
    //   Sold: ['sold', 'listings.sold'],
    //   Active: ['active', 'listings.active', 'accepted', 'listings.accepted'],
    //   Rent: ['rent', 'listings.rent'],
    //   // Add more if needed
    // };
    // const filterStatuses = statusMap[props.type] || [];
    
    // Show only properties with list_status === 'active'
    const filteredProperties = properties.filter(
      (p) => String(p.list_status).trim().toLowerCase() === 'sold'
    );

    return (
      <div className="min-h-screen bg-gray-50  mx-4 ">
        {/* Header */}
        <header className="w-full bg-gray-200 shadow-sm py-4 rounded-xl">
  <div className="container mx-auto px-4 md:px-4">
    <div className="flex flex-wrap md:flex-row w-full gap-1 md:items-center">
      {/* Mobile Header (List/Map + Filters button in one line) */}
      <div className="md:hidden w-full flex items-center justify-between py-2">
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${viewMode === "list" ? "text-white bg-black" : "text-gray-800 bg-white"}`}
            onClick={() => setViewMode("list")}
          >
            List
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${viewMode === "map" ? "text-white bg-black" : "text-gray-800 bg-white"}`}
            onClick={() => setViewMode("map")}
          >
            Map
          </button>
        </div>

        <button
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-semibold bg-white text-gray-800 hover:bg-gray-100"
          onClick={() => setShowMobileFilters((prev) => !prev)}
        >
          <FiFilter />
          All Filters
        </button>
      </div>

      {/* Desktop Header (Original Layout) */}
      <div className="hidden md:block w-full">
        <div className="flex flex-row items-center w-full">
          {/* List/Map Toggle */}
          <div className="flex items-center border rounded-lg overflow-hidden md:mr-4">
            <button
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${viewMode === "list" ? "text-white bg-black" : "text-gray-800 bg-white"}`}
              onClick={() => setViewMode("list")}
            >
              List
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium ${viewMode === "map" ? "text-white bg-black" : "text-gray-800 bg-white"}`}
              onClick={() => setViewMode("map")}
            >
              Map
            </button>
          </div>

          {/* Filter Panel */}
          <div className="flex-1 md:flex md:flex-row md:gap-4">
            {/* Property Type Dropdown */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaHome className="text-orange-500" />
              </div>
              <select
                className="w-full appearance-none min-w-[180px] pl-10 pr-3 py-2 rounded-lg bg-white text-sm text-gray-500 border border-gray-300"
                value={propertyType}
                onChange={e => setPropertyType(e.target.value)}
              >
                <option value="For Rent">For Rent</option>
                <option value="For Sale">For Sale</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                <FaChevronDown className="h-4 w-4" />
              </div>
            </div>

            {/* Property Category Dropdown */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaBuilding className="text-blue-400" />
              </div>
              <select
                className="w-full appearance-none min-w-[180px] pl-10 pr-3 py-2 rounded-lg bg-white text-sm text-gray-500 border border-gray-300"
                value={propertyCategory}
                onChange={e => setPropertyCategory(e.target.value)}
              >
                <option>Property Type</option>
                <option>Commercial</option>
                <option>Farm and Agriculture</option>
                <option>Lots and Land</option>
                <option>Residential</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaChevronDown className="h-4 w-4" />
              </div>
            </div>

            {/* Property Subtype Dropdown */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaWarehouse  className="text-green-700" />
              </div>
              <select
                className="w-full appearance-none min-w-[180px] pl-10 pr-3 py-2 rounded-lg bg-white text-sm text-gray-500 border border-gray-300"
                value={propertySubtype}
                onChange={e => setPropertySubtype(e.target.value)}
              >
                <option>Property Subtype</option>
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
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaChevronDown className="h-4 w-4" />
              </div>
            </div>

            {/* Market Center Dropdown */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaShoppingBag   className="text-yellow-400" />
              </div>
              <select
                className="w-full appearance-none min-w-[180px] pl-10 pr-3 py-2 rounded-lg bg-white text-sm text-gray-500 border border-gray-300"
                value={marketCenter}
                onChange={e => setMarketCenter(e.target.value)}
              >
                <option>Market Center</option>
                <option>Jasmin</option>
                <option>Jeddah</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaChevronDown className="h-4 w-4" />
              </div>
            </div>

            {/* Location Dropdown */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaMapMarkerAlt className="text-red-500" />
              </div>
              <select
                className="w-full appearance-none min-w-[180px] pl-10 pr-3 py-2 rounded-lg bg-white text-sm text-gray-500 border border-gray-300"
                value={location}
                onChange={e => setLocation(e.target.value)}
              >
                <option>Select Location</option>
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
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaChevronDown className="h-4 w-4" />
              </div>
            </div>

            {/* Price Range Dropdown */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FaMoneyBillWave className="text-green-500" />
              </div>
              <select
                className="w-full appearance-none min-w-[180px] pl-10 pr-3 py-2 rounded-lg bg-white text-sm text-gray-500 border border-gray-300"
                value={priceRange}
                onChange={e => setPriceRange(e.target.value)}
              >
                <option>Select Price Range</option>
                <option>Below QAR 50,000</option>
                <option>QAR 50,000 – 100,000</option>
                <option>Above QAR 100,000</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Panel (Hidden on Desktop) */}
      <div
        ref={filterPanelRef}
        className={`${showMobileFilters ? 'flex flex-col gap-2 absolute top-full left-0 w-full z-20 p-4 bg-gray-500/50 backdrop-blur-sm  rounded-lg shadow-lg' : 'hidden'} md:hidden`}
      >
        {/* Property Type Dropdown */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FaHome className="text-gray-400" />
          </div>
          <select
            className="w-full appearance-none pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-sm text-gray-500 border border-gray-300"
            value={propertyType}
            onChange={e => setPropertyType(e.target.value)}
          >
            <option value="For Rent">For Rent</option>
            <option value="For Sale">For Sale</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <FaChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Property Category Dropdown */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FaBuilding className="text-gray-400" />
          </div>
          <select
            className="w-full appearance-none pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-sm text-gray-500 border border-gray-300"
            value={propertyCategory}
            onChange={e => setPropertyCategory(e.target.value)}
          >
            <option>Property Type</option>
            <option>Commercial</option>
            <option>Farm and Agriculture</option>
            <option>Lots and Land</option>
            <option>Residential</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <FaChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Property Subtype Dropdown */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FaMapMarkerAlt className="text-gray-400" />
          </div>
          <select
            className="w-full appearance-none pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-sm text-gray-500 border border-gray-300"
            value={propertySubtype}
            onChange={e => setPropertySubtype(e.target.value)}
          >
            <option>Property Subtype</option>
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
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <FaChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Market Center Dropdown */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FaShoppingBag  className="text-gray-400" />
          </div>
          <select
            className="w-full appearance-none pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-sm text-gray-500 border border-gray-300"
            value={marketCenter}
            onChange={e => setMarketCenter(e.target.value)}
          >
            <option>All</option>
            <option>Jasmin</option>
            <option>Jeddah</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <FaChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Location Dropdown */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FaMapMarkerAlt className="text-gray-400" />
          </div>
          <select
            className="w-full appearance-none pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-sm text-gray-500 border border-gray-300"
            value={location}
            onChange={e => setLocation(e.target.value)}
          >
            <option>Select Location</option>
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
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <FaChevronDown className="h-4 w-4" />
          </div>
        </div>

        {/* Price Range Dropdown (Mobile) */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FaMoneyBillWave className="text-gray-400" />
          </div>
          <select
            className="w-full appearance-none pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-sm text-gray-500 border border-gray-300"
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
          >
            <option>Select Price Range</option>
            <option>Below QAR 20,000</option>
            <option>QAR 20,000 – 25,000</option>
            <option>Above QAR 25,000</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <FaChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
  
        {/* Title & Filters */}
        <div className="p-4 md:p-1 md:pt-8">
        {/* <div className="flex items-center gap-3">
 
  <p className="text-base font-medium underline">Real Estate </p>
  <FaChevronRight className="text-gray-400 h-3 cursor-pointer" />
  <p className="text-base font-medium underline">Properties for Rent</p>
</div> */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 mt-10">
            Properties for active
          </h2>
          {/* <span>Showing {propertiess.length} results</span> */}
        </div>

        {/* Content: 2 Columns Split (Cards + Map) */}
        <div className="flex flex-col md:flex-row gap-4 px-4 md:px-0 pb-8 ">
          {/* Mobile: Toggle between list and map */}
          {/* List view for mobile */}
          {viewMode === "list" && (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:hidden gap-4">
              {loading ? (
                <Loader />
              ) : (
                filteredProperties.map((property, index) => (
                  <PropertyCard
                    key={index}
                    property={property}
                    bedIconUrl={bedIconUrl}
                    bathIconUrl={bathIconUrl}
                    areaIconUrl={areaIconUrl}
                    onHover={() => setHoveredProperty(property)}
                    onLeave={() => setHoveredProperty(null)}
                  />
                ))
              )}
              {!loading && (
                <div className="col-span-full flex justify-center items-center gap-2 mt-4">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Map view for mobile */}
          {viewMode === "map" && (
            <div className="w-full h-100 md:h-64 md:hidden bg-blue-100 rounded-lg overflow-hidden sticky top-0">
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={getMapCenter()}
                  zoom={getMapZoom()}
                  onLoad={map => (mobileMapRef.current = map)}
                >
                  {filteredProperties.map((property, idx) => {
                    const coords = property.property_address?.coordinates_gs?.coordinates;
                    if (!coords) return null;
                    return (
                      <Marker
                        key={idx}
                        position={{ lat: coords[1], lng: coords[0] }}
                        label={{
                          text: `${property.current_list_price} QAR`,
                          fontSize: "13px",
                          fontWeight: "bold",
                          color: 'black',
                          className: "price-label"
                        }}
                        onMouseOver={() => {
                          if (!hoveredProperty?.fixed) setHoveredProperty(property);
                        }}
                        onMouseOut={() => {
                          if (!hoveredProperty?.fixed) setHoveredProperty(null);
                        }}
                      />
                    );
                  })}
                </GoogleMap>
              )}
            </div>
          )}
          {/* Desktop: Always show both */}
         
          <div className="hidden md:flex w-full min-h-[80vh]">
    {/* Left - Properties List (natural scroll) */}
    <div className="w-1/2 pr-3">
      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {loading ? (
          <Loader />
        ) : (
          filteredProperties.map((property, index) => (
            <PropertyCard
              key={index}
              property={property}
              bedIconUrl={bedIconUrl}
              bathIconUrl={bathIconUrl}
              areaIconUrl={areaIconUrl}
              onHover={() => setHoveredProperty(property)}
              onLeave={() => setHoveredProperty(null)}
            />
          ))
        )}
        {!loading && (
          <div className="col-span-full flex justify-center items-center gap-2 mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>

    {/* Right - Map (sticky) */}
    <div className="w-1/2">
      <div className="sticky top-20 w-full h-[80vh] bg-blue-100 rounded-lg overflow-hidden relative">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            onLoad={(map) => {
              setDesktopMap(map);
              setMapProjection(map.getProjection());
            }}
          >
            {(() => {
              let coordSeen = {};
              const shouldShowAbove = (coords) => {
                if (typeof window !== 'undefined' && window.innerWidth < 768) return false;
                if (!desktopMap || !mapProjection) return false;
                const latLng = new window.google.maps.LatLng(coords.lat, coords.lng);
                const projPoint = mapProjection.fromLatLngToPoint(latLng);
                const scale = Math.pow(2, desktopMap.getZoom());
                const bounds = desktopMap.getBounds();
                if (!bounds) return false;
                const ne = bounds.getNorthEast();
                const sw = bounds.getSouthWest();
                const topRight = mapProjection.fromLatLngToPoint(ne);
                const bottomLeft = mapProjection.fromLatLngToPoint(sw);
                const y = (projPoint.y - topRight.y) * scale;
                const mapDiv = desktopMap.getDiv();
                const mapHeight = mapDiv.clientHeight;
                return y > mapHeight * 0.7;
              };
              return filteredProperties.map((property, idx) => {
                const coords = property.property_address?.coordinates_gs?.coordinates;
                if (!coords) return null;
                const key = coords.join(',');
                coordSeen[key] = (coordSeen[key] || 0) + 1;
                const offsetCoords = getOffsetCoords(coords, coordSeen[key] - 1);
                const priceText = `${property.current_list_price} QAR`;
                const isActive = (hoveredProperty && hoveredProperty._id === property._id);
                const isFixed = hoveredProperty?.fixed && hoveredProperty?._id === property._id;
                const showAbove = shouldShowAbove(offsetCoords);
                return (
                  <React.Fragment key={idx}>
                    {/* Price Badge Overlay */}
                    <OverlayView
                      position={offsetCoords}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <div
                        className={`bg-green-700 text-white font-medium rounded-full px-2 py-2 text-xs shadow-lg mb-1 text-center min-w-[80px] cursor-pointer transition-colors
                          ${isActive ? 'ring-4 ring-black bg-green-900 scale-110 z-50 ' : ''}
                          ${hoveredProperty?.fixed && hoveredProperty?._id === property._id ? 'ring-4 ring-yellow-400' : ''}
                        `}
                        onMouseEnter={() => {
                          if (!hoveredProperty?.fixed) setHoveredProperty(property);
                        }}
                        onMouseLeave={() => {
                          if (!hoveredProperty?.fixed) setHoveredProperty(null);
                        }}
                        onClick={() => {
                          if (hoveredProperty?.fixed && hoveredProperty?._id === property._id) return;
                          setHoveredProperty({ ...property, fixed: true });
                          if (desktopMap && mapProjection) {
                            const latLng = new window.google.maps.LatLng(offsetCoords.lat, offsetCoords.lng);
                            const projPoint = mapProjection.fromLatLngToPoint(latLng);
                            const scale = Math.pow(2, desktopMap.getZoom());
                            const bounds = desktopMap.getBounds();
                            if (bounds) {
                              const ne = bounds.getNorthEast();
                              const sw = bounds.getSouthWest();
                              const topRight = mapProjection.fromLatLngToPoint(ne);
                              const bottomLeft = mapProjection.fromLatLngToPoint(sw);
                              const y = (projPoint.y - topRight.y) * scale;
                              const mapHeight = desktopMap.getDiv().clientHeight;
                              if (y > mapHeight * 0.65) {
                                const panAmount = Math.min(300, mapHeight * 0.3);
                                desktopMap.panBy(0, -panAmount);
                              }
                            }
                          }
                        }}
                        style={{ position: 'relative', zIndex: 10 }}
                      >
                        {priceText}
                      </div>
                    </OverlayView>
                    {/* Full Property Card Overlay */}
                    {(isActive || isFixed) && (
                      <OverlayView
                        position={offsetCoords}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                      >
                        <div
                          className="bg-white rounded-lg shadow-lg max-w-xs w-50 z-50 cursor-pointer"
                          style={{
                            position: 'relative',
                            marginTop: showAbove ? -300 : 40,
                            zIndex: 100,
                          }}
                          onClick={() => {
                            localStorage.setItem('selectedProperty', JSON.stringify(property));
                            window.location.href = '/propertydetails';
                          }}
                          onMouseEnter={() => {
                            if (!hoveredProperty?.fixed) setHoveredProperty(property);
                          }}
                          onMouseLeave={() => {
                            if (!hoveredProperty?.fixed) setHoveredProperty(null);
                          }}
                        >
                          <div className="flex flex-col gap-3">
                            <div className="relative w-full h-20 flex-shrink-0">
                              <Image
                                src={getPropertyImages(property)[0] || '/placeholder1.jpg'}
                                alt={property.prop_type}
                                fill
                                className="object-cover rounded"
                              />
                              {isFixed && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setHoveredProperty(null);
                                  }}
                                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold bg-white rounded-full w-6 h-6 flex items-center justify-center"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                            <div className="flex-1 min-w-0 p-2">
                              <h3 className="font-semibold text-sm md:text-sm">{property.prop_type}</h3>
                              <p className="text-[10px] text-gray-500 whitespace-normal break-words">
                                {property.list_address?.address}
                              </p>
                              <div className="flex w-full items-center gap-2 text-sm my-2">
                                <span className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-gray-200 p-2">
                                  <span className="relative h-3 w-3">
                                    <Image src={bedIconUrl} alt="bed" fill className="object-contain" />
                                  </span>
                                  <span className="text-[10px]">{property.total_bed}</span>
                                </span>
                                <span className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-gray-200 p-2">
                                  <span className="relative h-3 w-3">
                                    <Image src={bathIconUrl} alt="bath" fill className="object-contain" />
                                  </span>
                                  <span className="text-[10px]">{property.total_bath}</span>
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-lg bg-gray-200 px-2 py-2 whitespace-nowrap">
                                  <span className="relative h-3 w-3">
                                    <Image src={areaIconUrl} alt="area" fill className="object-contain" />
                                  </span>
                                  <span className="text-[10px]">
                                    {property.lot_size_area} {property.lot_size_units}
                                  </span>
                                </span>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <p className="text-[10px] font-bold">{property.current_list_price} QAR/month</p>
                                <button
                                  className="text-[10px] text-white p-2 rounded-lg bg-[rgba(202,3,32,255)]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    localStorage.setItem('selectedProperty', JSON.stringify(property));
                                    window.location.href = '/propertydetails';
                                  }}
                                >
                                  Enquire now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </OverlayView>
                    )}
                  </React.Fragment>
                );
              });
            })()}
          </GoogleMap>
        )}
      </div>
    </div>
  </div>
</div>
      </div>
    
  );
}