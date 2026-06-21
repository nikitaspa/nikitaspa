import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-[#131313] min-h-screen text-[#e5e2e1] flex flex-col items-center pt-20 px-6">
      <Helmet>
        <title>About Us | Premium Spa in Viman Nagar Pune</title>
        <meta name="description" content="Learn about Nikita Spa, the premier wellness sanctuary in Viman Nagar, Pune. We provide certified therapists, sterile environments, and pure organic treatments." />
        <meta name="keywords" content="About Nikita Spa, Spa in Viman Nagar, Wellness Sanctuary Pune" />
      </Helmet>
      
      <div className="w-full max-w-4xl">
        <Link to="/" className="inline-flex items-center text-[#f2ca50] hover:text-white mb-8 transition-colors">
          <ChevronLeft size={20} className="mr-1" /> Back to Home
        </Link>
        
        <h1 className="font-serif text-3xl md:text-5xl text-white font-bold mb-6">About Us</h1>
        
        <div className="glass-card p-8 rounded-lg border border-white/10 mt-8">
          <p className="text-[#d0c5af] leading-relaxed mb-6">
            Learn about Nikita Spa, the premier wellness sanctuary in Viman Nagar, Pune. We provide certified therapists, sterile environments, and pure organic treatments.
          </p>
          <p className="text-[#d0c5af] leading-relaxed">
            Please visit our <Link to="/" className="text-[#f2ca50] hover:underline">Home page</Link> to view our full menu, gallery, and to book an appointment online.
          </p>
        </div>
      </div>
    </div>
  );
}
