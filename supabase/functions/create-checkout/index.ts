
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get the authorization header from the request
  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: 'No authorization header' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get the Stripe secret key from environment variables
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key is not set in the environment');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get the current user from the authorization header
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      throw new Error('Error getting user or user not found');
    }

    // Parse the request body to get the plan
    const { plan } = await req.json();
    if (!plan) {
      throw new Error('Plan is required');
    }

    console.log(`Creating checkout session for plan: ${plan}`);

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

    // Define price IDs for different plans - using real Stripe price IDs
    const prices = {
      pro: 'price_1M7NvuGH3DDpzNyNDIJPS3tW',     // Pro plan - $30/month
      advanced: 'price_1M7NwOGH3DDpzNyN9BwIBmWA', // Advanced plan - $75/month
      elite: 'price_1M7NwpGH3DDpzNyNDrQDOYzH'     // Elite plan - $200/month
    };

    // Get price ID for the selected plan
    const priceId = prices[plan];
    if (!priceId) {
      throw new Error(`Invalid plan: ${plan}`);
    }

    // Find or create a customer
    let customerId;
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log(`Found existing customer: ${customerId}`);
    } else {
      const newCustomer = await stripe.customers.create({
        email: user.email,
        metadata: {
          user_id: user.id,
        },
      });
      customerId = newCustomer.id;
      console.log(`Created new customer: ${customerId}`);
    }

    // Create a checkout session
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    console.log(`Using origin: ${origin}`);
    
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/dashboard?checkout_success=true`,
      cancel_url: `${origin}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    });

    console.log(`Checkout session created: ${session.id} with URL: ${session.url}`);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    console.error('Error in create-checkout:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An unknown error occurred' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
