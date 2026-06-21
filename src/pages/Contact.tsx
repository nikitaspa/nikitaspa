import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, ExternalLink, ChevronLeft } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import { STATIC_MAP_IMAGE } from '../data';
import { Booking } from '../types';

export default function Contact() {
  const handleBookingSuccess = (newBooking: Booking) => {
    // Optionally handle success behavior here if needed
  };

  return (
    <div className="bg-[#131313] min-h-screen text-[#e5e2e1] flex flex-col items-center pt-10 px-6">
      <Helmet>
        <title>Contact Us & Book | Nikita Spa Viman Nagar Pune</title>
        <meta name="description" content="Get in touch with Nikita Spa in Viman Nagar, Pune. Schedule an appointment or request a callback. Call us at +91 8271712580." />
        <meta name="keywords" content="Contact Nikita Spa, Book Spa Appointment Pune, Spa location Viman Nagar, Massage Booking Pune" />
      </Helmet>
      
      <div className="w-full max-w-[1240px]">
        <Link to="/" className="inline-flex items-center text-[#f2ca50] hover:text-white mb-8 transition-colors">
          <ChevronLeft size={20} className="mr-1" /> Back to Home
        </Link>
        
        {/* Contact info, Map and Callback Request Form */}
        <section className="bg-[#0e0e0e] px-8 py-16 border border-[#f2ca50]/10 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact metadata */}
            <div className="space-y-8 text-left">
              <div className="space-y-3">
                <span className="font-sans text-[11px] text-[#f2ca50] font-semibold tracking-[0.25em] uppercase block">PREMIUM LOCATION</span>
                <h1 className="font-serif text-3xl md:text-4xl text-white font-bold">Begin Your Wellness Journey</h1>
                <p className="font-sans text-xs md:text-sm text-[#d0c5af]">
                  Schedule your physical treatments or coordinate arrival guides with our support desk.
                </p>
                <div className="h-0.5 w-16 bg-[#f2ca50] opacity-60" />
              </div>

              {/* Contact specifics details */}
              <div className="space-y-6">

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/20 flex items-center justify-center text-[#f2ca50] shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h2 className="font-sans text-sm font-semibold text-white">Spa Location Address</h2>
                    <p className="font-sans text-xs md:text-sm text-[#d0c5af]/85 mt-1 leading-relaxed">
                      Nikita Spa, Viman Nagar, Opposite Phoenix Marketcity Mall,<br />
                      Pune, Maharashtra 411014, India.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/20 flex items-center justify-center text-[#f2ca50] shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h2 className="font-sans text-sm font-semibold text-white">Call Reception</h2>
                    <p className="font-sans text-xs md:text-sm text-[#d0c5af]/85 mt-1">
                      +91 8271712580
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h2 className="font-sans text-sm font-semibold text-white">Instant WhatsApp booking</h2>
                    <p className="font-sans text-xs md:text-sm text-[#d0c5af]/85 mt-1">
                      <a 
                        href="https://wa.me/918271712580" 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[#f2ca50] hover:underline hover:text-white"
                      >
                        Message on WhatsApp (+91 8271712580)
                      </a>
                    </p>
                  </div>
                </div>

              </div>

              {/* Gray map image layout holding static data */}
              <div className="relative rounded overflow-hidden mt-8 max-w-md border border-white/10 group filter grayscale hover:grayscale-0 transition-all duration-500 shadow-xl h-52">
                <img 
                  className="w-full h-full object-cover" 
                  alt="Spa layout vicinity Map" 
                  src={STATIC_MAP_IMAGE} 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-[#131414]/90 p-2 border border-[#f2ca50]/20 rounded text-[11px] text-[#f2ca50] font-sans flex items-center gap-1 hover:brightness-125"
                  >
                    <ExternalLink size={12} /> Open in Navigation Maps
                  </a>
                </div>
              </div>

            </div>

            {/* Inline dynamic check call forms */}
            <div className="bg-[#1c1b1b] border border-white/[0.05] p-6 md:p-10 rounded shadow-2xl relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#f2ca50]/[0.02] rounded-full blur-xl pointer-events-none" />
              <div className="space-y-4 text-left mb-6">
                <span className="text-[#f2ca50] text-xs font-semibold tracking-wider font-sans uppercase">CALLBACK RESERVATION</span>
                <h2 className="font-serif text-2xl text-white font-bold text-left">Request Instant Session Confirmation</h2>
                <p className="text-xs text-[#d0c5af]">Fill your contact details. Our managers will ring you up within 10 minutes from post.</p>
              </div>

              {/* Render dynamic Form */}
              <BookingForm 
                onBookingSuccess={handleBookingSuccess}
                initialServiceId="" 
              />
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
