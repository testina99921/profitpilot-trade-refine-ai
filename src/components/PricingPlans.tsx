
import { Check } from "lucide-react";
import Button from "./Button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const PricingPlans = () => {
  const navigate = useNavigate();
  
  const handleButtonClick = (plan: string) => {
    navigate('/pricing');
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
    <section id="pricing" className="py-24 bg-gradient-to-b from-[#150c2e] to-[#1a0f37]">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-inter">Transparent Pricing Plans</h2>
          <p className="text-lg text-gray-300 font-inter font-light">
            Choose the plan that best fits your trading needs and scale up as your strategy evolves.
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
                  variant={plan.popular ? "primary" : "outline"} 
                  glow={plan.popular} 
                  fullWidth
                  onClick={() => handleButtonClick(plan.name.toLowerCase())}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
