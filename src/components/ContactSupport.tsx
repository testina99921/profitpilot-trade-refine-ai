
import React from 'react';
import Button from './Button';
import { MessageCircle } from 'lucide-react';

const ContactSupport = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#120c22] to-background border-t border-purple-900/30">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="glass-card p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-playfair">
            Need Help With Your Trading?
          </h3>
          
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Our support team of experienced traders and AI specialists are ready to assist you with any questions or challenges you might be facing.
          </p>
          
          <Button size="lg" glow className="mx-auto">
            <MessageCircle className="mr-2" />
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;
