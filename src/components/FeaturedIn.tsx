
import React from "react";

const FeaturedIn = () => {
  const publications = [
    {
      name: "Forbes",
      logoClass: "text-2xl md:text-4xl font-serif font-bold tracking-tight"
    },
    {
      name: "TechCrunch",
      logoClass: "text-xl md:text-3xl font-sans font-bold"
    },
    {
      name: "CoinTelegraph",
      logoClass: "text-xl md:text-3xl font-mono font-bold uppercase"
    },
    {
      name: "Bloomberg",
      logoClass: "text-xl md:text-3xl font-serif font-bold"
    },
    {
      name: "CoinDesk",
      logoClass: "text-xl md:text-3xl font-sans font-bold"
    },
    {
      name: "Financial Times",
      logoClass: "text-lg md:text-2xl font-serif italic font-medium"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-[#120c22] to-background">
      <div className="section-container">
        <div className="text-center mb-8">
          <h3 className="text-sm uppercase tracking-wider text-gray-400 font-medium font-montserrat">Featured In</h3>
        </div>
        
        <div className="overflow-hidden">
          <div className="flex space-x-12 md:space-x-20 animate-scroll overflow-visible py-4">
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
