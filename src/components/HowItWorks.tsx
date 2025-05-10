
import { Upload, ChartBar, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Trade History",
      description: "Import your trading data from CSV files or connect via API integrations with popular exchanges.",
      color: "bg-purple-500/20 text-purple-400"
    },
    {
      icon: ChartBar,
      title: "AI Reviews Your Performance",
      description: "Our AI analyzes your trades, identifies patterns, and provides a comprehensive strategy breakdown.",
      color: "bg-bluetint-500/20 text-bluetint-400"
    },
    {
      icon: Lightbulb,
      title: "Receive Customized Insights",
      description: "Get actionable recommendations to refine your trading style and improve your performance.",
      color: "bg-green-500/20 text-green-400"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-indigo-950/60 border-t border-purple-900/30">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">How ProfitPilot Works</h2>
          <p className="text-lg text-gray-300 font-inter font-light">
            Our AI-powered platform transforms your historical trading data into valuable insights 
            and actionable recommendations in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="animate-on-scroll">
              <div className="glass-card h-full flex flex-col items-center text-center p-8">
                <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-6", step.color)}>
                  <step.icon size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-300 font-inter font-light">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
