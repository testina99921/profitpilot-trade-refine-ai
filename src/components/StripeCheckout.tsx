
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft } from 'lucide-react';

interface StripeCheckoutProps {
  planName: string;
  planPrice: string;
  returnToPlans: () => void;
}

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

      // Call Supabase Edge Function to create checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan: planName.toLowerCase() }
      });

      if (error) {
        throw new Error(error.message);
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
    <div className="max-w-md mx-auto">
      <div className="glass-card p-6 animate-fade-in">
        <div className="flex items-center mb-4">
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

        <div className="mb-6">
          <p className="text-gray-300 font-inter font-light mb-4">
            You're about to subscribe to our {planName} plan at ${planPrice}/month.
            Click the button below to proceed to secure payment.
          </p>
          
          <div className="border-t border-purple-900/30 pt-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-inter">Subscription</span>
              <span className="font-medium">{planName} Plan</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-300 font-inter">Price</span>
              <span className="font-semibold">${planPrice}/month</span>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isLoading ? "Processing..." : `Proceed to Payment`}
        </Button>
        
        <p className="mt-4 text-xs text-gray-400 font-inter font-light text-center">
          Your payment will be processed securely by Stripe. We don't store your card details.
        </p>
      </div>
    </div>
  );
};

export default StripeCheckout;
