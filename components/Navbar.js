'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "@/public/assets/logo.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/30 backdrop-blur-md border-b border-white/20">
      <div className="flex items-center justify-between px-4 md:px-10 py-2 h-14">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-black font-semibold">
            <Image src={logo} height={30} width={30} alt="logo" />
            AktuBrand
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-6 text-black font-bold items-center">
          <Link href="#quantum" className="hover:text-blue-600">Quantum</Link>
          <Link href="/blog" className="hover:text-blue-600">Blogs</Link>
          <Link href="#privacy" className="hover:text-blue-600">Privacy Policy</Link>
          <Link href="#contact" className="hover:text-blue-600">Contact</Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl text-black focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="flex flex-col px-4 pb-4 md:hidden text-black font-medium gap-2 bg-white/70 backdrop-blur-md">
          <Link href="#quantum" className="hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Quantum</Link>
          <Link href="/blog" className="hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Blogs</Link>
          <Link href="#privacy" className="hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Privacy Policy</Link>
          <Link href="#contact" className="hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
