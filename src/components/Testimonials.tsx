
import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      content: "Lunexa completely transformed my trading strategy. The AI insights identified patterns I was missing, and I've seen a 32% improvement in my win rate.",
      author: "Sarah Johnson",
      position: "Day Trader",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
    },
    {
      id: 2,
      content: "The dashboard visualization makes it so much easier to understand my trading performance. I can now spot weaknesses in my strategy that I didn't notice before.",
      author: "Michael Chang",
      position: "Crypto Investor",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
    },
    {
      id: 3,
      content: "I was skeptical at first, but the personalized recommendations have really helped me improve my trading discipline. Worth every penny!",
      author: "Elena Rodriguez",
      position: "Swing Trader",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
    }
  ];
  
  return (
    <section className="py-16 lg:py-24 bg-[#0e0823]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Traders Say</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Discover how Lunexa has helped traders around the world improve their performance and achieve better results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-white text-lg mb-6 font-light leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <div className="font-medium text-white">{testimonial.author}</div>
                  <div className="text-sm text-white/60">{testimonial.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
