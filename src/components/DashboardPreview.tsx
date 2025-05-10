
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import { Link } from 'react-router-dom';

const DashboardPreview = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-indigo-950/80 to-indigo-950/60">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Powerful Analytics Dashboard</h2>
          <p className="text-lg text-gray-300 font-inter font-light mb-10">
            Visualize your trading performance with our comprehensive analytics dashboard. 
            Get actionable insights to improve your strategy and results.
          </p>
          <Button variant="secondary" size="lg" className="mx-auto mb-16">
            <Link to="/dashboard" className="flex items-center">
              View Full Dashboard <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        
        <div className="perspective-container">
          <div className="relative mx-auto w-full max-w-5xl">
            <div className="glass-dark rounded-xl shadow-2xl overflow-hidden perspective-image">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="ProfitPilot Dashboard Preview" 
                className="w-full object-cover border border-purple-500/20"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <p className="text-lg text-gray-200 font-inter font-light">
                  Detailed trading analytics and performance metrics
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 to-bluetint-500 blur-3xl opacity-20"></div>
            <div className="absolute -top-4 -left-4 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500 to-bluetint-500 blur-3xl opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
