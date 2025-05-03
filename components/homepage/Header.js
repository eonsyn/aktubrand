import React from 'react'
import Image from "next/image";
import Searchbar from "../Searchbar";
import headerimage from "@/public/assets/headerImage.png"
function Header() {
  return (
    <main className="px-3 md:px-10 py-9 max-h-dvh md:py-3 w-full gap-2 md:gap-0  md:h-[calc(100vh-40px)] flex md:flex-row flex-col items-center justify-between">
      <div className="parts w-full md:w-[45%]   md:h-[80%] ">
        <h1 className="text-6xl md:text-7xl lg:text-7xl font-bold leading-12 md:leading-20 lg:leading-16">
          SEARCH YOUR AKTU <span className="text-highlight" >QUANTUM</span>  & <span className="text-highlight">NOTES</span>
        </h1>

        <div className="parts md:hidden w-full  mt-2 h-[65%] bg-highlight overflow-hidden rounded-lg">
          <Image src={headerimage} className="object-cover w-full h-full" alt="hero image" />
        </div>
        <p className="text-2xl tracking-wide mt-3">
          Enjoy your learning with <br />
          -Aktu Brand
        </p>
        <div className="searchbar mt-3">
           <Searchbar />  
          
        </div>
      </div>
      <div className="parts w-full  md:w-[50%] h-[80%] bg-highlight overflow-hidden hidden md:block rounded-lg">
        <Image src={headerimage} className="object-cover w-full h-full" alt="hero image" />
      </div>

    </main>
  )
}

export default Header
