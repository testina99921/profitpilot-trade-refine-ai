
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Pricing = () => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate('/');
  };
  
  const handleSubscribe = (plan: string) => {
    // Check if user is logged in (this would be a proper auth check in a real app)
    const isLoggedIn = false; // This would be determined by auth state
    
    if (!isLoggedIn) {
      // Redirect to register page with plan query parameter
      navigate(`/register?plan=${plan.toLowerCase()}`);
    } else {
      // In a real app, this would navigate to checkout or activate the plan
      console.log(`Subscribing to ${plan} plan`);
    }
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
        "Alternative trade simulations",
        "90-day data history",
        "Custom strategy development",
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
        "Trading style coaching",
        "Real-time AI alerts",
        "Unlimited data history",
        "1-on-1 analyst consultation",
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
              <h1 className="text-3xl font-bold text-white">Choose Your Plan</h1>
              <p className="text-gray-300">Select the plan that best fits your trading needs.</p>
            </div>
          </div>
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Transparent Pricing Plans</h2>
            <p className="text-lg text-gray-300">
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
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-gray-400 ml-2">/month</span>
                    </div>
                    <p className="mt-3 text-gray-300">{plan.description}</p>
                  </div>
                  
                  <div className="flex-grow mb-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex">
                          <Check size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
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
          
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Need a custom solution?</h3>
            <p className="text-gray-300 mb-8">
              If you need specific features or have custom requirements, we offer tailored solutions for professional trading firms.
            </p>
            <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
              Contact for Custom Solution
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
