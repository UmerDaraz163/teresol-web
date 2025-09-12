"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="Teresol Logo"
                className="h-10 w-auto"
                style={{ filter: "brightness(0) invert(1)" }} //to make logo white
              />
            </div>
            <p className="text-gray-300 mb-4">
              Leading provider of software, hardware, and embedded solutions for
              modern businesses.
            </p>
            <div className="flex space-x-4">
            {/* <Link href={'https://www.facebook.com/TeresolPvtLtd/'} target="_blank" rel="noopener noreferrer">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded cursor-pointer hover:bg-blue-700 transition-colors">
                <i className="ri-facebook-fill text-white"></i>
              </div>
              </Link>
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded cursor-pointer hover:bg-blue-700 transition-colors">
                <i className="ri-instagram-fill text-white"></i>
              </div> */}
              <Link href={'https://www.linkedin.com/company/teresolpvtltd'} target="_blank" rel="noopener noreferrer">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded cursor-pointer hover:bg-blue-700 transition-colors">
                <i className="ri-linkedin-fill text-white"></i>
              </div>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="/services#embedded-hardware-design-services" className="text-gray-300">Hardware Solutions</a>
              </li>

              <li>
                <a href="/services#enterprise-software-solutions" className="text-gray-300">Software Development</a>
              </li>
              <li>
                <a href="/services#ai-development-services" className="text-gray-300">AI Development</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 flex items-center justify-center mt-1">
                  <i className="ri-map-pin-line text-blue-400"></i>
                </div>
                <a href="https://maps.app.goo.gl/ePqb6Wpy4dbfVMoF8" target="_blank">
                <span className="text-gray-300">
                  15- Sheikh Zayed Bin Sultan Road (GT Road) , Sector-H, DHA
                  Phase-II, Islamabad, Pakistan
                </span>
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-phone-line text-blue-400"></i>
                </div>
                <a href="tel:+92518430644" className="text-gray-300">
                  +92 51 8430644
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-mail-line text-blue-400"></i>
                </div>
                <a href="mailto:info@teresol.com" className="text-gray-300">
                  info@teresol.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Teresol . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
