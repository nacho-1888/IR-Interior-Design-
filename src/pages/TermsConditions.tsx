import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MoveLeft } from "lucide-react";

export default function TermsConditions() {
  return (
    <main className="bg-luxury-paper text-luxury-black min-h-screen font-sans font-medium">
      {/* Top Navigation */}
      <div className="pt-24 px-8 lg:px-20 mb-16">
        <Link to="/" className="flex items-center space-x-4 text-luxury-black uppercase text-[10px] tracking-[0.4em] font-black hover:opacity-50 transition-all">
          <MoveLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <section className="max-w-4xl mx-auto px-8 pb-32">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl lg:text-7xl branding-font uppercase tracking-tight mb-16"
        >
          Terms and Conditions
        </motion.h1>

        <div className="prose prose-neutral max-w-none space-y-12 text-sm md:text-base leading-relaxed opacity-80">
          <div>
            <h2 className="text-xl font-black uppercase tracking-widest mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using the Isabel Romer website (the "Service"), you agree to be bound by these terms and conditions. If you do not agree to all of these terms, please do not use the Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-widest mb-4">Intellectual Property</h2>
            <p>
              All content provided on the Service, including but not limited to text, graphics, logos, images, and photographic works, is the property of Isabel Romer Studio and is protected by copyright and other intellectual property laws. Users may not reproduce, modify, or distribute any content without our express written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-widest mb-4">Studio Enquiries</h2>
            <p>
              While we welcome enquiries through our contact forms, please note that the transmission of information through this website does not constitute an agreement for interior design services. A formal contract signed by both parties is required to establish a client-designer relationship.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-widest mb-4">External Links</h2>
            <p>
              Our Service may contain links to third-party websites or services that are not owned or controlled by Isabel Romer Studio. We have no control over and assume no responsibility for the content or privacy policies of any third-party websites.
            </p>
          </div>
          
          <div className="pt-8 border-t border-black/10 text-[10px] uppercase tracking-widest opacity-50">
            Last Updated: March 2026
          </div>
        </div>
      </section>
    </main>
  );
}
