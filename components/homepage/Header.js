import React from 'react'
import Image from "next/image";
import Searchbar from "../Searchbar";
import headerimage from "@/public/assets/headerImage.png"
function Header() {
  return (
    <main className="px-3 md:px-10 py-9 max-h-dvh md:py-3 w-full gap-2 md:gap-0 md:h-[calc(100vh-40px)] flex md:flex-row flex-col items-center justify-between bg-[var(--background)] text-[var(--text-primary)]">
  {/* Left Section */}
  <div className="parts w-full md:w-[45%] md:h-[80%]">
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-snug lg:leading-snug">
      SEARCH YOUR AKTU{" "}
      <span className="text-[var(--accent)]">QUANTUM</span> &{" "}
      <span className="text-[var(--accent)]">NOTES</span>
    </h1>

    {/* Mobile image */}
    <div className="parts md:hidden w-full mt-4 h-[65%] bg-[var(--accent)] overflow-hidden rounded-lg">
      <Image src={headerimage} className="object-cover w-full h-full" alt="hero image" />
    </div>

    <p className="text-2xl tracking-wide mt-4 text-[var(--text-secondary)]">
      Enjoy your learning with <br /> -Aktu Brand
    </p>

    {/* Searchbar */}
    <div className="searchbar mt-5">
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
