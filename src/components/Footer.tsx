import { BookOpen, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const scrollToElement = (id: string) => {
    if (isHome) {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <footer className="w-full pt-20 pb-28 bg-[#111] border-t border-white/[0.05]">
      <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        {/* Brand Col */}
        <div className="space-y-4">
          <h4 className="font-serif text-2xl text-[#f2ca50] tracking-widest font-bold uppercase">NIKITA SPA</h4>
          <p className="font-sans text-xs md:text-sm text-[#d0c5af]/80 leading-relaxed">
            The definitive luxury wellness retreat in Viman Nagar, Pune. Experience premium relaxation tailored with certified therapists and customized candle treatments.
          </p>
        </div>

        {/* Links Col */}
        <div>
          <h5 className="font-sans text-xs font-bold text-white tracking-[0.2em] mb-6 uppercase">QUICK DIRECTORY</h5>
          <ul className="space-y-3 text-xs text-[#d0c5af] font-sans">
            <li>
              <button onClick={() => scrollToElement('services')} className="hover:text-[#f2ca50] transition-colors uppercase cursor-pointer">
                Signature Treatments
              </button>
            </li>
            <li>
              <button onClick={() => scrollToElement('pricing')} className="hover:text-[#f2ca50] transition-colors uppercase cursor-pointer">
                Curated Wellness Bundles
              </button>
            </li>
            <li>
              <button onClick={() => scrollToElement('faq')} className="hover:text-[#f2ca50] transition-colors uppercase cursor-pointer">
                Safety FAQ Accordions
              </button>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#f2ca50] transition-colors uppercase block">
                Reception Contact Desk
              </Link>
            </li>
          </ul>
        </div>

        {/* Timing Col */}
        <div>
          <h5 className="font-sans text-xs font-bold text-white tracking-[0.2em] mb-6 uppercase">OPENING CALENDAR</h5>
          <p className="font-sans text-xs md:text-sm text-[#d0c5af]/80 leading-relaxed">
            MONDAY TO SUNDAY<br />
            <span className="text-[#f2ca50] font-semibold font-mono">10:00 AM - 09:00 PM</span><br />
            Open on public holidays. Secure lockers and aromatic showers available.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#f2ca50] border border-white/5 hover:bg-[#f2ca50]/15" aria-label="Social Link">
              <BookOpen size={16} />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#f2ca50] border border-white/5 hover:bg-[#f2ca50]/15" aria-label="Social Link">
              <Sparkles size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 mt-16 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between text-[11px] text-[#d0c5af]/40 tracking-wider font-sans">
        <span>© 2026 NIKITA SPA VIMAN NAGAR, PUNE. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-6 mt-4 sm:mt-0 font-sans">
          <a href="#" className="hover:text-[#f2ca50] uppercase transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#f2ca50] uppercase transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
