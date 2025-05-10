
import React from "react";

const FeaturedIn = () => {
  const publications = [
    {
      name: "Forbes",
      logoClass: "text-xl md:text-2xl font-serif font-bold tracking-tight"
    },
    {
      name: "TechCrunch",
      logoClass: "text-lg md:text-xl font-sans font-bold"
    },
    {
      name: "CoinTelegraph",
      logoClass: "text-lg md:text-xl font-mono font-bold uppercase"
    },
    {
      name: "Bloomberg",
      logoClass: "text-lg md:text-xl font-serif font-bold"
    },
    {
      name: "CoinDesk",
      logoClass: "text-lg md:text-xl font-sans font-bold"
    },
    {
      name: "Financial Times",
      logoClass: "text-base md:text-lg font-serif italic font-medium"
    }
  ];

  return (
    <section className="py-6 bg-gradient-to-b from-[#120c22] to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="text-center mb-4">
          <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium font-roboto">Featured In</h3>
        </div>
        
        <div className="overflow-hidden">
          <div className="flex space-x-12 md:space-x-20 animate-scroll overflow-visible py-2">
            {publications.concat(publications).map((pub, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 flex items-center justify-center text-gray-400/60 transition-opacity hover:text-gray-300/90 hover:opacity-100"
              >
                <span className={pub.logoClass}>{pub.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
