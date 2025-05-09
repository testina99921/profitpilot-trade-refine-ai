
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Michael Chen",
    role: "Day Trader, 3 years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    quote: "ProfitPilot completely transformed my trading approach. The AI detected my FOMO patterns and helped me develop a more disciplined strategy. My win rate has improved by 32% in just two months.",
    stars: 5
  },
  {
    name: "Sarah Johnson",
    role: "Crypto Investor, 5 years",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    quote: "I struggled with timing my exits for years. ProfitPilot's analysis showed me exactly where I was leaving money on the table. The alternative trade simulations were eye-opening. My average profit per trade is up 24%.",
    stars: 5
  },
  {
    name: "David Rodriguez",
    role: "Swing Trader, 2 years",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    quote: "As a new trader, I was making every mistake in the book. The personalized feedback from ProfitPilot helped me understand my risk exposure and develop a proper strategy. I'm finally consistent in my trading.",
    stars: 4
  },
  {
    name: "Emma Taylor",
    role: "Futures Trader, 7 years",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80",
    quote: "The trading style recognition feature is brilliant. It identified that I was best at momentum trading but kept trying other styles. By focusing on my strength, my annual returns have nearly doubled.",
    stars: 5
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-[#120c22]">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-playfair">
            Trader Success Stories
          </h2>
          <p className="text-lg text-gray-300 font-montserrat">
            Discover how ProfitPilot has helped traders overcome challenges and improve their results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="testimonial-card h-full glass-card flex flex-col md:flex-row gap-6 p-6">
                <div className="flex-shrink-0">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/50"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={cn(
                          "mr-1", 
                          i < testimonial.stars ? "fill-yellow-400 text-yellow-400" : "text-gray-500"
                        )} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                  
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
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
