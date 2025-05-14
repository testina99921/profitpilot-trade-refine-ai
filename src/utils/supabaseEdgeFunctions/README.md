
# Supabase Edge Functions for Stripe Integration

This directory contains Edge Functions that need to be deployed to your Supabase project for handling Stripe payments.

## Prerequisites

1. A Supabase account and project
2. A Stripe account
3. Supabase CLI installed

## Deployment Steps

1. Log in to Supabase CLI:
```bash
supabase login
```

2. Link your Supabase project:
```bash
supabase link --project-ref your-project-ref
```

3. Set up your Stripe secret key:
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_your_secret_key
```

4. Deploy the Edge Functions:
```bash
supabase functions deploy create-checkout
```

## Required Environment Variables

- `STRIPE_SECRET_KEY`: Your Stripe secret key

## Additional Steps

1. Create Stripe products and price IDs in your Stripe dashboard
2. Update the price IDs in the `create-checkout.js` function
3. Set up Stripe webhooks for handling subscription status updates (optional but recommended)

## Testing

You can test the function locally before deploying:
```bash
supabase functions serve create-checkout --env-file .env.local
```

## Further Resources

- [Supabase Edge Functions documentation](https://supabase.io/docs/guides/functions)
- [Stripe API documentation](https://stripe.com/docs/api)
