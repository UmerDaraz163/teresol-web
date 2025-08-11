'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Data with unique hrefs for active state checking
const menuItems = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  // { name: 'Solutions', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Services', href: '/services' },
  // { name: 'Resources', href: '/' },
  { name: 'Blog', href: '/' },
  { name: 'Careers', href: '/' },
  { name: 'Contact', href: '/contact' },
];

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? 'bg-white/95 shadow-md backdrop-blur-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-0 sm:px-0 lg:px-0">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
              <img
                src='/logo.png'
                alt="Teresol Logo"
                className={`h-20 w-auto transition-all duration-300 hover:scale-105 ${ // Changed h-12 to h-16
                  !isScrolled ? 'brightness-0 invert' : ''
                }`}
                suppressHydrationWarning={true}
              />
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
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

             <div className="hidden lg:flex items-center">
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

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-300 ${
                    isScrolled ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-full max-w-xs z-50 bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex-shrink-0">
               <img src="/logo.png" alt="Teresol Logo" className="h-10 w-auto" />
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
          <div className="p-4 border-t">
              <Link href="/contact" className="w-full block text-center px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                Contact Us
              </Link>
          </div>
        </div>
      </div>
    </>
  );
}