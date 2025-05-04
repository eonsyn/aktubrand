import Image from "next/image";
import WhyChooseUs from "@/components/homepage/WhyChooseUs";
import headerimage from "@/public/assets/headerImage.png"
import Header from "@/components/homepage/Header";
import BranchSection from "@/components/homepage/BranchSection";
import FaqSection from "@/components/homepage/FaqSection";

export async function generateMetadata({ params }) {
  return {
    title: 'Aktu Brand',
    description: 'Search Your AKTU QUANTUM & NOTES',
  };
}


export default function Home() {
  return (
   <div>
    <Header/>
     
    <BranchSection/>
    <WhyChooseUs/>
    <FaqSection/>
   </div>
  );
}
