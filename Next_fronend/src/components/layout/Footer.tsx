import React from 'react';
import Link from 'next/link';
import { Globe, Languages, Sparkles } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ];

  const companyLinks = [
    { name: 'Sustainability', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 sm:gap-8">
          {/* Logo & Slogan */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
              TripForge
            </Link>
            <p className="mt-4 text-sm leading-6 text-gray-500 max-w-xs">
              Redefining the art of discovery through high-curated travel experiences and editorial-grade logistics.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-bold tracking-wider text-gray-900 uppercase">
              Connect
            </h3>
            <div className="mt-4 flex space-x-6">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Languages className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Sparkles className="w-5 h-5" />
              </Link>
            </div>
            <p className="mt-8 text-xs text-gray-400">
              © {currentYear} TripForge. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
