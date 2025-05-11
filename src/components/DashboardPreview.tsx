
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import { Link } from 'react-router-dom';

const DashboardPreview = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-indigo-950/80 to-indigo-950/60">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-inter">ProfitPilot Dashboard Preview</h2>
          <p className="text-lg text-gray-300 font-inter font-light mb-10">
            Visualize your trading performance with our comprehensive analytics dashboard. 
            Get actionable insights to improve your strategy and results.
          </p>
          <Button variant="secondary" size="lg" className="mx-auto mb-16">
            <Link to="/register" className="flex items-center">
              View Full Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        
        <div className="perspective-container">
          <div className="relative mx-auto w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden perspective-image">
            {/* Actual screenshot of the dashboard with fallback */}
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2000&q=80" 
              alt="ProfitPilot Trading Dashboard" 
              className="w-full h-auto rounded-xl border border-purple-500/30"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=80";
                e.currentTarget.style.minHeight = "400px";
              }}
            />
            <div className="absolute -bottom-4 -right-4 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 to-bluetint-500 blur-3xl opacity-20"></div>
            <div className="absolute -top-4 -left-4 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 to-bluetint-500 blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
