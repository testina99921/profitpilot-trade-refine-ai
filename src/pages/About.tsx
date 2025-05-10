
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSupport from '@/components/ContactSupport';
import { Code, Database, LightbulbIcon, Users, Award, Rocket } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: LightbulbIcon,
      title: "Innovation",
      description: "We constantly push the boundaries of AI trading analysis to provide cutting-edge insights that transform how traders view their performance."
    },
    {
      icon: Users,
      title: "Trader Success",
      description: "Every feature we build focuses on directly improving our users' trading performance and long-term profitability."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We hold ourselves to the highest standards in both our technology and customer service, ensuring a premium experience."
    },
    {
      icon: Rocket,
      title: "Continuous Growth",
      description: "We believe in constant improvement, both for our platform and for our traders, with regular updates based on user feedback."
    }
  ];

  const technologies = [
    {
      icon: Code,
      title: "Machine Learning Algorithms",
      description: "Our AI uses ensemble learning methods combining traditional ML with deep learning approaches to detect complex patterns in trading behavior and provide personalized insights that traditional analytics simply can't match."
    },
    {
      icon: Database,
      title: "Advanced Data Processing",
      description: "High-performance data pipeline that can process millions of trades efficiently while maintaining privacy and security. Our system analyzes over 40 performance metrics to give you the most comprehensive view of your trading."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-[#120c22]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-roboto">About ProfitPilot</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-roboto font-light">
            We're on a mission to transform trading education through AI-powered insights and personalized coaching.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20 bg-[#120c22]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-roboto">Our Story</h2>
              <div className="space-y-4 text-gray-300 font-roboto font-light">
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
                <p>
                  What sets us apart is our commitment to personalization. Unlike other trading platforms that offer one-size-fits-all advice, our AI engine adapts to your unique trading style, risk tolerance, and goals to provide truly customized guidance.
                </p>
                <p>
                  Our vision is to democratize access to professional-grade trading analysis and coaching, empowering traders at all levels to achieve consistent profitability through data-driven decisions.
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
            <h2 className="text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-roboto">Our Values</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto font-roboto font-light">
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
                  <h3 className="text-xl font-semibold mb-3 text-white font-roboto">{value.title}</h3>
                  <p className="text-gray-300 font-roboto font-light">{value.description}</p>
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
              <h2 className="text-3xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-roboto">Our Technology</h2>
              
              <div className="space-y-8 text-gray-300">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex">
                    <div className="bg-purple-900/50 text-purple-400 w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center mr-4 border border-purple-500/30 self-start mt-1">
                      <tech.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white font-roboto">{tech.title}</h3>
                      <p className="text-gray-300 font-roboto font-light">{tech.description}</p>
                    </div>
                  </div>
                ))}
                
                <p className="pt-4 font-roboto font-light">
                  Our proprietary AI integrates market data from multiple sources and analyzes it alongside individual trading patterns to provide contextually relevant insights that traditional analytics tools simply can't match.
                </p>
                
                <p className="font-roboto font-light">
                  Every recommendation is tailored to the trader's skill level, risk tolerance, and historical performance – creating a truly personalized coaching experience backed by sophisticated machine learning models trained on millions of real trading decisions.
                </p>
                
                <p className="font-roboto font-light">
                  We continuously refine our algorithms through feedback loops, ensuring that our analysis becomes more accurate and valuable with each trade you make. This creates a virtuous cycle where both you and our platform get smarter together.
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
