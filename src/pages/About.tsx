
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSupport from '@/components/ContactSupport';
import { Code, Database, LightbulbIcon, Users, Award, Rocket } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: "Alexandra Reynolds",
      role: "CEO & Co-Founder",
      bio: "Former quantitative trader with 15 years of experience at top hedge funds. M.S. in Financial Engineering from MIT.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      name: "Marcus Chen",
      role: "CTO & Co-Founder",
      bio: "AI researcher with publications in machine learning for financial markets. Previously led engineering at a fintech unicorn.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      name: "Sophia Williams",
      role: "Chief Data Scientist",
      bio: "PhD in Machine Learning from Stanford with 8 years of experience developing predictive models for financial institutions.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80"
    },
    {
      name: "David Okonkwo",
      role: "Head of Trading Research",
      bio: "Professional trader for 12 years specializing in cryptocurrency markets. Author of 'Algorithmic Trading in Emerging Markets'.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80"
    }
  ];

  const values = [
    {
      icon: LightbulbIcon,
      title: "Innovation",
      description: "We constantly push the boundaries of AI trading analysis to provide cutting-edge insights."
    },
    {
      icon: Users,
      title: "Trader Success",
      description: "Every feature we build focuses on directly improving our users' trading performance."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We hold ourselves to the highest standards in both our technology and customer service."
    },
    {
      icon: Rocket,
      title: "Continuous Growth",
      description: "We believe in constant improvement, both for our platform and for our traders."
    }
  ];

  const technologies = [
    {
      icon: Code,
      title: "Machine Learning Algorithms",
      description: "Our AI uses ensemble learning methods combining traditional ML with deep learning approaches to detect complex patterns in trading behavior."
    },
    {
      icon: Database,
      title: "Advanced Data Processing",
      description: "High-performance data pipeline that can process millions of trades efficiently while maintaining privacy and security."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-[#120c22]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-playfair">About ProfitPilot</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-montserrat">
            We're on a mission to transform trading education through AI-powered insights and personalized coaching.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20 bg-[#120c22]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-playfair">Our Story</h2>
              <div className="space-y-4 text-gray-300 font-montserrat">
                <p>
                  ProfitPilot was born from a simple observation: most traders learn through costly mistakes instead of structured education.
                </p>
                <p>
                  Founded in 2023 by Alexandra Reynolds and Marcus Chen, our platform combines decades of trading expertise with cutting-edge AI to provide what traders actually need – personalized insights based on their own trading data.
                </p>
                <p>
                  After experiencing the frustration of trial-and-error learning in their own trading careers, our founders set out to build the tool they wished they had – an AI coach that could analyze actual trades and provide specific, actionable feedback.
                </p>
                <p>
                  Today, ProfitPilot helps thousands of traders across 42 countries refine their strategies and improve their results through data-driven insights rather than generic advice.
                </p>
              </div>
            </div>
            <div className="perspective-container animate-on-scroll">
              <div className="glass-card rounded-2xl overflow-hidden perspective-image">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80" 
                  alt="ProfitPilot team" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 bg-gradient-to-b from-[#120c22] to-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-playfair">Our Values</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-montserrat">
              The principles that guide everything we do at ProfitPilot.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="glass-card h-full p-6 text-center">
                  <div className="bg-purple-900/50 text-purple-400 w-12 h-12 rounded-full flex items-center justify-center mb-5 mx-auto border border-purple-500/30">
                    <value.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-playfair">Meet Our Team</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-montserrat">
              The experts behind ProfitPilot's technology and vision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="glass-card h-full p-6 text-center">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-28 h-28 rounded-full object-cover border-2 border-purple-500/50 mx-auto mb-5"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-white">{member.name}</h3>
                  <p className="text-purple-400 mb-4 font-medium">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Technology */}
      <section className="py-20 bg-gradient-to-b from-background to-[#120c22]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 perspective-container animate-on-scroll">
              <div className="glass-card rounded-2xl overflow-hidden perspective-image">
                <img 
                  src="https://images.unsplash.com/photo-1581092160607-226cd9777d71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80" 
                  alt="ProfitPilot AI technology" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2 animate-on-scroll">
              <h2 className="text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-playfair">Our Technology</h2>
              
              <div className="space-y-8 text-gray-300">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex">
                    <div className="bg-purple-900/50 text-purple-400 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center mr-4 border border-purple-500/30 self-start mt-1">
                      <tech.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">{tech.title}</h3>
                      <p className="text-gray-300">{tech.description}</p>
                    </div>
                  </div>
                ))}
                
                <p className="pt-4">
                  Our proprietary AI integrates market data from multiple sources and analyzes it alongside individual trading patterns to provide contextually relevant insights that traditional analytics tools simply can't match.
                </p>
                
                <p>
                  Every recommendation is tailored to the trader's skill level, risk tolerance, and historical performance – creating a truly personalized coaching experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ContactSupport />
      <Footer />
    </div>
  );
};

export default About;
