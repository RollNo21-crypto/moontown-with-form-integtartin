import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    // Close menus first
    setIsOpen(false);
    setIsDropdownOpen(false);

    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // If already on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 64; // Height of the fixed navbar
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Handle scroll after navigation
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navbarHeight = 64; // Height of the fixed navbar
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      // Clear the state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const navigateTo = (path: string) => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => navigateTo('/')} 
              className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              TheaterBook
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-600 hover:text-indigo-500 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-600 hover:text-indigo-500 transition-colors"
            >
              Our Services
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-gray-600 hover:text-indigo-500 transition-colors"
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-indigo-500 transition-colors"
            >
              About Us
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-600 hover:text-indigo-500 transition-colors"
              >
                Customer Support
                <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={() => navigateTo('/pricing')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors"
                  >
                    Pricing Details
                  </button>
                  <button
                    onClick={() => navigateTo('/refund-policy')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors"
                  >
                    Refund Policy
                  </button>
                  <button
                    onClick={() => navigateTo('/faqs')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors"
                  >
                    FAQs
                  </button>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-600 hover:text-indigo-500 transition-colors"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
              aria-expanded="false"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50 transition-colors"
            >
              Our Services
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50 transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50 transition-colors"
            >
              About Us
            </button>
            <div className="px-3 py-2">
              <p className="text-base font-medium text-gray-600 mb-2">Customer Support</p>
              <div className="pl-4 space-y-2">
                <button
                  onClick={() => navigateTo('/pricing')}
                  className="block w-full text-left text-base text-gray-600 hover:text-indigo-500 transition-colors"
                >
                  Pricing Details
                </button>
                <button
                  onClick={() => navigateTo('/refund-policy')}
                  className="block w-full text-left text-base text-gray-600 hover:text-indigo-500 transition-colors"
                >
                  Refund Policy
                </button>
                <button
                  onClick={() => navigateTo('/faqs')}
                  className="block w-full text-left text-base text-gray-600 hover:text-indigo-500 transition-colors"
                >
                  FAQs
                </button>
              </div>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-indigo-500 hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;