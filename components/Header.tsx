'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // ✅ Using Next.js Image for performance
import { usePathname } from 'next/navigation';

// Data for navigation items
const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
];

// SVG Icon for the hamburger menu
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);

// SVG Icon for the close button
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Effect to handle header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to close mobile menu on route change
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  // Effect to prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Teresol Logo"
                width={200} // Set a base width appropriate for your logo's aspect ratio
                height={80} // Set a base height appropriate for your logo's aspect ratio
                className={`h-16 lg:h-20 w-auto transition-all duration-300 hover:scale-105 ${
                  !isScrolled ? 'brightness-0 invert' : ''
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <nav className="flex items-center space-x-2 xl:space-x-4">
                {menuItems.map((item) =>
                  item.name !== 'Contact' ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-300 ${
                        isScrolled
                          ? pathname === item.href ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      {item.name}
                      {pathname === item.href && isScrolled && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-1 bg-blue-600 rounded-full"></span>
                      )}
                    </Link>
                  ) : null
                )}
              </nav>

              <Link
                href="/contact"
                className={`ml-6 px-5 py-2.5 text-sm font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  isScrolled
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-white border border-white hover:bg-white hover:text-blue-600'
                }`}
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                }`}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen} // ✅ Accessibility: Announce menu state
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Mobile Menu --- */}
      {/* Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-full max-w-xs z-50 bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Image
                src="/logo.png"
                alt="Teresol Logo"
                width={150} // Smaller size for the mobile menu
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>
          <nav className="flex-grow p-4">
            <ul className="flex flex-col space-y-2">
              {menuItems.map((item, index) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block w-full px-4 py-3 text-lg font-medium text-left rounded-lg transition-all duration-300 ease-in-out ${
                      pathname === item.href
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-100 hover:pl-6'
                    }`}
                    style={{ transitionDelay: isMenuOpen ? `${index * 30}ms` : '0ms' }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}