
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
          <span className="inline-block bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full text-sm font-medium mb-6 border border-purple-500/30">
            AI-Powered Trading Coach
          </span>
        </div>
        
        <h1 className="animate-fade-in-up opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mb-6 font-roboto" style={{ animationDelay: '0.3s' }}>
          Refine Your Trading Strategy with{" "}
          <span className="text-gradient bg-gradient-to-r from-purple-400 to-bluetint-400 bg-clip-text text-transparent">
            AI-Powered Insights
          </span>
        </h1>
        
        <p className="animate-fade-in-up opacity-0 text-lg text-gray-300 max-w-2xl mb-10 font-roboto font-light" style={{ animationDelay: '0.5s' }}>
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
        
        {/* Dashboard preview image moved here from DashboardPreview component */}
        <div className="animate-fade-in-up opacity-0 w-full max-w-5xl perspective-container mb-16" style={{ animationDelay: '0.9s' }}>
          <div className="relative mx-auto w-full max-w-5xl glass-dark rounded-xl shadow-2xl overflow-hidden perspective-image">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
              {/* Sample Dashboard Widget */}
              <div className="glass-card rounded-lg p-4 col-span-3 md:col-span-2 border border-purple-500/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-roboto font-medium">Performance Overview</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>
                </div>
                <div className="h-[200px] relative">
                  {/* Simulated Chart */}
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-1/12 bg-purple-500/50 h-[30%] rounded-t-sm mx-0.5"></div>
                    <div className="w-1/12 bg-purple-500/50 h-[45%] rounded-t-sm mx-0.5"></div>
                    <div className="w-1/12 bg-purple-500/50 h-[65%] rounded-t-sm mx-0.5"></div>
                    <div className="w-1/12 bg-purple-500/50 h-[55%] rounded-t-sm mx-0.5"></div>
                    <div className="w-1/12 bg-purple-500/50 h-[75%] rounded-t-sm mx-0.5"></div>
                    <div className="w-1/12 bg-purple-500/50 h-[90%] rounded-t-sm mx-0.5"></div>
                    <div className="w-1/12 bg-purple-500/50 h-[80%] rounded-t-sm mx-0.5"></div>
                    <div className="w-1/12 bg-purple-500/50 h-[95%] rounded-t-sm mx-0.5"></div>
                    <div className="w-1/12 bg-purple-500/50 h-[70%] rounded-t-sm mx-0.5"></div>
                    <div className="w-1/12 bg-purple-500/50 h-[85%] rounded-t-sm mx-0.5"></div>
                    <div className="w-1/12 bg-purple-500/50 h-[75%] rounded-t-sm mx-0.5"></div>
                    <div className="w-1/12 bg-purple-500/50 h-[60%] rounded-t-sm mx-0.5"></div>
                  </div>
                  {/* Line overlay */}
                  <div className="absolute top-0 left-0 right-0 h-full flex items-center">
                    <div className="h-[2px] w-full bg-gradient-to-r from-bluetint-600 to-purple-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Key Metrics */}
              <div className="glass-card rounded-lg p-4 border border-purple-500/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-roboto font-medium">Key Metrics</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bluetint-400"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M8 17.5v-10a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v10"></path><path d="M13.5 17.5v-7a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v7"></path></svg>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-roboto font-light">Win Rate</span>
                    <span className="text-white font-medium">58.7%</span>
                  </div>
                  <div className="w-full bg-gray-700/30 h-1.5 rounded-full">
                    <div className="h-1.5 rounded-full bg-purple-500" style={{width: '58.7%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-300 font-roboto font-light">Profit Factor</span>
                    <span className="text-white font-medium">2.3</span>
                  </div>
                  <div className="w-full bg-gray-700/30 h-1.5 rounded-full">
                    <div className="h-1.5 rounded-full bg-bluetint-500" style={{width: '76.6%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-300 font-roboto font-light">Max Drawdown</span>
                    <span className="text-white font-medium">12.4%</span>
                  </div>
                  <div className="w-full bg-gray-700/30 h-1.5 rounded-full">
                    <div className="h-1.5 rounded-full bg-green-500" style={{width: '87.6%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 to-bluetint-500 blur-3xl opacity-20"></div>
            <div className="absolute -top-4 -left-4 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 to-bluetint-500 blur-3xl opacity-20"></div>
          </div>
        </div>
        
        <button 
          onClick={handleScrollDown}
          className="animate-fade-in opacity-0 absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-sm text-gray-400 hover:text-purple-400 transition-colors"
          style={{ animationDelay: '1.1s' }}
        >
          <span className="mb-2">Discover More</span>
          <ArrowDown className="animate-bounce" size={20} />
        </button>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-purple-900/10 to-transparent opacity-60 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-800/10 rounded-full filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-bluetint-800/10 rounded-full filter blur-3xl opacity-30 animate-pulse pointer-events-none" />
    </section>
  );
};

export default Hero;
