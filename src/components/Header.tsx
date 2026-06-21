import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Calendar, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Header() {
  const {
    headerScrolled,
    activeSection,
    activeBookingCount,
    setIsReservationsPanelOpen,
    triggerInstantBooking,
    mobileMenuOpen,
    setMobileMenuOpen
  } = useAppContext();

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const scrollToElement = (id: string) => {
    setMobileMenuOpen(false);
    if (isHome) {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  const navItems = [
    { id: 'about', label: 'About', path: '/about' },
    { id: 'gallery', label: 'Gallery', path: '/gallery' },
    { id: 'services', label: 'Treatments', path: '/services' },
    { id: 'pricing', label: 'Pricing', path: isHome ? '#pricing' : '/#pricing' },
    { id: 'reviews', label: 'Feedback', path: isHome ? '#reviews' : '/#reviews' },
    { id: 'contact', label: 'Contact', path: '/contact' }
  ];

  const renderNavAction = (item: any) => {
    if (item.id === 'contact' || item.id === 'about' || item.id === 'gallery' || item.id === 'services') {
      return (
        <Link
          to={item.path}
          onClick={() => setMobileMenuOpen(false)}
          className={`transition-colors relative pb-1 border-b-2 ${
            location.pathname === item.path
              ? 'text-[#f2ca50] border-[#f2ca50]'
              : 'text-[#d0c5af] border-transparent hover:text-white'
          }`}
        >
          {item.label}
        </Link>
      );
    }
    return (
      <button
        onClick={() => scrollToElement(item.id)}
        className={`transition-colors cursor-pointer relative pb-1 border-b-2 ${
          activeSection === item.id && isHome
            ? 'text-[#f2ca50] border-[#f2ca50]'
            : 'text-[#d0c5af] border-transparent hover:text-white'
        }`}
      >
        {item.label}
      </button>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          headerScrolled
            ? 'bg-[#131313]/95 backdrop-blur-xl py-3 shadow-lg border-[#f2ca50]/15'
            : 'bg-[#131313]/70 backdrop-blur-md py-5 border-transparent'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-center">
          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => {
              if (isHome) window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              className="w-10 h-10 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]"
            >
              <Leaf size={20} className="fill-[#f2ca50]/10" />
            </motion.div>
            <div>
              <div className="font-serif text-lg md:text-xl text-[#f2ca50] tracking-[0.22em] font-bold uppercase transition-colors group-hover:text-white">
                NIKITA SPA
              </div>
              <span className="text-[9px] tracking-[0.3em] uppercase block text-[#d0c5af] font-sans -mt-0.5">
                Viman Nagar, Pune
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex gap-8 items-center text-xs font-semibold tracking-widest font-sans uppercase">
            {navItems.map((item) => (
              <div key={item.id}>{renderNavAction(item)}</div>
            ))}
          </nav>

          {/* Action Hub */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsReservationsPanelOpen(true)}
              className="relative p-2 text-[#d0c5af] hover:text-[#f2ca50] hover:bg-white/5 rounded-full cursor-pointer transition-all flex items-center gap-2"
              title="View my active bookings"
            >
              <div className="relative">
                <Calendar size={20} />
                {activeBookingCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#f2ca50] text-[#3c2f00] text-[10px] h-4 w-4 rounded-full flex items-center justify-center font-bold font-sans animate-bounce">
                    {activeBookingCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-sans font-medium tracking-wide">My Bookings</span>
            </button>

            <button
              onClick={() => triggerInstantBooking('')}
              className="bg-[#f2ca50] text-[#3c2f00] hover:brightness-110 active:scale-95 px-6 py-2.5 rounded text-xs font-bold font-sans uppercase tracking-wider transition-all cursor-pointer"
            >
              BOOK NOW
            </button>
          </div>

          {/* Mobile Right Bar Hub */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsReservationsPanelOpen(true)}
              className="relative p-2 text-[#d0c5af] hover:text-[#f2ca50]"
              aria-label="Toggle Reservations"
            >
              <Calendar size={22} />
              {activeBookingCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#f2ca50] text-[#3c2f00] text-[9px] h-4.5 w-4.5 rounded-full flex items-center justify-center font-bold font-sans">
                  {activeBookingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#f2ca50]"
              aria-label="Open Mobile Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[70px] bg-[#1a1a1a] z-40 border-b border-[#f2ca50]/15 lg:hidden px-6 py-8 shadow-2xl space-y-6"
          >
            <div className="flex flex-col gap-5 text-center text-xs font-semibold tracking-[0.2em] uppercase font-sans">
              {navItems.map((item) => (
                <div key={item.id} className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors py-1 block">
                  {item.id === 'contact' || item.id === 'about' || item.id === 'gallery' || item.id === 'services' ? (
                    <Link to={item.path} onClick={() => setMobileMenuOpen(false)}>
                      {item.label}
                    </Link>
                  ) : (
                    <button onClick={() => scrollToElement(item.id)} className="w-full">
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#4d4635]/20 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerInstantBooking('');
                }}
                className="w-full bg-[#f2ca50] text-[#3c2f00] py-3.5 rounded text-xs font-bold tracking-widest uppercase font-sans text-center transition-all cursor-pointer"
              >
                SCHEDULE APPOINTMENT
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsReservationsPanelOpen(true);
                }}
                className="w-full bg-transparent border border-[#f2ca50]/40 text-[#f2ca50] py-3 rounded text-xs font-bold tracking-widest uppercase font-sans text-center transition-all cursor-pointer"
              >
                VIEW MY RESERVATIONS ({activeBookingCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
