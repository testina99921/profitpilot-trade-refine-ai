
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

const Contact = () => {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    }
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Contact form submission:", data);
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });
    
    form.reset();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(-1)}
              className="mb-4 rounded-full"
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-3xl font-bold text-white mb-2">Contact Support</h1>
            <p className="text-gray-300">
              Have questions or need assistance? Our team is here to help you.
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-purple-900/20 mb-8">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="How can we help you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide details about your question or issue..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="border-t border-purple-900/20 flex flex-col items-start pt-4">
              <p className="text-sm text-gray-300 mb-4">
                Expect a response within 24-48 business hours.
              </p>
              <div className="flex items-center justify-center w-full">
                <div className="h-px bg-purple-900/30 flex-grow"></div>
                <span className="px-4 text-gray-400 text-sm">OR</span>
                <div className="h-px bg-purple-900/30 flex-grow"></div>
              </div>
              <p className="text-sm text-gray-300 mt-4 w-full text-center">
                Email us directly at <a href="mailto:support@profitpilot.com" className="text-purple-400 hover:text-purple-300">support@profitpilot.com</a>
              </p>
            </CardFooter>
          </Card>
          
          <div className="bg-card/50 backdrop-blur-sm border border-purple-900/20 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-300">
                  We accept all major credit cards, PayPal, and Apple Pay. For annual subscriptions, we also offer wire transfers.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-2">How do I cancel my subscription?</h3>
                <p className="text-gray-300">
                  You can cancel your subscription at any time from your account settings. Your subscription will remain active until the end of the current billing period.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Is my trading data secure?</h3>
                <p className="text-gray-300">
                  Yes, we take data security seriously. All your trading data is encrypted both in transit and at rest, and we never share your information with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
