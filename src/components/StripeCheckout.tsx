
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Shield, CreditCard, CheckCircle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface StripeCheckoutProps {
  planName: string;
  planPrice: string;
  returnToPlans: () => void;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ planName, planPrice, returnToPlans }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      toast({
        title: "Connecting to payment processor",
        description: "Preparing your checkout session..."
      });

      // Skip authentication for demo purposes - this bypasses the normal auth flow
      // In a production environment, you'd want proper authentication
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          plan: planName.toLowerCase(),
          // Add a demo email to help the function create a checkout without auth
          demo_email: "demo@example.com"
        }
      });

      if (error) {
        console.error("Checkout error:", error);
        throw new Error(error.message || "Unknown checkout error");
      }

      if (data?.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout failed",
        description: "There was an error starting the checkout process. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card className="bg-gradient-to-b from-background/80 to-background border border-purple-800/30 shadow-lg overflow-hidden animate-fade-in">
        <CardHeader className="pb-3 border-b border-purple-900/20">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={returnToPlans}
              className="mr-2"
            >
              <ArrowLeft size={18} />
            </Button>
            <h2 className="text-xl font-bold font-inter">Checkout - {planName} Plan</h2>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <CreditCard size={32} className="text-purple-600" />
              </div>
            </div>
            
            <p className="text-gray-300 font-inter font-light text-center mb-6">
              You're about to subscribe to our <span className="font-semibold text-white">{planName}</span> plan at <span className="font-semibold text-white">${planPrice}/month</span>.
            </p>
            
            <div className="bg-purple-900/10 p-4 rounded-lg border border-purple-900/20">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 font-inter">Subscription</span>
                <span className="font-medium text-white">{planName} Plan</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-300 font-inter">Price</span>
                <span className="font-semibold text-white">${planPrice}/month</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="flex items-start">
                <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300 font-inter font-light text-sm">Cancel anytime. No long-term commitments.</span>
              </div>
              <div className="flex items-start">
                <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300 font-inter font-light text-sm">Immediate access to all {planName} features.</span>
              </div>
              <div className="flex items-start">
                <CheckCircle size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300 font-inter font-light text-sm">Dedicated support team available 24/7.</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4 pt-4 border-t border-purple-900/20">
          <Button 
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-base"
          >
            {isLoading ? "Processing..." : `Subscribe Now - $${planPrice}/month`}
          </Button>
          
          <div className="flex items-center justify-center text-xs text-gray-400 font-inter font-light">
            <Shield size={14} className="mr-1 text-gray-400" />
            <p>Secure payment processed by Stripe</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StripeCheckout;
