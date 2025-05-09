
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Cookies = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-[#120c22]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-playfair">
            Cookie Policy
          </h1>
          
          <div className="prose prose-invert max-w-none font-montserrat text-gray-300 space-y-6">
            <p className="text-lg">Last Updated: May 9, 2025</p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">1. What Are Cookies</h2>
            <p>
              Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third party to recognize you and make your next visit easier and the Service more useful to you.
            </p>
            <p>
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">2. How ProfitPilot Uses Cookies</h2>
            <p>
              When you use and access our Service, we may place a number of cookie files in your web browser. We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To enable certain functions of the Service</li>
              <li>To provide analytics and understand how you use our Service</li>
              <li>To store your preferences</li>
              <li>To enable advertisements delivery, including behavioral advertising</li>
              <li>To authenticate users and prevent fraudulent use of user accounts</li>
            </ul>
            <p>
              We use both session and persistent cookies on the Service and we use different types of cookies to run the Service:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Essential cookies.</strong> We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</li>
              <li><strong>Functionality cookies.</strong> We use functionality cookies to remember information that changes the way the Service behaves or looks, such as a user's language preference or a user's region.</li>
              <li><strong>Analytics cookies.</strong> We use analytics cookies to track information about how the Service is used so that we can make improvements and report on our performance.</li>
              <li><strong>Advertising cookies.</strong> We may use advertising cookies to collect information about your visit to our Service, the content you viewed, the links you followed and information about your browser, device, and your IP address.</li>
            </ul>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">3. Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third parties' cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on. These third parties may include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Analytics providers (such as Google Analytics)</li>
              <li>Advertising networks</li>
              <li>Social media networks</li>
              <li>Video hosting platforms</li>
              <li>Customer support services</li>
            </ul>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">4. What Are Your Choices Regarding Cookies</h2>
            <p>
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
            </p>
            <p>
              Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
            </p>
            <p>
              You can learn more about cookies and the following third-party websites:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>AllAboutCookies: <a href="http://www.allaboutcookies.org/" className="text-purple-400 hover:text-purple-300">http://www.allaboutcookies.org/</a></li>
              <li>Network Advertising Initiative: <a href="http://www.networkadvertising.org/" className="text-purple-400 hover:text-purple-300">http://www.networkadvertising.org/</a></li>
            </ul>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">5. Cookie Preferences</h2>
            <p>
              You can manage your cookie preferences by adjusting the settings on your browser, or by using our cookie consent manager when you first visit our Service. Most browsers allow you to refuse to accept cookies and to delete cookies. The methods for doing so vary from browser to browser, and from version to version.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">6. Changes to This Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last Updated" date at the top.
            </p>
            <p>
              You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are effective when they are posted on this page.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">7. Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at privacy@profitpilot.com.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Cookies;
