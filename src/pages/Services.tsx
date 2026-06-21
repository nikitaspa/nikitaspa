import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Waves, Activity, Leaf, Heart, Sparkles, Droplet } from 'lucide-react';
import { SERVICES } from '../data';
import { useAppContext } from '../context/AppContext';

export default function Services() {
  const { id } = useParams();
  const { triggerInstantBooking } = useAppContext();
  
  // Format id (e.g. "swedish-massage" -> "Swedish Massage")
  const serviceName = id ? id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Our Signature Services';
  const pageTitle = id ? `${serviceName} | Best Massage Center Pune` : 'Our Signature Services | Best Massage Center Pune';
  
  const getServiceCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves': return <Waves size={24} className="text-[#f2ca50]" />;
      case 'Activity': return <Activity size={24} className="text-[#f2ca50]" />;
      case 'Leaf': return <Leaf size={24} className="text-[#f2ca50]" />;
      case 'Heart': return <Heart size={24} className="text-[#f2ca50]" />;
      case 'Sparkles': return <Sparkles size={24} className="text-[#f2ca50]" />;
      case 'Droplet': return <Droplet size={24} className="text-[#f2ca50]" />;
      default: return <Sparkles size={24} className="text-[#f2ca50]" />;
    }
  };

  const displayedServices = id 
    ? SERVICES.filter(s => s.id === id || s.name.toLowerCase().includes(serviceName.toLowerCase()))
    : SERVICES;

  return (
    <div className="bg-[#131313] min-h-screen text-[#e5e2e1] flex flex-col items-center pt-20 px-6">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Explore our ${serviceName} and other signature wellness therapies at Nikita Spa in Viman Nagar, Pune.`} />
        <meta name="keywords" content={`${serviceName} Pune, Swedish Massage Pune, Deep Tissue Massage Pune, Couple Spa Pune`} />
      </Helmet>
      
      <div className="w-full max-w-[1240px] pb-24">
        <Link to="/" className="inline-flex items-center text-[#f2ca50] hover:text-white mb-8 transition-colors">
          <ChevronLeft size={20} className="mr-1" /> Back to Home
        </Link>
        
        <h1 className="font-serif text-3xl md:text-5xl text-white font-bold mb-6">{serviceName}</h1>
        
        <div className="glass-card p-8 rounded-lg border border-white/10 mt-8 mb-16">
          <p className="text-[#d0c5af] leading-relaxed mb-6">
            Experience the finest {serviceName.toLowerCase()} at Nikita Spa, the premier wellness sanctuary in Viman Nagar, Pune. Our certified therapists provide tailored treatments designed to relax, refresh, and rejuvenate.
          </p>
          <p className="text-[#d0c5af] leading-relaxed">
            Please browse our specialized treatments below or <button onClick={() => triggerInstantBooking('')} className="text-[#f2ca50] hover:underline cursor-pointer">book an appointment online.</button>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {(displayedServices.length > 0 ? displayedServices : SERVICES).map((serv) => {
            const categoryIcon = getServiceCategoryIcon(serv.iconName || '');
            return (
              <div
                key={serv.id}
                className="group bg-[#1c1b1b] rounded-xl border border-white/[0.05] p-8 hover:border-[#f2ca50]/20 transition-colors shadow-lg flex flex-col justify-between h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#f2ca50]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-tr-xl" />

                <div className="space-y-5 text-left relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[10px] text-[#f2ca50] tracking-widest font-semibold uppercase block bg-[#f2ca50]/10 px-2 py-1 rounded">
                      {serv.category}
                    </span>
                    <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f2ca50] group-hover:bg-[#f2ca50]/15 group-hover:border-[#f2ca50]/30 transition-colors">
                      {categoryIcon}
                    </div>
                  </div>

                  <h4 className="font-serif text-xl text-white font-bold transition-colors group-hover:text-[#f2ca50]">
                    {serv.name}
                  </h4>

                  <p className="font-sans text-xs md:text-sm text-[#d0c5af] leading-relaxed">
                    {serv.description}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-[#4d4635]/25 flex items-center justify-between relative z-10">
                  <div className="text-left font-sans">
                    <span className="text-[10px] block text-[#d0c5af]/60 tracking-wider uppercase">Active duration</span>
                    <span className="text-[#f2ca50] text-xs font-semibold tracking-wider font-mono">
                      {serv.duration} MINS • ₹{serv.price}
                    </span>
                  </div>

                  <button
                    onClick={() => triggerInstantBooking(serv.id)}
                    className="bg-transparent text-white border border-[#f2ca50]/50 hover:bg-[#f2ca50] hover:text-[#3c2f00] px-4 py-2 rounded text-xs font-semibold tracking-wider font-sans transition-all cursor-pointer"
                  >
                    SELECT &amp; BOOK
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
