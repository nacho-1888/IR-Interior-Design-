import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MoveLeft } from "lucide-react";

export default function PrivacyPolicy() {
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
          Privacy Policy
        </motion.h1>

        <div className="prose prose-neutral max-w-none space-y-12 text-sm md:text-base leading-relaxed opacity-80">
          <div>
            <h2 className="text-xl font-black uppercase tracking-widest mb-4">Introduction</h2>
            <p>
              At Isabel Romer Studio, we respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-widest mb-4">Information We Collect</h2>
            <p>
              We collect information that you provide directly to us through our contact forms or newsletter sign-ups. This may include your name, email address, and any project details you choose to share. We also collect basic analytical data through browser cookies to understand how our visitors interact with our architectural portfolio.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-widest mb-4">How We Use Your Information</h2>
            <p>
              We use your information exclusively to provide the services you request, such as responding to project enquiries or sending studio updates. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase tracking-widest mb-4">Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
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
