
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ = () => {
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

  return (
    <section id="faq" className="py-24 bg-[#12091e]">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-300 font-roboto font-light">
            Find answers to common questions about ProfitPilot and how it can help improve your trading results.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-purple-900/30">
                <AccordionTrigger className="py-4 text-lg font-medium text-white hover:text-purple-400 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-4 font-roboto font-light">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
