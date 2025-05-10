
import React from 'react';
import Button from './Button';
import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactSupport = () => {
  const navigate = useNavigate();
  
  const handleContactClick = () => {
    navigate('/contact');
  };
  
  return (
    <section className="py-10 bg-gradient-to-b from-[#1a0f37] to-[#12091e] border-t border-purple-900/30">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h3 className="text-2xl font-roboto font-medium mb-4 text-white">Need Help?</h3>
        <p className="text-gray-300 font-roboto font-light mb-6 max-w-lg mx-auto">
          Our support team is ready to assist you with any questions or issues you might have.
        </p>
        <Button 
          size="lg" 
          glow 
          className="mx-auto opacity-90 hover:opacity-100"
          onClick={handleContactClick}
        >
          <MessageCircle className="mr-2" />
          Contact Support
        </Button>
      </div>
    </section>
  );
};

export default ContactSupport;
