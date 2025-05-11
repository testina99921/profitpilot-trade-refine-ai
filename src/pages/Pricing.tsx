
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "@/components/ui/use-toast";

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In a real app, this would come from auth state
  
  const handleBackClick = () => {
    if (showCheckout) {
      setShowCheckout(false);
    } else {
      navigate('/');
    }
  };
  
  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    
    // Check if user is logged in
    if (!isLoggedIn) {
      // Redirect to register page with plan query parameter
      navigate(`/register?plan=${plan.toLowerCase()}`);
      return;
    }
    
    // Show checkout form
    setShowCheckout(true);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would handle the payment processing
    toast({
      title: "Payment successful!",
      description: "Thank you for subscribing to our service.",
    });
    // Redirect to dashboard
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Basic AI analysis for casual traders",
      features: [
        "5 trade reviews per month",
        "Basic performance feedback",
        "Trading style identification",
        "7-day data history",
        "Email support"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "30",
      description: "Advanced insights for serious traders",
      features: [
        "200 trade reviews per month",
        "AI trade optimization insights",
        "Risk pattern detection",
        "30-day data history",
        "Entry/exit timing analysis",
        "Priority email support"
      ],
      buttonText: "Start Pro Trial",
      popular: true,
      tag: "MOST POPULAR"
    },
    {
      name: "Advanced",
      price: "75",
      description: "Comprehensive analytics for professionals",
      features: [
        "1000 trade reviews per month",
        "Risk exposure mapping",
        "Risk pattern detection",
        "90-day data history",
        "Advanced AI insights",
        "Priority chat support"
      ],
      buttonText: "Choose Advanced",
      popular: false,
      discount: "25% OFF",
    },
    {
      name: "Elite",
      price: "200",
      description: "Full suite for professional traders",
      features: [
        "3000 trade reviews per month",
        "Advanced AI insights",
        "Real-time AI alerts",
        "Unlimited data history",
        "Risk exposure mapping",
        "Access to Trading Discord"
      ],
      buttonText: "Choose Elite",
      popular: false
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-20 bg-gradient-to-b from-[#150c2e] to-[#1a0f37]">
        <div className="section-container">
          <div className="mb-8 flex items-center">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleBackClick}
              className="mr-4 rounded-full"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white font-inter">
                {showCheckout ? `Checkout - ${selectedPlan?.name} Plan` : "Choose Your Plan"}
              </h1>
              <p className="text-gray-300 font-inter font-light">
                {showCheckout ? "Complete your purchase" : "Select the plan that best fits your trading needs."}
              </p>
            </div>
          </div>
          
          {!showCheckout ? (
            <>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-inter">Transparent Pricing Plans</h2>
                <p className="text-lg text-gray-300 font-inter font-light">
                  Upgrade your trading strategy with our AI-powered insights and scale up as your needs evolve.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {plans.map((plan, index) => (
                  <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div 
                      className={cn(
                        "glass-card h-full flex flex-col p-6 relative",
                        plan.popular && "border-2 border-purple-500"
                      )}
                    >
                      {plan.popular && (
                        <div className="price-tag">
                          {plan.tag}
                        </div>
                      )}
                      
                      {plan.discount && (
                        <div className="discount-tag">
                          {plan.discount}
                        </div>
                      )}
                      
                      <div className="mb-6">
                        <h3 className="text-xl font-bold mb-2 font-inter">{plan.name}</h3>
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold">${plan.price}</span>
                          <span className="text-gray-400 ml-2">/month</span>
                        </div>
                        <p className="mt-3 text-gray-300 font-inter font-light">{plan.description}</p>
                      </div>
                      
                      <div className="flex-grow mb-6">
                        <ul className="space-y-3">
                          {plan.features.map((feature, i) => (
                            <li key={i} className="flex">
                              <Check size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                              <span className="text-gray-300 font-inter font-light">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button 
                        variant={plan.popular ? "default" : "outline"} 
                        className={cn(
                          "w-full", 
                          plan.popular && "bg-purple-600 hover:bg-purple-700"
                        )}
                        onClick={() => handleSubscribe(plan.name)}
                      >
                        {plan.buttonText}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="glass-card p-6 animate-fade-in">
                <h2 className="text-xl font-bold mb-6 font-inter">Complete Your Purchase</h2>
                <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1 font-inter font-light">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-2 rounded bg-[#1A0F37] border border-purple-900/30 text-white"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-1 font-inter font-light">Card Number</label>
                    <input 
                      type="text" 
                      className="w-full p-2 rounded bg-[#1A0F37] border border-purple-900/30 text-white"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-1 font-inter font-light">Expiration</label>
                      <input 
                        type="text" 
                        className="w-full p-2 rounded bg-[#1A0F37] border border-purple-900/30 text-white"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-1 font-inter font-light">CVC</label>
                      <input 
                        type="text" 
                        className="w-full p-2 rounded bg-[#1A0F37] border border-purple-900/30 text-white"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-1 font-inter font-light">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 rounded bg-[#1A0F37] border border-purple-900/30 text-white"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-1 font-inter font-light">Country or Region</label>
                    <select 
                      className="w-full p-2 rounded bg-[#1A0F37] border border-purple-900/30 text-white"
                      required
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-300 mb-1 font-inter font-light">Address</label>
                    <input 
                      type="text" 
                      className="w-full p-2 rounded bg-[#1A0F37] border border-purple-900/30 text-white"
                      placeholder="123 Main St"
                      required
                    />
                  </div>
                  
                  <div className="border-t border-purple-900/30 pt-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-300 font-inter font-light">Subtotal</span>
                      <span className="font-semibold font-inter">${selectedPlan?.price || "0"}.00</span>
                    </div>
                    
                    <Button 
                      type="submit" 
                      variant="default" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Pay ${selectedPlan?.price || "0"}.00
                    </Button>
                    
                    <p className="mt-4 text-xs text-gray-400 font-inter font-light text-center">
                      Your payment information is securely processed. We don't store your card details.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
