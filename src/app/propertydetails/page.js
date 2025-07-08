'use client'

import { useState,useRef,useEffect } from 'react';
import { ChevronLeft, ChevronRight, Phone, MessageCircle, Bed, Bath, Square, MapPin } from 'lucide-react';
import Image from 'next/image';
import Footer from '@/components/footer';
import Link from 'next/link';
import { FaChevronUp } from 'react-icons/fa';
import { 
  FaSearch, FaBars, FaTimes, FaBuilding,
  FaNetworkWired, FaUserTie, FaKey, FaUser,
  FaUsers, FaGlobe, FaHome, FaEnvelope, FaPhone,
  FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube,
  FaTwitter, FaTiktok, FaSnapchatGhost, FaWhatsapp, FaChevronDown,FaArrowLeft 
} from "react-icons/fa";
import Header from '@/components/header';
export default function PropertyListing() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);  
  const [isAtTop, setIsAtTop] = useState(true);  
  const prevScrollY = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // simulate toggle
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [property, setProperty] = useState(null);

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
      setProperty(JSON.parse(stored));
    }
  }, []);

  const toggleSubmenu = (key) => {
    setOpenSubmenu(prev => (prev === key ? null : key));
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const bedIconUrl = "/bed.png";
  const bathIconUrl = "/bath.png";
  const areaIconUrl = "/area.png";
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

  if (!property) {
    return <div className="p-8 text-center">Loading property details...</div>;
  }

  return (
    <div>
       <header className={`  
        fixed top-0 w-full z-50  
        flex justify-between items-center px-4 sm:px-6 py-4
        transition-all duration-300 ease-in-out  
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}  
        ${isAtTop ? 'bg-gray-950/90 backdrop-blur-sm' : 'bg-gray-950/90 backdrop-blur-sm'}  
      `}>
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image 
              src="https://static.wixstatic.com/media/36a881_0cd959d32d904bd7be76303fb23dec0a~mv2.png/v1/fill/w_279,h_63,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Untitled%20design.png" 
              alt="KW Saudi Arabia Logo" 
              width={279}
              height={63}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 tracking-wider">
          <Link href="/ourCulture" className="text-[0.8rem]  text-white hover:text-gray-300 transition-colors">
            About Us
          </Link>
          <div className="w-px h-4 bg-gray-300/50"></div>
          <Link href="/properties" className="text-[0.8rem] text-white hover:text-gray-300 transition-colors">
            Search
          </Link>
          <div className="w-px h-4 bg-gray-300/50"></div>
          <Link href="/franchise" className="text-[0.8rem] text-white hover:text-gray-300 transition-colors">
            Join Us
          </Link>
          <div className="w-px h-4 bg-gray-300/50"></div>
          <Link href="/contactUs" className="text-[0.8rem] text-white hover:text-gray-300 transition-colors">
            Contact Us
          </Link>
          <div className="w-px h-4 bg-gray-300/50"></div>
          <Link href="/contactUs" className="text-[0.8rem] text-white hover:text-gray-300 transition-colors">
            Instant Valuation
          </Link>
        
          <Link href="#" className="text-[0.8rem] ml-4 mr-8 text-white hover:text-gray-300 transition-colors">
            عربي
          </Link>
          <Link 
            href="#" 
            className="border border-white px-4 py-1.5 rounded-full text-white hover:bg-white hover:text-black transition-colors text-[0.8rem]"
          >
            Agent Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none p-2" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <FaTimes size={20} className="text-white" />
          ) : (
            <FaBars size={20} className="text-white" />
          )}
        </button>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          
          <div className="absolute md:hidden top-full ml-10 left-0 right-0 py-4  px-6 space-y-4 shadow-lg bg-gray-950/90 backdrop-blur-sm z-50">
            {menuItems.map(item => (
              <div key={item.key}>
                {item.submenu ? (
                  <div
                    onClick={() => toggleSubmenu(item.key)}
                    className="flex justify-between items-center text-white hover:text-gray-300 transition-colors cursor-pointer py-1"
                  >
                    <span
                      className={
                        openSubmenu === item.key
                          ? (["JOIN US", "CONTACT US"].includes(item.label)
                            ? 'text-[rgba(202,3,32,255)] font-semibold underline'
                            : 'text-[rgba(202,3,32,255)] font-semibold underline')
                          : ["JOIN US", "CONTACT US"].includes(item.label)
                          ? 'text-[rgba(202,3,32,255)] font-semibold'
                          : 'text-white'
                      }
                    >
                      {item.label}
                    </span>
                    {item.submenu && (
                      openSubmenu === item.key ? (
                        <FaChevronUp size={14} className="text-white" />
                      ) : (
                        <FaChevronDown size={14} className="text-[rgba(202,3,32,255)]" />
                      )
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={`block py-1 font-semibold transition-colors ${["JOIN US", "CONTACT US"].includes(item.label) ? 'text-[rgba(202,3,32,255)] hover:text-[rgba(202,3,32,255)]' : 'text-white hover:text-[rgba(202,3,32,255)]'}`}
                  >
                    {item.label}
                  </Link>
                )}
                {/* Submenu */}
                {item.submenu && openSubmenu === item.key && (
                  <div className="mt-1 space-y-3 text-base text-gray-300">
                    {item.submenu.map(sub => (
                      <Link href={sub.href} key={sub.href} className="block hover:text-white">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        </header>
    <div className="min-h-screen md:mt-30 bg-gray-50">
    <div className="flex items-center gap-2 md:mb-6 mb-6 cursor-pointer hover:text-gray-600 mx-20">
  <a href='/properties' className="w-5 h-5 flex items-center justify-center rounded-full bg-white border border-black text-black hover:bg-gray-100">
    <FaArrowLeft className="w-2 h-2" />
  </a>
  <a href='/properties/active' className="text-[0.9rem] text-[rgba(202,3,32,255)]">Back to Search</a>
</div>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto scrollbar-hide whitespace-nowrap">
          <span className="font-bold underline">Real Estate</span>
          <span className="mx-1">{'>'}</span>
          <span className="font-bold underline">Properties for Rent</span>
          <span className="mx-1">{'>'}</span>
          <span className="font-bold underline">Lusail</span>
          <span className="mx-1">{'>'}</span>
          <span className="text-gray-900">{property.prop_type || 'Property'}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[2.2fr,1fr] gap-6 md:gap-8">
          {/* Main Content */}
          <div>
            {/* Image Gallery */}
            <div className="relative mb-4 md:mb-6">
              <div className="relative aspect-[16/9] sm:aspect-[16/7] rounded-xl md:rounded-2xl overflow-hidden">
                <Image
                  src={propertyImages[currentImageIndex]}
                  alt="Property"
                  width={1220}
                  height={700}
                  className="w-full h-full object-cover"
                />
                
                {/* 360 Virtual Tour Badge */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/80 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  360 Virtual Tour
                </div>

                {/* Desktop Arrows */}
                <button
                  onClick={prevImage}
                  className="hidden sm:block absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="hidden sm:block absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>

                {/* Mobile Arrows */}
                <div className="flex sm:hidden absolute bottom-2 left-2 space-x-2 z-10">
                  <button
                    onClick={prevImage}
                    className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </div>

                {/* Dots Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {propertyImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full border border-white transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Clickable Thumbnail Images */}

            <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6 md:mb-8">
  {thumbnailImages.map((image, index) => (
    <div 
      key={index} 
      className={`aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 ${
        index === currentImageIndex ? 'ring-2 ring-blue-500 ring-offset-2' : 'ring-1 ring-transparent'
      }`}
      onClick={() => handleThumbnailClick(index)}
    >
      <Image
        src={image}
        alt={`Property view ${index + 1}`}
        width={100}
        height={100}
        className="w-full h-full object-cover rounded-lg hover:scale-105"
      />
    </div>
  ))}
</div>



            {/* Property Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8">
              {property.prop_type || 'Property'}
            </h1>

            {/* Property Details Cards */}
       <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 bg-white rounded-lg border overflow-hidden mb-6 md:mb-8 text-xs sm:text-sm">
  <div className="p-4">
    <div className="text-sm text-gray-700 mb-1">Reference no.</div>
    <div className="font-semibold text-gray-900">{property.reference_no || '-'}</div>
  </div>

  <div className="p-4">
    <div className="text-sm text-gray-700 mb-1">Bedroom</div>
    <div className="flex items-center space-x-2 font-semibold text-gray-900">
      <Image src={bedIconUrl} alt="Bed" width={20} height={20} />
      <span>{property.total_bed || '-'}</span>
    </div>
  </div>

  <div className="p-4">
    <div className="text-sm text-gray-700 mb-1">Bathroom</div>
    <div className="flex items-center space-x-2 font-semibold text-gray-900">
      <Image src={bathIconUrl} alt="Bath" width={20} height={20} />
      <span>{property.total_bath || '-'}</span>
    </div>
  </div>

  <div className="p-4">
    <div className="text-sm text-gray-700 mb-1">Area</div>
    <div className="flex items-center space-x-2 font-semibold text-gray-900">
      <Image src={areaIconUrl} alt="Area" width={20} height={20} />
      <span>{property.lot_size_area || '-'} {property.lot_size_units || ''}</span>
    </div>
  </div>
</div>

            {/* Property Description */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border mb-6 md:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">Property Description</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {property.list_desc_en || 'No description available.'}
              </p>
            </div>

            {/* Features */}
          
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-[#f3f4f6] rounded-xl md:rounded-2xl p-4 sm:p-6 shadow-sm border sticky top-4 md:top-6">
              {/* Price & Location */}
              <div className="mb-4 md:mb-6">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {property.current_list_price || '-'} <span className="text-base sm:text-lg font-normal text-gray-600">QAR/month</span>
                </div>
                <div className="flex items-center text-gray-600 ">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-xs sm:text-sm">{property.list_address?.address || '-'}</span>
                </div>
              </div>

              {/* Agent Info */}
              <div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full overflow-hidden">
  <Image
    src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150"
    alt="Agent"
    width={48}
    height={48}
    className="w-full h-full object-cover"
  />
</div>

                  <div>
                    <h3 className="font-semibold text-gray-900">Oumaima Labaoui</h3>
                    <p className="text-sm text-gray-600">Senior Sales Manager</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 ">
                  <button className="bg-black text-white hover:bg-gray-800 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl flex items-center justify-center space-x-2 transition-colors text-xs sm:text-sm">
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </button>
                  <button className="border bg-black text-white border-gray-300 text-gray-700 hover:bg-gray-50 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl flex items-center justify-center space-x-2 transition-colors text-xs sm:text-sm">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl sm:rounded-2xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl sm:rounded-2xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                />
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => handleInputChange('countryCode', e.target.value)}
                    className="w-full sm:w-28 px-3 pr-6 py-2 border border-gray-300 rounded-xl sm:rounded-2xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                  >
                    <option value="+974">+974</option>
                    <option value="+971">+971</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-xl sm:rounded-2xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                  />
                </div>
                <textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl sm:rounded-2xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent overflow-hidden resize-none text-xs sm:text-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-gray-800 py-2 sm:py-3 rounded-lg font-medium transition-colors text-xs sm:text-base"
                >
                  Submit enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
}