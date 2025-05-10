
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#1a0f37]">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-inter">Contact Support</h1>
            <p className="text-gray-300 font-inter font-light">We're here to help with any questions or issues you may have.</p>
          </div>

          <div className="glass-card">
            <div className="mb-8 flex items-center justify-center">
              <div className="bg-purple-900/30 p-4 rounded-full">
                <Mail size={32} className="text-purple-300" />
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 font-inter">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#12091e] border border-purple-900/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-inter font-light"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 font-inter">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#12091e] border border-purple-900/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-inter font-light"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 font-inter">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full bg-[#12091e] border border-purple-900/30 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-inter font-light"
                  required
                />
              </div>
              
              <div className="text-center">
                <Button 
                  type="submit" 
                  disabled={submitting}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-md"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
            
            <div className="mt-12 text-center">
              <p className="font-inter font-light text-gray-300">Alternatively, you can email us directly at:</p>
              <a 
                href="mailto:support@profitpilot.com" 
                className="text-purple-400 hover:text-purple-300 font-medium block mt-1"
              >
                support@profitpilot.com
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
