import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { GALLERY_IMAGES } from '../data';

export default function Gallery() {
  return (
    <div className="bg-[#131313] min-h-screen text-[#e5e2e1] flex flex-col items-center pt-20 px-6">
      <Helmet>
        <title>Spa Gallery | Luxury Spa Ambience in Pune</title>
        <meta name="description" content="Take a virtual tour of Nikita Spa. View our serene private suites, couple rooms, and luxurious wellness amenities in Viman Nagar." />
        <meta name="keywords" content="Spa photos Pune, Couple spa suite Pune, Nikita spa gallery" />
      </Helmet>
      
      <div className="w-full max-w-[1240px] pb-24">
        <Link to="/" className="inline-flex items-center text-[#f2ca50] hover:text-white mb-8 transition-colors">
          <ChevronLeft size={20} className="mr-1" /> Back to Home
        </Link>
        
        <h1 className="font-serif text-3xl md:text-5xl text-white font-bold mb-6">Spa Gallery</h1>
        <p className="text-[#d0c5af] leading-relaxed mb-8">
          Take a virtual tour of Nikita Spa. View our serene private suites, couple rooms, and luxurious wellness amenities in Viman Nagar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img) => (
            <div key={img.url} className="relative group overflow-hidden rounded-lg border border-white/10 aspect-[4/3] bg-[#1a1a1a]">
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-left transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <span className="font-sans text-[10px] text-[#f2ca50] tracking-widest font-semibold uppercase block mb-1">
                  Nikita Ambience
                </span>
                <h4 className="font-serif text-lg text-white font-medium group-hover:text-[#f2ca50] transition-colors">
                  {img.title}
                </h4>
                <p className="font-sans text-[11px] text-[#d0c5af]/85 mt-1 line-clamp-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
