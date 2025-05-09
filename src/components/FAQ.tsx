
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "How does ProfitPilot analyze my trade data?",
      answer: "ProfitPilot uses advanced machine learning algorithms to analyze patterns in your trading history. Our AI identifies successful and unsuccessful trades, recognizes emotional trading behaviors, detects risk patterns, and compares your trades against market cycles to provide personalized insights and recommendations."
    },
    {
      question: "Is my trading data secure?",
      answer: "Absolutely. Security is our top priority. All data is encrypted both in transit and at rest using industry-standard encryption protocols. We never share your trading data with third parties, and you can delete your data at any time. Our systems comply with financial data security best practices."
    },
    {
      question: "Which exchanges and data formats are supported?",
      answer: "ProfitPilot supports CSV uploads from all major cryptocurrency exchanges. We also offer direct API integrations with Binance, Coinbase Pro, Kraken, FTX, and Kucoin. We're constantly adding support for more exchanges and platforms based on user requests."
    },
    {
      question: "How accurate are the AI recommendations?",
      answer: "Our AI models are trained on millions of trades and market data points, achieving over 85% accuracy in identifying trading patterns and opportunities for improvement. However, all recommendations should be considered as educational tools rather than financial advice. The more trading data you provide, the more accurate and personalized your insights will be."
    },
    {
      question: "Can I try ProfitPilot before subscribing?",
      answer: "Yes! Our free plan allows you to analyze up to 5 trades per month with basic performance feedback. This gives you a chance to experience the platform before upgrading to a paid plan. We also offer a 7-day risk-free trial on all paid plans."
    },
    {
      question: "Does ProfitPilot work for stock trading as well as crypto?",
      answer: "Currently, ProfitPilot specializes in cryptocurrency trading analysis. Support for stock, forex, and options trading is on our roadmap and will be available in upcoming releases. Sign up for our newsletter to be notified when these features launch."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-charcoal-600">
            Find answers to common questions about ProfitPilot and how it can help improve your trading results.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="animate-on-scroll mb-4">
              <button
                className={cn(
                  "w-full text-left glass-card p-6 transition-all duration-300",
                  openIndex === index ? "bg-white/90" : ""
                )}
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <span className="text-xl ml-4 transform transition-transform duration-300">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="mt-4 text-charcoal-600 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
