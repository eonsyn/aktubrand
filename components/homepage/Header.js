import React from 'react'
import Image from "next/image";
import Searchbar from "../Searchbar";
import headerimage from "@/public/assets/headerImage.png"
function Header() {
  return (
    <main className="px-3 md:px-10 py-9 max-h-dvh md:py-3 w-full gap-2 md:gap-0 md:h-[calc(100vh-40px)] flex md:flex-row  flex-col items-center justify-between bg-[var(--background)] text-[var(--text-primary)]">
  {/* Left Section */}
  <div className="parts w-full md:w-[45%] md:h-[80%]">
    <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight">
      SEARCH YOUR AKTU{" "}
      <span className="text-[var(--accent)]">QUANTUM</span> &{" "}
      <span className="text-[var(--accent)]">NOTES</span>
    </h1>

    {/* Mobile image */}
    <div className="parts md:hidden w-full mt-4 h-[65%] bg-[var(--accent)] overflow-hidden rounded-lg">
      <Image src={headerimage} className="object-cover w-full h-full" alt="hero image" />
    </div>

  

    {/* Searchbar */}
    <div className="searchbar mt-2">
      <span className='text-xl font-bold'>Resource for:</span>
      <Searchbar />
    </div>
  </div>

  {/* Desktop image */}
  <div className="parts w-full md:w-[50%] h-[80%] bg-[var(--accent)] overflow-hidden hidden md:block rounded-lg">
    <Image src={headerimage} className="object-cover w-full h-full" alt="hero image" />
  </div>
</main>

  )
}

export default Header
