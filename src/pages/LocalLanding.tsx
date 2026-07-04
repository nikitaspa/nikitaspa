import { Helmet } from 'react-helmet-async';
import { SERVICES } from '../data';
import { MapPin, Phone, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LocalLanding() {
  return (
    <div className="min-h-screen bg-[#131313] pt-24 pb-16">
      <Helmet>
        <title>Spa in Viman Nagar, Pune | Nikita Spa</title>
        <meta name="description" content="Looking for a spa in Viman Nagar, Pune? Explore Nikita Spa's wellness services, relaxing environment, location details and easy appointment options." />
        <link rel="canonical" href="https://nikitaspa.shop/spa-in-viman-nagar-pune" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 max-w-[1240px] mx-auto mb-16 pt-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-[#f2ca50] text-sm font-semibold tracking-wider font-sans uppercase">Welcome to Nikita Spa in Viman Nagar</span>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight">
            Spa in Viman Nagar, Pune
          </h1>
          <p className="font-sans text-[#d0c5af] text-lg leading-relaxed">
            Looking for a spa in Viman Nagar, Pune? Nikita Spa offers a comfortable wellness environment designed for relaxation and rejuvenation. Conveniently located in Viman Nagar, we provide a selection of spa and wellness services tailored to different relaxation preferences.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/contact" className="px-8 py-3 bg-[#f2ca50] text-black font-semibold rounded hover:bg-[#d4af37] transition-colors">
              Book Your Spa Appointment
            </Link>
            <Link to="/services" className="px-8 py-3 border border-[#f2ca50]/50 text-[#f2ca50] font-semibold rounded hover:bg-[#f2ca50]/10 transition-colors">
              Explore our wellness services
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-12 max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          <div className="space-y-4 text-[#d0c5af] font-sans leading-relaxed">
            <h2 className="font-serif text-3xl text-white font-bold mb-6">A Relaxing Spa Experience in Pune</h2>
            <p>
              Our focus is on a clean environment, comfortable treatment spaces, professional service and a smooth appointment experience. Whether you live in Viman Nagar or are visiting nearby areas of Pune, you can contact our team to learn about available services and appointment timings.
            </p>
            <p>
              We understand that true relaxation comes from an environment where you can completely let go of daily stress. Our therapy rooms are designed with low-frequency ambient lighting, temperature control, and calming aromatherapy to ensure your mind unwinds as deeply as your body.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-white font-bold mb-6">Our Spa & Wellness Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.slice(0, 4).map(service => (
                <Link to={`/services/${service.id}`} key={service.id} className="bg-[#1c1b1b] p-6 rounded border border-white/5 hover:border-[#f2ca50]/30 transition-all group">
                  <h3 className="font-serif text-xl text-white font-semibold mb-2 group-hover:text-[#f2ca50] transition-colors">{service.name}</h3>
                  <p className="text-[#d0c5af] text-sm line-clamp-2">{service.description}</p>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/services" className="text-[#f2ca50] inline-flex items-center hover:underline">
                View all spa services <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-white font-bold mb-6">Why Guests Choose Nikita Spa</h2>
            <ul className="space-y-4">
              {[
                "Certified and professionally trained therapists",
                "Strict hygiene protocols and sterile environments",
                "Premium cold-pressed organic oils",
                "Open 24 hours a day to fit any schedule",
                "Private couple suites available"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#d0c5af]">
                  <CheckCircle2 className="text-[#f2ca50] shrink-0 mt-0.5" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-white font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-2">Do I need to book an appointment in advance?</h3>
                <p className="text-[#d0c5af] text-sm">While walk-ins are welcome, we strongly recommend booking in advance, especially for weekend sessions, to ensure your preferred time slot and therapist are available.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Where are you located in Viman Nagar?</h3>
                <p className="text-[#d0c5af] text-sm">We are conveniently located at Plot No 121 B, behind Roshma Riviera, Konark Nagar, Clover Park in Viman Nagar, Pune. It is very close to Phoenix Marketcity Mall.</p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-[#1c1b1b] p-8 rounded border border-[#f2ca50]/20 sticky top-24">
            <h2 className="font-serif text-2xl text-white font-bold mb-6">Conveniently Located in Viman Nagar</h2>
            
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="text-[#f2ca50] shrink-0" />
                <div>
                  <h4 className="text-white font-semibold text-sm">Address</h4>
                  <p className="text-[#d0c5af] text-sm mt-1">Plot No 121 B, behind Roshma Riviera, Konark Nagar, Clover Park, Viman Nagar, Pune, Maharashtra 411014</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="text-[#f2ca50] shrink-0" />
                <div>
                  <h4 className="text-white font-semibold text-sm">Phone</h4>
                  <p className="text-[#d0c5af] text-sm mt-1">+91 8271712580</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock className="text-[#f2ca50] shrink-0" />
                <div>
                  <h4 className="text-white font-semibold text-sm">Hours</h4>
                  <p className="text-[#d0c5af] text-sm mt-1">Open 24 Hours</p>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-white font-semibold mb-4 text-sm">How to Reach Nikita Spa</h3>
              <p className="text-[#d0c5af] text-sm mb-4">If you are coming from Phoenix Marketcity, head towards Konark Nagar. We are located right behind Roshma Riviera with ample parking space available.</p>
              <div className="w-full h-48 rounded overflow-hidden border border-white/10">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d64986827.9704887!2d-51.79494468488215!3d6.200070455937197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1eca9074b7b%3A0x722b62a114f9062!2sNikita%20Spa!5e0!3m2!1sen!2sin!4v1782062910033!5m2!1sen!2sin" 
                  className="w-full h-full" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
