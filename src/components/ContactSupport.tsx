
import React from 'react';
import Button from './Button';
import { MessageCircle } from 'lucide-react';

const ContactSupport = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#12092e] to-[#0b051e] border-t border-purple-900/20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <Button size="lg" glow className="mx-auto lunexa-btn lunexa-btn-primary">
          <MessageCircle className="mr-2" />
          Contact Support
        </Button>
      </div>
    </section>
  );
};

export default ContactSupport;
