
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Disclaimer = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-[#120c22]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-playfair">
            Disclaimer
          </h1>
          
          <div className="prose prose-invert max-w-none font-montserrat text-gray-300 space-y-6">
            <p className="text-lg">Last Updated: May 9, 2025</p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">1. No Financial Advice</h2>
            <p>
              The information provided by ProfitPilot ("we," "us," or "our") on profitpilot.com and through our services (the "Service") is for general informational and educational purposes only. It is not intended to be and should not be construed as financial, investment, trading, or other types of advice or recommendations.
            </p>
            <p>
              Before making any financial decisions, including but not limited to trading or investment decisions, you should consult with a qualified professional advisor who can take into account your specific circumstances, objectives, and risk tolerance.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">2. Risk Warning</h2>
            <p>
              Trading and investing in financial markets involves substantial risk, including the possible loss of all invested capital. Past performance is not necessarily indicative of future results, and any performance examples or testimonials provided through our Service should not be viewed as a promise, guarantee, or projection of future performance.
            </p>
            <p>
              Leveraged trading in cryptocurrencies, foreign currency exchange, derivatives, or other financial products is a high-risk activity that can lead to major losses. You should never trade with money that you cannot afford to lose.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">3. No Guarantee of Accuracy</h2>
            <p>
              While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained in our Service for any purpose.
            </p>
            <p>
              Our AI-powered analysis and trading insights are based on algorithms and historical data, which have inherent limitations. Market conditions can change rapidly, and past patterns may not repeat in the future.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">4. Educational Purpose</h2>
            <p>
              ProfitPilot's primary purpose is to provide educational tools and analysis to help traders understand their past trading performance and identify potential areas for improvement. Our Service is not designed to provide real-time trading signals or to automate trading decisions.
            </p>
            <p>
              Any examples, strategies, or tutorials provided are for educational purposes only and should be carefully evaluated in light of your own circumstances before application.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">5. Third-Party Content</h2>
            <p>
              Our Service may contain references or links to third-party websites, resources, or content. These links are provided for your convenience only and do not signify our endorsement of such third parties or their content, products, or services.
            </p>
            <p>
              We have no control over the content of third-party websites or resources and accept no responsibility for them or for any loss or damage that may arise from your use of them.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">6. Jurisdictional Limitations</h2>
            <p>
              Our Service is not directed to individuals residing in jurisdictions where the provision of such content is prohibited or restricted. It is your responsibility to ensure that your access to and use of our Service complies with all applicable laws and regulations in your jurisdiction.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, in no event shall ProfitPilot, its affiliates, officers, directors, employees, agents, partners, or suppliers be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any trading or investment decisions made based on the content of the Service</li>
              <li>Any unauthorized access to or use of our secure servers and/or any personal or financial information stored therein</li>
              <li>Any errors, mistakes, inaccuracies, or omissions in our content</li>
              <li>Any interruption or cessation of transmission to or from our Service</li>
            </ul>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">8. Changes to this Disclaimer</h2>
            <p>
              We reserve the right to modify or replace this disclaimer at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p>
              By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">9. Contact Us</h2>
            <p>
              If you have any questions about this disclaimer, please contact us at legal@profitpilot.com.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Disclaimer;
