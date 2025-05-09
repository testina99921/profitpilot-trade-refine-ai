
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-[#120c22]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent font-playfair">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert max-w-none font-montserrat text-gray-300 space-y-6">
            <p className="text-lg">Last Updated: May 9, 2025</p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">1. Introduction</h2>
            <p>
              ProfitPilot ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by ProfitPilot when you use our website and services (collectively, the "Service").
            </p>
            <p>
              By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Register for an account</li>
              <li>Upload trading data or use our analysis tools</li>
              <li>Fill out a form or survey</li>
              <li>Communicate with us via email, phone, or other channels</li>
              <li>Subscribe to our newsletter or marketing communications</li>
              <li>Participate in our community forums or events</li>
            </ul>
            
            <p>
              The types of information we may collect include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact information (name, email address, mailing address, phone number)</li>
              <li>Account information (username, password, preferences)</li>
              <li>Payment information (credit card details, billing address)</li>
              <li>Trading data and history that you upload</li>
              <li>Usage details (IP address, browser type, device information, pages visited)</li>
              <li>Communication preferences and marketing choices</li>
            </ul>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide, maintain, and improve our Service</li>
              <li>Process and analyze your trading data</li>
              <li>Generate personalized trading insights and recommendations</li>
              <li>Process your payments and manage your subscription</li>
              <li>Communicate with you about our Service, including updates and new features</li>
              <li>Send you marketing communications (if you've opted in)</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Monitor and analyze usage and trends to improve our Service</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Comply with our legal obligations</li>
            </ul>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">4. How We Share Your Information</h2>
            <p>
              We may share your personal information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who perform services on our behalf</li>
              <li>Partners with whom we offer co-branded services or joint marketing activities</li>
              <li>Third parties as required by law or to protect our rights</li>
              <li>In connection with a merger, sale, or acquisition of all or a portion of our business</li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">5. Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us at privacy@profitpilot.com.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">8. Cookie Policy</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">9. Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
            </p>
            
            <h2 className="text-2xl font-playfair font-semibold text-white">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@profitpilot.com.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Privacy;
