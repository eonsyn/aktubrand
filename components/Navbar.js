'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/assets/logo.png";
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDir, setScrollDir] = useState('up');
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { href: '/branch/mechanical', label: 'Mechanical', title: 'Mechanical Engineering' },
    { href: '/branch/cse', label: 'CSE', title: 'Computer Science' },
    { href: '/pyqs', label: 'PYQs', title: 'Previous Year Papers' },
    { href: '/blog', label: 'Blog', title: 'Blog' },
    { href: '#Privacy', label: 'Privacy' },
    { href: '/request', label: 'Request', title: 'Request quantum and notes' },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setScrollDir(currentScrollY > lastScrollY ? 'down' : 'up');
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldHide = scrollDir === 'down' && !isOpen;

  return (
    <motion.nav
      animate={{ y: shouldHide ? -100 : 0 }}
      transition={{ duration: 0.25 }}
      className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/30 shadow-sm rounded-b-lg"
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 md:px-8 py-3 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-gray-800">
          <Image src={logo} height={32} width={32} alt="AKTU Brand Logo" />
          <span className="text-xl">AktuBrand</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              title={link.title}
              className={`relative transition-colors duration-300 hover:text-blue-600 
                ${pathname === link.href ? 'text-blue-600 font-bold before:w-full' : 'font-semibold'}
                before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px]
                before:bg-blue-600 before:transition-all before:duration-300 hover:before:w-full`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          aria-label="Toggle Menu"
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu Slide-in */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div
              onClick={closeMenu}
              className="fixed inset-0 h-[100dvh] bg-black/30 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 w-72 rounded-l-lg bg-white h-[100dvh] shadow-lg z-50 p-5 md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-700">Menu</span>
                <button
                  onClick={closeMenu}
                  className="text-2xl text-gray-700 hover:text-red-500"
                  aria-label="Close Menu"
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col gap-4 text-gray-800 font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    title={link.title}
                    onClick={closeMenu}
                    className={`transition-colors hover:text-blue-600 ${pathname === link.href ? 'text-blue-600 font-semibold' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
