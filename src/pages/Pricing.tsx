
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from "@/components/ui/use-toast";
import { UserPlan } from '@/types/dashboard';
import StripeCheckout from '@/components/StripeCheckout';

// Helper function to get the recommended plan based on current plan
const getRecommendedPlan = (currentPlan: string): string => {
  switch(currentPlan) {
    case 'free':
      return 'Pro';
    case 'pro':
      return 'Advanced';
    case 'advanced':
      return 'Elite';
    default:
      return 'Pro';
  }
};

const Pricing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In a real app, this would come from auth state
  
  // Extract the 'from' query parameter to determine which plan to highlight
  const queryParams = new URLSearchParams(location.search);
  const fromPlan = queryParams.get('from') as UserPlan || null;
  const planToHighlight = fromPlan ? getRecommendedPlan(fromPlan) : queryParams.get('plan') || 'Pro';
  
  useEffect(() => {
    // Set the highlighted plan on component mount
    if (planToHighlight) {
      const plan = plans.find(p => p.name.toLowerCase() === planToHighlight.toLowerCase());
      if (plan) {
        // Just visually highlight it, don't set as selected yet
        console.log(`Highlighting plan: ${planToHighlight}`);
      }
    }
  }, [planToHighlight]);
  
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
      navigate(`/register?plan=${plan.name.toLowerCase()}`);
      return;
    }
    
    // Show checkout form
    setShowCheckout(true);
  };

  const handleReturnToPlans = () => {
    setShowCheckout(false);
    setSelectedPlan(null);
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
          {!showCheckout && (
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
                  Choose Your Plan
                </h1>
                <p className="text-gray-300 font-inter font-light">
                  {fromPlan ? `Upgrade from your ${fromPlan} plan` : "Select the plan that best fits your trading needs."}
                </p>
              </div>
            </div>
          )}
          
          {!showCheckout ? (
            <>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-inter">Transparent Pricing Plans</h2>
                <p className="text-lg text-gray-300 font-inter font-light">
                  Upgrade your trading strategy with our AI-powered insights and scale up as your needs evolve.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {plans.map((plan, index) => {
                  // Determine if this plan should be highlighted based on the fromPlan parameter
                  const isRecommended = fromPlan && plan.name === planToHighlight;
                  
                  return (
                    <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div 
                        className={cn(
                          "glass-card h-full flex flex-col p-6 relative",
                          (plan.popular || isRecommended) && "border-2 border-purple-500"
                        )}
                      >
                        {plan.popular && (
                          <div className="price-tag">
                            {plan.tag}
                          </div>
                        )}
                        
                        {isRecommended && !plan.popular && (
                          <div className="price-tag bg-green-500">
                            RECOMMENDED
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
                          variant={(plan.popular || isRecommended) ? "default" : "outline"} 
                          className={cn(
                            "w-full", 
                            (plan.popular || isRecommended) && "bg-purple-600 hover:bg-purple-700"
                          )}
                          onClick={() => handleSubscribe(plan)}
                          disabled={plan.name === "Free"} // Free plan doesn't need checkout
                        >
                          {plan.buttonText}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <StripeCheckout 
              planName={selectedPlan?.name} 
              planPrice={selectedPlan?.price}
              returnToPlans={handleReturnToPlans}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
