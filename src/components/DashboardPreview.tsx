
import React from 'react';
import { ArrowRight, BarChart3, ChartBar, DollarSign, LineChart, TrendingUp } from 'lucide-react';
import Button from './Button';
import { Link } from 'react-router-dom';

const DashboardPreview = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-indigo-950/80 to-indigo-950/60">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-roboto">ProfitPilot Dashboard Preview</h2>
          <p className="text-lg text-gray-300 font-roboto font-light mb-10">
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
          <div className="relative mx-auto w-full max-w-5xl glass-dark rounded-xl shadow-2xl overflow-hidden perspective-image">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
              {/* Sample Dashboard Widget */}
              <div className="glass-card rounded-lg p-4 col-span-3 md:col-span-2 border border-purple-500/20">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-roboto font-medium">Performance Overview</h3>
                  <LineChart className="text-purple-400" size={20} />
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
                  <BarChart3 className="text-bluetint-400" size={20} />
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
              
              {/* Quick Stats */}
              <div className="glass-card rounded-lg p-4 col-span-3 border border-purple-500/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={16} className="text-green-500" />
                      <h4 className="text-sm font-roboto text-white">Total Trades</h4>
                    </div>
                    <p className="text-xl font-bold text-white">248</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <ChartBar size={16} className="text-blue-500" />
                      <h4 className="text-sm font-roboto text-white">Avg Trade</h4>
                    </div>
                    <p className="text-xl font-bold text-white">$487</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign size={16} className="text-green-500" />
                      <h4 className="text-sm font-roboto text-white">Profit</h4>
                    </div>
                    <p className="text-xl font-bold text-white">$12,837</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <LineChart size={16} className="text-purple-400" />
                      <h4 className="text-sm font-roboto text-white">Risk/Reward</h4>
                    </div>
                    <p className="text-xl font-bold text-white">1:2.4</p>
                  </div>
                </div>
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
