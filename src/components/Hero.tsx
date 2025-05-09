
import { ArrowDown } from "lucide-react";
import Button from "./Button";

const Hero = () => {
  const handleScrollDown = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden flex items-center">
      <div className="section-container flex flex-col items-center text-center z-10">
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
          <span className="inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium mb-6">
            AI-Powered Trading Coach
          </span>
        </div>
        
        <h1 className="animate-fade-in-up opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mb-6" style={{ animationDelay: '0.3s' }}>
          Refine Your Trading Strategy with{" "}
          <span className="text-gradient bg-gradient-to-r from-purple-500 to-bluetint-600 bg-clip-text text-transparent">
            AI-Powered Insights
          </span>
        </h1>
        
        <p className="animate-fade-in-up opacity-0 text-xl text-charcoal-700 max-w-2xl mb-10" style={{ animationDelay: '0.5s' }}>
          Upload your trade history and let our AI analyze your performance, detect patterns, and provide personalized coaching to improve your trading results.
        </p>
        
        <div className="animate-fade-in-up opacity-0 flex flex-col sm:flex-row gap-4 mb-16" style={{ animationDelay: '0.7s' }}>
          <Button size="lg" glow>
            Start Free Analysis
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
        
        <div className="animate-fade-in-up opacity-0 w-full max-w-5xl" style={{ animationDelay: '0.9s' }}>
          <div className="glass-card rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=800&q=80" 
              alt="ProfitPilot Dashboard Preview" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        <button 
          onClick={handleScrollDown}
          className="animate-fade-in opacity-0 absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-sm text-charcoal-600 hover:text-purple-500 transition-colors"
          style={{ animationDelay: '1.1s' }}
        >
          <span className="mb-2">Discover More</span>
          <ArrowDown className="animate-bounce" size={20} />
        </button>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-purple-100/50 to-transparent opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-bluetint-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" />
    </section>
  );
};

export default Hero;
