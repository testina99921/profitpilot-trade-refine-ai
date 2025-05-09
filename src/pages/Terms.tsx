
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-[#120c22]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-playfair">
            Terms of Service
          </h1>
          
          <div className="prose prose-invert max-w-none font-montserrat text-gray-300 space-y-6">
            <p className="text-lg">Last Updated: May 9, 2025</p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">1. Introduction</h2>
            <p>
              Welcome to ProfitPilot ("Company", "we", "our", "us"). These Terms of Service ("Terms", "Terms of Service") govern your use of our website located at profitpilot.com and our mobile application ProfitPilot (together or individually "Service") operated by ProfitPilot.
            </p>
            <p>
              Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages. Please read it here: profitpilot.com/privacy.
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">2. Financial Disclaimer</h2>
            <p>
              The information provided by ProfitPilot is for educational and informational purposes only. It should not be considered financial advice. ProfitPilot is not a registered investment, legal, or tax advisor or a broker/dealer. All trading and investment decisions are the responsibility of the individual.
            </p>
            <p>
              Past performance is not indicative of future results. Trading financial instruments involves significant risk of loss. ProfitPilot cannot and does not guarantee any specific outcomes from using our Service.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">3. Communications</h2>
            <p>
              By using our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">4. Subscriptions</h2>
            <p>
              Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis (such as daily, weekly, monthly or annually), depending on the type of subscription plan you select when purchasing the subscription.
            </p>
            <p>
              At the end of each period, your subscription will automatically renew under the exact same conditions unless you cancel it or ProfitPilot cancels it.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">5. Free Trial</h2>
            <p>
              ProfitPilot may, at its sole discretion, offer a Subscription with a free trial for a limited period of time. You may be required to enter your billing information in order to sign up for the free trial.
            </p>
            <p>
              If you do enter your billing information when signing up for a free trial, you will not be charged by ProfitPilot until the free trial has expired. On the last day of the free trial period, unless you cancelled your subscription, you will be automatically charged the applicable subscription fee for the type of subscription you have selected.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">6. User Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
            </p>
            <p>
              When you post Content on or through our Service, you represent and warrant that: (i) the Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">7. Accounts</h2>
            <p>
              When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">8. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of ProfitPilot and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ProfitPilot.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">9. Limitation Of Liability</h2>
            <p>
              In no event shall ProfitPilot, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">10. Changes To Service</h2>
            <p>
              We reserve the right to withdraw or amend our Service, and any service or material we provide via the Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Service is unavailable at any time or for any period.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@profitpilot.com.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Terms;
