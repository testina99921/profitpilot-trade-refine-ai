
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Michael Chen",
    role: "Day Trader, 3 years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    quote: "ProfitPilot completely transformed my trading approach. The AI detected my FOMO patterns and helped me develop a more disciplined strategy.",
    stars: 5
  },
  {
    name: "Sarah Johnson",
    role: "Crypto Investor, 5 years",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    quote: "I struggled with timing my exits for years. ProfitPilot's analysis showed me exactly where I was leaving money on the table.",
    stars: 5
  },
  {
    name: "David Rodriguez",
    role: "Swing Trader, 2 years",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    quote: "As a new trader, I was making every mistake in the book. The personalized feedback helped me develop a proper strategy.",
    stars: 4
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-10 bg-gradient-to-b from-[#1a0f37] to-[#150c2e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white font-roboto">
            Trader Success Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="testimonial-card h-full glass-card flex flex-col gap-3 p-5 bg-indigo-900/20 border border-purple-500/20">
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50"
                  />
                  <div>
                    <h4 className="font-medium text-white font-roboto">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400 font-roboto font-light">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={cn(
                        "mr-1", 
                        i < testimonial.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
                      )} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-300 italic text-sm font-roboto font-light">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
