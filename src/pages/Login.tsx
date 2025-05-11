
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const Login = () => {
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // In a real app, we would validate credentials with an API
    console.log("Login attempt with:", data);
    
    // For now, simulate login success
    toast({
      title: "Login successful!",
      description: "Redirecting to your dashboard...",
    });
    
    // In a real app, we'd redirect after successful login
    setTimeout(() => navigate('/dashboard'), 1500);
  };
  
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would send a password reset email
    toast({
      title: "Reset email sent",
      description: "Check your inbox for password reset instructions",
    });
    
    // Hide the forgot password form
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex justify-center mb-4">
            <div className="font-bold text-3xl text-white">
              Profit<span className="text-purple-500">Pilot</span>
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-300">
            New to ProfitPilot?{" "}
            <Link to="/register" className="font-medium text-purple-400 hover:text-purple-300">
              Create an account
            </Link>
          </p>
        </div>
        
        {!showForgotPassword ? (
          <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>Enter your credentials to access your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <button 
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-xs text-purple-400 hover:text-purple-300"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full mt-4">
                    Sign in
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-xs text-center text-muted-foreground">
                By signing in, you agree to our{" "}
                <Link to="/terms" className="text-purple-400 hover:text-purple-300">Terms of Service</Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
              </p>
            </CardFooter>
          </Card>
        ) : (
          <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20">
            <CardHeader>
              <CardTitle>Reset your password</CardTitle>
              <CardDescription>We'll send you an email with reset instructions</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button type="submit" className="flex-1">
                    Send reset email
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForgotPassword(false)}
                    className="flex-1"
                  >
                    Back to sign in
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Login;
