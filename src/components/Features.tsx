
import { ChartLine, ChartCandlestick, Bell, Database, BadgePercent, BadgeDollarSign } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: ChartLine,
      title: "Trade Performance Breakdown",
      description: "AI identifies successful vs failed trades and detects entry timing mistakes and emotional trading patterns."
    },
    {
      icon: ChartCandlestick,
      title: "Trading Style Recognition",
      description: "Our AI detects whether you're FOMO trading, scalping, swing trading, trend-following, or day trading."
    },
    {
      icon: BadgePercent,
      title: "Risk Exposure Mapping",
      description: "Get insights on your risky trade patterns and portfolio weaknesses with adjustment recommendations."
    },
    {
      icon: Database,
      title: "Historical Market Matching",
      description: "Compare your trading decisions to bull/bear cycles to refine market timing and strategy."
    },
    {
      icon: Bell,
      title: "Custom Mistake Alerts",
      description: "Receive notifications when you repeat common mistakes with personalized improvement suggestions."
    },
    {
      icon: BadgeDollarSign,
      title: "Alternative Trade Simulations",
      description: "See what could have happened with adjusted strategies through AI-powered trade simulations."
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            AI-Powered Analysis Features
          </h2>
          <p className="text-lg text-charcoal-600">
            ProfitPilot leverages advanced machine learning to transform your trading data into 
            actionable insights that help you improve your strategy and results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="glass-card h-full p-6">
                <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-5">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-charcoal-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
