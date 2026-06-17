import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Leaf,
  Heart,
  Droplet,
  Award,
  Lock,
  ShieldCheck,
  MapPin,
  Clock,
  Coffee,
  Waves,
  Activity,
  Menu,
  X,
  Phone,
  MessageSquare,
  Calendar,
  ChevronDown,
  ExternalLink,
  BookOpen,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import { 
  SERVICES, 
  WELLNESS_PACKAGES, 
  WHY_CHOOSE_US, 
  GALLERY_IMAGES, 
  HERO_IMAGE, 
  ABOUT_IMAGE, 
  STATIC_MAP_IMAGE 
} from './data';
import { Booking } from './types';

// Importing custom modular components
import Lightbox from './components/Lightbox';
import BookingForm from './components/BookingForm';
import MyBookings from './components/MyBookings';
import Reviews from './components/Reviews';

const HERO_SLIDES = [
  {
    image: HERO_IMAGE,
    subtitle: "PREMIUM WELLNESS RETREAT",
    boldTitle: "Premium Spa & Wellness",
    goldTitle: "Sanctuary in Pune",
    description: "Relax. Refresh. Rejuvenate. Embark on a sensory journey of luxurious indulgence designed to restore harmonic balance to your busy body and active mind."
  },
  {
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1600',
    subtitle: "100% ORGANIC HEALING OILS",
    boldTitle: "Soothe Mind & Senses with",
    goldTitle: "Pure Aromatherapies",
    description: "Only steam-distilled pure botanical essences are applied to target physical fatigue, improve deep circulation, and stimulate mental clarity."
  },
  {
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1600',
    subtitle: "SOUNDPROOF SANCTUARIES",
    boldTitle: "Protected Rest inside our",
    goldTitle: "VIP Private Suites",
    description: "Reclaim your peaceful focus inside our low-light candlelit rooms, equipped with fresh organic single-use sheets, soft music, and individual steam baths."
  }
];

export default function App() {
  // Navigation states
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  // Interaction core states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState('');
  const [isReservationsPanelOpen, setIsReservationsPanelOpen] = useState(false);
  
  // Real-time synchronization
  const [bookingsTrigger, setBookingsTrigger] = useState(0);
  const [activeBookingCount, setActiveBookingCount] = useState(0);

  // Gallery filters and lightboxes
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'rooms' | 'healing'>('all');
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    url: '',
    title: '',
    desc: ''
  });

  // Interactive FAQs state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Hero section active slide states
  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay effect for the hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // auto-slide every 6s
    return () => clearInterval(interval);
  }, []);

  // Load booking count on boot
  useEffect(() => {
    const raw = localStorage.getItem('nikita_spa_bookings');
    if (raw) {
      try {
        const list: Booking[] = JSON.parse(raw);
        setActiveBookingCount(list.length);
      } catch (e) {
        console.error(e);
      }
    }
  }, [bookingsTrigger]);

  // Global scroll listener for sticky header & navigation highlight tracker
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }

      // Track sections
      const sections = ['home', 'about', 'gallery', 'services', 'pricing', 'reviews', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sect of sections) {
        const element = document.getElementById(sect);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sect);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookingSuccess = (newBooking: Booking) => {
    // Refresh parent state indicators
    setBookingsTrigger(prev => prev + 1);
    
    // Auto collapse modal state after short delay
    setTimeout(() => {
      setIsBookingModalOpen(false);
    }, 2500);
  };

  const handleCancelBooking = () => {
    setBookingsTrigger(prev => prev + 1);
  };

  const triggerInstantBooking = (serviceId: string) => {
    setPreSelectedService(serviceId);
    setIsBookingModalOpen(true);
  };

  const scrollToElement = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper mapping icon key strings to Lucide components
  const getWhyChooseIcon = (iconStr: string) => {
    switch (iconStr) {
      case 'Award': return <Award size={24} className="text-[#f2ca50]" />;
      case 'Lock': return <Lock size={24} className="text-[#f2ca50]" />;
      case 'ShieldCheck': return <ShieldCheck size={24} className="text-[#f2ca50]" />;
      case 'Sparkles': return <Sparkles size={24} className="text-[#f2ca50]" />;
      case 'Leaf': return <Leaf size={24} className="text-[#f2ca50]" />;
      case 'MapPin': return <MapPin size={24} className="text-[#f2ca50]" />;
      case 'Clock': return <Clock size={24} className="text-[#f2ca50]" />;
      case 'Coffee': return <Coffee size={24} className="text-[#f2ca50]" />;
      default: return <Sparkles size={24} className="text-[#f2ca50]" />;
    }
  };

  // Helper mapping category icons
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

  // Filtered gallery items
  const filteredGallery = GALLERY_IMAGES.filter((img) => {
    if (galleryFilter === 'all') return true;
    if (galleryFilter === 'rooms') {
      return img.title.toLowerCase().includes('lounge') || img.title.toLowerCase().includes('suite') || img.title.toLowerCase().includes('area');
    }
    if (galleryFilter === 'healing') {
      return img.title.toLowerCase().includes('oil') || img.title.toLowerCase().includes('session') || img.title.toLowerCase().includes('aroma');
    }
    return true;
  });

  const faqs = [
    {
      q: 'Do I need to book an appointment beforehand?',
      a: 'While we encourage drop-ins, our therapy rooms and premium private suites fill up rapidly. We highly suggest scheduling your session using our interactive form or direct WhatsApp line (+91 8271712580) to lock down certified therapists and preferred timings.'
    },
    {
      q: 'Are your spa oils safe for sensitive skin profiles?',
      a: 'Absolutely. We use 100% steam-distilled pure organic botanical cold-pressed oils. We do not incorporate mineral waxes, petroleum compounds, or chemical scents. If you have active skin allergies, please inform our therapist during check-in.'
    },
    {
      q: 'Can couples request a shared suite at Nikita Spa?',
      a: 'Yes, we feature premium private Couples suites. Our couple packages combine custom 90-minute aromatherapy treatments, customized ambient candles, warm steam baths, and signature welcome infusion teas inside a double-bed room.'
    },
    {
      q: 'What is your cancellation and rescheduling policy?',
      a: 'No penalties apply! If your busy program shifts, you can modify or delete your booking directly in the My Reservations slide panel on this applet, or message our staff via WhatsApp at least 2 hours prior to your scheduled arrival.'
    },
    {
      q: 'What hygiene measures are practiced at Viman Nagar?',
      a: 'Hygiene is our highest directive. All linens, silk robes, and towels are single-use and sterilized. Massaging beds, hot steam cabins, and relaxation tools are deeply disinfected after every visitor.'
    }
  ];

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-sans overflow-x-hidden min-h-screen flex flex-col selection:bg-[#f2ca50]/20 selection:text-[#f2ca50]">
      
      {/* Sticky Header TopAppBar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          headerScrolled
            ? 'bg-[#131313]/95 backdrop-blur-xl py-3 shadow-lg border-[#f2ca50]/15'
            : 'bg-[#131313]/70 backdrop-blur-md py-5 border-transparent'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 flex justify-between items-center">
          
          {/* Brand Logo */}
          <div 
            onClick={() => scrollToElement('home')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <motion.div 
              whileHover={{ rotate: 15 }}
              className="w-10 h-10 rounded-full bg-[#f2ca50]/10 border border-[#f2ca50]/30 flex items-center justify-center text-[#f2ca50]"
            >
              <Leaf size={20} className="fill-[#f2ca50]/10" />
            </motion.div>
            <div>
              <h1 className="font-serif text-lg md:text-xl text-[#f2ca50] tracking-[0.22em] font-bold uppercase transition-colors group-hover:text-white">
                NIKITA SPA
              </h1>
              <span className="text-[9px] tracking-[0.3em] uppercase block text-[#d0c5af] font-sans -mt-0.5">Viman Nagar, Pune</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex gap-8 items-center text-xs font-semibold tracking-widest font-sans uppercase">
            {[
              { id: 'about', label: 'About' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'services', label: 'Treatments' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'reviews', label: 'Feedback' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToElement(item.id)}
                className={`transition-colors cursor-pointer relative pb-1 border-b-2 ${
                  activeSection === item.id
                    ? 'text-[#f2ca50] border-[#f2ca50]'
                    : 'text-[#d0c5af] border-transparent hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Hub (My Bookings Trigger & CTA Button) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Live Reservations Status Button */}
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

            {/* Float Booking CTA */}
            <button
              onClick={() => triggerInstantBooking('')}
              className="bg-[#f2ca50] text-[#3c2f00] hover:brightness-110 active:scale-95 px-6 py-2.5 rounded text-xs font-bold font-sans uppercase tracking-wider transition-all cursor-pointer"
            >
              BOOK NOW
            </button>
          </div>

          {/* Mobile Right Bar Hub (Hamburger & Reservations Tracker) */}
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
              {[
                { id: 'about', label: 'About Our Sanctuary' },
                { id: 'gallery', label: 'Ambience Photo Tour' },
                { id: 'services', label: 'Signature Massages' },
                { id: 'pricing', label: 'Curated Wellness Packages' },
                { id: 'reviews', label: 'Guest Testimonials' },
                { id: 'contact', label: 'Visit / Map Location' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToElement(item.id)}
                  className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors py-1 block"
                >
                  {item.label}
                </button>
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

      {/* Main Body */}
      <main className="flex-grow pt-[80px]">

        {/* Hero Section with Interactive Slider */}
        <section id="home" className="relative min-h-[92vh] flex items-center justify-center text-center overflow-hidden">
          {/* Cover image backdrops with transition */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  alt={HERO_SLIDES[currentSlide].boldTitle}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  src={HERO_SLIDES[currentSlide].image}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 hero-gradient"></div>
            <div className="absolute inset-0 bg-black/45"></div>
          </div>

          <div className="relative z-10 px-6 max-w-[1000px] flex flex-col items-center pt-10 min-h-[50vh] justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -15 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                <span className="font-sans text-xs md:text-sm text-[#f2ca50] tracking-[0.4em] mb-4 uppercase font-semibold block bg-[#f2ca50]/10 px-4 py-1.5 rounded-full border border-[#f2ca50]/20 w-fit mx-auto">
                  {HERO_SLIDES[currentSlide].subtitle}
                </span>

                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-[1.15] tracking-tight min-h-[2.4em] md:min-h-[2.3em] flex flex-col justify-center">
                  <span>{HERO_SLIDES[currentSlide].boldTitle}</span>
                  <span className="text-[#f2ca50]">{HERO_SLIDES[currentSlide].goldTitle}</span>
                </h2>

                <p className="font-sans text-[#d0c5af] text-sm md:text-lg max-w-2xl mx-auto leading-relaxed min-h-[4.5em] md:min-h-[3.6em]">
                  {HERO_SLIDES[currentSlide].description}
                </p>

                {/* Instant dynamic indicators */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 font-sans text-xs text-[#d0c5af]/80">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={16} className="text-[#f2ca50]" /> 100% Sterile Rooms
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]/30 hidden sm:inline" />
                  <span className="flex items-center gap-1.5">
                    <Award size={16} className="text-[#f2ca50]" /> Certified Female & Male Staff
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]/30 hidden sm:inline" />
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} className="text-[#f2ca50]" /> Everyday 10:00 AM - 9:00 PM
                  </span>
                </div>

                {/* Controls triggers code */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 max-w-md mx-auto">
                  <button
                    onClick={() => triggerInstantBooking('')}
                    className="w-full sm:w-auto bg-[#f2ca50] text-[#3c2f00] hover:bg-white hover:text-black font-semibold px-10 py-4 rounded text-xs tracking-widest font-sans uppercase active:scale-95 transition-all shadow-[0_4px_20px_rgba(242,202,80,0.15)] cursor-pointer"
                  >
                    Book Appointment
                  </button>
                  <a
                    href="https://wa.me/918271712580"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto border border-[#f2ca50] text-[#f2ca50] hover:bg-[#f2ca50]/10 font-semibold px-10 py-4 rounded text-xs tracking-widest font-sans uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={16} /> WhatsApp Now
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left / Right Navigation Arrows */}
          <button
            onClick={() => {
              setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm text-white/70 hover:text-white hover:border-[#f2ca50] hover:bg-[#f2ca50]/10 flex items-center justify-center transition-all cursor-pointer focus:outline-none"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={() => {
              setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm text-white/70 hover:text-white hover:border-[#f2ca50] hover:bg-[#f2ca50]/10 flex items-center justify-center transition-all cursor-pointer focus:outline-none"
            aria-label="Next Slide"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-6 bg-[#f2ca50]' : 'w-2 bg-white/40 hover:bg-white'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Animated scroll down visual cue */}
          <div 
            onClick={() => scrollToElement('about')}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer opacity-50 hover:opacity-100 transition-opacity hidden lg:flex flex-col items-center gap-1 text-[10px] tracking-widest text-[#d0c5af] font-sans"
          >
            <ChevronDown size={20} className="text-[#f2ca50] animate-bounce" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 max-w-[1240px] mx-auto scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Aspect image frame with organic gold outline */}
            <div className="relative group">
              <div className="absolute -inset-3 border border-[#f2ca50]/20 rounded-lg group-hover:border-[#f2ca50]/45 transition-colors duration-500"></div>
              <img
                alt="Close up of deep professional massage treatment"
                className="relative rounded shadow-2xl w-full aspect-[4/5] object-cover bg-black"
                src={ABOUT_IMAGE}
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-[#131313]/90 backdrop-blur-md p-4 rounded border border-[#f2ca50]/20 text-left">
                <p className="font-serif text-[#f2ca50] text-sm font-semibold tracking-wider">OPPOSITE PHOENIX MARKETCITY</p>
                <p className="text-[11px] text-[#d0c5af] font-sans mt-0.5">Viman Nagar, Pune, Maharashtra</p>
              </div>
            </div>

            {/* Structured description metrics */}
            <div className="space-y-8 text-left">
              <div className="space-y-3">
                <span className="font-sans text-[11px] text-[#f2ca50] font-semibold tracking-[0.25em] uppercase block">THE SANCTUARY CONCEPT</span>
                <h3 className="font-serif text-3xl md:text-4xl text-white font-bold leading-tight">
                  Your Premier Destination for Holistic Wellbeing
                </h3>
                <div className="h-0.5 w-16 bg-[#f2ca50] opacity-60" />
              </div>

              <p className="font-sans text-sm md:text-base text-[#d0c5af] leading-relaxed">
                At Nikita Spa, we believe wellness is a profound necessity, not just a luxury. Nestled inside the premium hub of Viman Nagar, our sanctuary offers a beautifully curated escape from the high-stress urban routine. Our rooms are fully customized to trigger immediate relaxation with sensory candles, clean sheets, and low-frequency twilight lighting systems.
              </p>

              {/* Icon badges grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2 p-4 bg-[#1c1b1b] rounded border border-white/[0.02]">
                  <div className="w-10 h-10 rounded-full bg-[#f2ca50]/10 flex items-center justify-center text-[#f2ca50]">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className="font-sans text-sm font-semibold text-white">100% Sterile Hygiene</h4>
                  <p className="font-sans text-xs text-[#d0c5af]/80 leading-relaxed">
                    Single-use materials, sterile cotton towels, and deep sanitation after each guest.
                  </p>
                </div>

                <div className="space-y-2 p-4 bg-[#1c1b1b] rounded border border-white/[0.02]">
                  <div className="w-10 h-10 rounded-full bg-[#f2ca50]/10 flex items-center justify-center text-[#f2ca50]">
                    <Award size={20} />
                  </div>
                  <h4 className="font-sans text-sm font-semibold text-white">Elite Certified Staff</h4>
                  <p className="font-sans text-xs text-[#d0c5af]/80 leading-relaxed">
                    Our therapists are highly trained in localized tension release and global deep-kneading.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => scrollToElement('services')}
                  className="font-sans text-xs font-bold text-[#f2ca50] tracking-widest uppercase border-b-2 border-[#f2ca50] pb-1 hover:text-white hover:border-white transition-colors cursor-pointer"
                >
                  Explore Healing Treatments
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Ambience Gallery Section with Filters & Lightbox */}
        <section id="gallery" className="py-24 bg-[#0e0e0e] scroll-mt-20">
          <div className="max-w-[1240px] mx-auto px-6">
            
            <div className="text-center space-y-3 mb-12">
              <span className="font-sans text-[11px] text-[#f2ca50] font-semibold tracking-[0.25em] uppercase block">JOURNEY OF THE SENSES</span>
              <h3 className="font-serif text-3xl text-white font-bold">Experience The Ambience</h3>
              <p className="font-sans text-xs md:text-sm text-[#d0c5af] max-w-sm mx-auto">Take a virtual visual tour of our private suites, consultation lounges, and organic steam setups.</p>
              <div className="h-0.5 w-16 bg-[#f2ca50] mx-auto opacity-50" />
            </div>

            {/* Photo Gallery Filters */}
            <div className="flex justify-center gap-3 mb-10 max-w-md mx-auto">
              {([
                { key: 'all', label: 'All Photos' },
                { key: 'rooms', label: 'Serene Rooms' },
                { key: 'healing', label: 'Healing Details' }
              ] as const).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setGalleryFilter(tab.key)}
                  className={`flex-1 text-center py-2 px-1 text-xs font-semibold tracking-wider font-sans border transition-all cursor-pointer ${
                    galleryFilter === tab.key
                      ? 'bg-[#f2ca50] text-[#3c2f00] border-[#f2ca50]'
                      : 'border-[#4d4635]/40 text-[#d0c5af] hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Gallery Fluid Image Grid layout elements */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredGallery.map((img, index) => (
                  <motion.div
                    key={img.url}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => setLightbox({
                      isOpen: true,
                      url: img.url,
                      title: img.title,
                      desc: img.description
                    })}
                    className="relative group cursor-pointer overflow-hidden rounded border border-white/[0.05] h-64 shadow-lg group select-none"
                    title="Click to enlarge"
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 brightness-95"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay bottom shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Meta info on active Hover */}
                    <div className="absolute inset-x-0 bottom-0 p-5 text-left transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="font-sans text-[10px] text-[#f2ca50] tracking-widest font-semibold uppercase block mb-1">
                        NIKITA AMBIENCE
                      </span>
                      <h4 className="font-serif text-base text-white font-medium group-hover:text-[#f2ca50] transition-colors">
                        {img.title}
                      </h4>
                      <p className="font-sans text-[11px] text-[#d0c5af]/85 mt-1 line-clamp-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {img.description}
                      </p>
                    </div>

                    {/* Expand lens icon indicator top right */}
                    <div className="absolute top-4 right-4 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[#f2ca50] text-xs font-semibold uppercase tracking-wider scale-90">+</span>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* Signature Treatments / Services Section */}
        <section id="services" className="py-24 px-6 max-w-[1240px] mx-auto scroll-mt-20">
          
          <div className="text-center space-y-3 mb-16">
            <span className="font-sans text-[11px] text-[#f2ca50] font-semibold tracking-[0.25em] uppercase block">THE RECOVERY PROTOCOL</span>
            <h3 className="font-serif text-3xl md:text-4xl text-white font-bold">Signature Wellness Massages</h3>
            <p className="font-sans text-xs md:text-sm text-[#d0c5af] max-w-md mx-auto">
              Select one of our highly requested therapies disinfected with hospital-grade sanitization standards.
            </p>
            <div className="h-0.5 w-16 bg-[#f2ca50] mx-auto opacity-50" />
          </div>

          {/* Six column service items cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((serv) => {
              const categoryIcon = getServiceCategoryIcon(serv.iconName);
              return (
                <div
                  key={serv.id}
                  id={`service-${serv.id}`}
                  className="glass-card p-8 rounded flex flex-col justify-between group hover:border-[#f2ca50]/55 transition-all duration-300 h-full relative"
                >
                  <div className="space-y-5 text-left">
                    {/* Top row with Category and icon */}
                    <div className="flex justify-between items-start">
                      <span className="font-sans text-[10px] bg-[#f2ca50]/10 border border-[#f2ca50]/20 text-[#f2ca50] font-semibold px-3 py-1 rounded tracking-widest uppercase">
                        {serv.category}
                      </span>
                      <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#f2ca50] group-hover:bg-[#f2ca50]/15 group-hover:border-[#f2ca50]/30 transition-colors">
                        {categoryIcon}
                      </div>
                    </div>

                    {/* Service Name */}
                    <h4 className="font-serif text-xl text-white font-bold transition-colors group-hover:text-[#f2ca50]">
                      {serv.name}
                    </h4>

                    {/* Service Description */}
                    <p className="font-sans text-xs md:text-sm text-[#d0c5af] leading-relaxed">
                      {serv.description}
                    </p>
                  </div>

                  {/* Actions purchase details bar at bottom of the card */}
                  <div className="mt-8 pt-5 border-t border-[#4d4635]/25 flex items-center justify-between">
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

        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 bg-[#0e0e0e] px-6">
          <div className="max-w-[1240px] mx-auto text-left">
            
            <div className="flex flex-col lg:flex-row justify-between items-baseline mb-16 gap-6">
              <div className="space-y-3 lg:max-w-xl">
                <span className="font-sans text-[11px] text-[#f2ca50] font-semibold tracking-[0.25em] uppercase block">THE EXCELLENCE FACTOR</span>
                <h3 className="font-serif text-3xl md:text-4xl text-white font-bold leading-tight">
                  Why Nikita Spa Stands Apart inside Pune
                </h3>
                <div className="h-0.5 w-16 bg-[#f2ca50] opacity-60" />
              </div>
              <p className="font-sans text-xs md:text-sm text-[#d0c5af] max-w-md">
                We completely redefine the modern wellness experience through extreme attention to hygiene protocols and elite standards of hospitality.
              </p>
            </div>

            {/* Bento highlights list */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {WHY_CHOOSE_US.map((item, idx) => {
                const badgeIcon = getWhyChooseIcon(item.icon);
                return (
                  <div
                    key={idx}
                    className="bg-[#1c1b1b] p-6 rounded border border-white/[0.02] flex flex-col items-center text-center justify-center space-y-3 hover:border-[#f2ca50]/20 transition-colors"
                  >
                    <div className="p-3 bg-[#131414] rounded-full border border-white/5">
                      {badgeIcon}
                    </div>
                    <div className="space-y-1">
                      <span className="font-sans text-xs font-bold text-white block uppercase tracking-wider">
                        {item.title}
                      </span>
                      <p className="font-sans text-[10px] md:text-xs text-[#d0c5af]/60 tracking-normal leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Wellness Pricing Packages Section */}
        <section id="pricing" className="py-24 px-6 max-w-[1240px] mx-auto scroll-mt-20">
          
          <div className="text-center space-y-3 mb-16">
            <span className="font-sans text-[11px] text-[#f2ca50] font-semibold tracking-[0.25em] uppercase block">COMPOUND CURATIONS</span>
            <h3 className="font-serif text-3xl md:text-4xl text-white font-bold">Signature Curated Bundles</h3>
            <p className="font-sans text-xs md:text-sm text-[#d0c5af] max-w-md mx-auto">
              Make profound savings by choosing our comprehensive multi-treatment packages.
            </p>
            <div className="h-0.5 w-16 bg-[#f2ca50] mx-auto opacity-50" />
          </div>

          {/* Curved packages pricing layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
            {WELLNESS_PACKAGES.map((pkg) => {
              const isPopular = pkg.badge === 'MOST POPULAR';
              return (
                <div
                  key={pkg.id}
                  className={`rounded flex flex-col justify-between p-8 relative transition-all duration-300 shadow-xl ${
                    isPopular
                      ? 'bg-[#1c1b1b] border-2 border-[#f2ca50] lg:scale-105 z-10'
                      : 'bg-[#1c1b1b]/70 border border-white/10'
                  }`}
                >
                  {/* Decorative badge for best value */}
                  {isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#f2ca50] text-[#3c2f00] text-[10px] font-bold px-4 py-1 rounded-full tracking-widest uppercase shadow-md">
                      {pkg.badge}
                    </span>
                  )}

                  {/* Header metadata */}
                  <div className="space-y-6 text-left">
                    <div className="space-y-1">
                      <span className="font-sans text-[10px] text-[#f2ca50] tracking-widest font-semibold uppercase block">
                        WELLNESS BUNDLE
                      </span>
                      <h4 className="font-serif text-lg md:text-xl text-white font-bold tracking-wide">
                        {pkg.name}
                      </h4>
                    </div>

                    <div className="flex items-baseline gap-1 font-serif py-2">
                      <span className="text-[#f2ca50] text-xl font-bold">₹</span>
                      <span className="text-3xl md:text-5xl font-bold text-white">
                        {pkg.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-[#d0c5af] font-sans ml-1.5 uppercase">All-inclusive</span>
                    </div>

                    {/* Custom included elements list */}
                    <ul className="space-y-3 pt-3 border-t border-[#4d4635]/25">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs text-[#d0c5af] font-sans">
                          <span className="text-[#f2ca50] text-sm leading-none mt-0.5 font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing action buttons */}
                  <div className="mt-10 pt-4">
                    <button
                      onClick={() => triggerInstantBooking(pkg.treatmentIds?.[0] || '')}
                      className={`w-full py-3.5 rounded text-xs font-semibold tracking-wider font-sans uppercase transition-all duration-300 cursor-pointer ${
                        isPopular
                          ? 'bg-[#f2ca50] text-[#3c2f00] hover:brightness-110 shadow-lg'
                          : 'bg-transparent border border-[#f2ca50] text-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#3c2f00]'
                      }`}
                    >
                      BOOK WELLNESS PACKAGE
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </section>

        {/* Dynamic Client Testimonials Board Section */}
        <section id="reviews" className="py-24 bg-[#0e0e0e] px-6 scroll-mt-20">
          <div className="max-w-[1240px] mx-auto">
            
            <div className="text-center space-y-3 mb-16">
              <span className="font-sans text-[11px] text-[#f2ca50] font-semibold tracking-[0.25em] uppercase block">SOCIAL CONFIRMATION</span>
              <h3 className="font-serif text-3xl md:text-4xl text-white font-bold">Hear From Our Guests</h3>
              <p className="font-sans text-xs md:text-sm text-[#d0c5af] max-w-md mx-auto">
                Read authentic feedback from local residents and business visitors checking into Nikita Spa.
              </p>
              <div className="h-0.5 w-16 bg-[#f2ca50] mx-auto opacity-50" />
            </div>

            {/* Embedded module */}
            <Reviews />

          </div>
        </section>

        {/* Direct Accordion-style Frequently Asked Questions (FAQ) Section */}
        <section id="faq" className="py-24 px-6 max-w-[800px] mx-auto scroll-mt-20">
          
          <div className="text-center space-y-3 mb-16">
            <span className="font-sans text-[11px] text-[#f2ca50] font-semibold tracking-[0.25em] uppercase block">ANSWERS IN THE SPA</span>
            <h3 className="font-serif text-3xl text-white font-bold">Frequently Asked Questions</h3>
            <p className="font-sans text-xs md:text-sm text-[#d0c5af] max-w-sm mx-auto">Have queries about pre-bookings, treatment guidelines, or location hours?</p>
            <div className="h-0.5 w-16 bg-[#f2ca50] mx-auto opacity-50" />
          </div>

          <div className="space-y-4">
            {faqs.map((faqItem, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#1c1b1b] border border-[#f2ca50]/10 rounded-lg overflow-hidden transition-all duration-300"
                >
                  {/* Accordion trigger title */}
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 text-white hover:text-[#f2ca50] font-sans font-medium text-xs md:text-sm cursor-pointer select-none"
                  >
                    <span className="flex items-center gap-2">
                      <HelpCircle size={16} className="text-[#f2ca50] shrink-0" />
                      {faqItem.q}
                    </span>
                    <span className="text-[#f2ca50] transition-transform duration-300 transform" style={{ rotate: isOpen ? '180deg' : '0deg' }}>
                      ▼
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-[#d0c5af] font-sans leading-relaxed border-t border-[#4d4635]/15">
                          {faqItem.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </section>

        {/* Contact info, Map and Callback Request Form */}
        <section id="contact" className="py-24 bg-[#0e0e0e] px-6 border-t border-[#f2ca50]/10 scroll-mt-20">
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Contact metadata */}
            <div className="space-y-8 text-left">
              <div className="space-y-3">
                <span className="font-sans text-[11px] text-[#f2ca50] font-semibold tracking-[0.25em] uppercase block">PREMIUM LOCATION</span>
                <h3 className="font-serif text-3xl md:text-4xl text-white font-bold">Begin Your Wellness Journey</h3>
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
                    <h4 className="font-sans text-sm font-semibold text-white">Spa Location Address</h4>
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
                    <h4 className="font-sans text-sm font-semibold text-white">Call Reception</h4>
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
                    <h4 className="font-sans text-sm font-semibold text-white">Instant WhatsApp booking</h4>
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
                <h4 className="font-serif text-2xl text-white font-bold text-left">Request Instant Session Confirmation</h4>
                <p className="text-xs text-[#d0c5af]">Fill your contact details. Our managers will ring you up within 10 minutes from post.</p>
              </div>

              {/* Render dynamic Form */}
              <BookingForm 
                onBookingSuccess={handleBookingSuccess} 
                initialServiceId={preSelectedService}
              />
            </div>

          </div>
        </section>

      </main>

      {/* Structured Footer */}
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
                <button onClick={() => scrollToElement('services')} className="hover:text-[#f2ca50] transition-colors uppercase">
                  Signature Treatments
                </button>
              </li>
              <li>
                <button onClick={() => scrollToElement('pricing')} className="hover:text-[#f2ca50] transition-colors uppercase">
                  Curated Wellness Bundles
                </button>
              </li>
              <li>
                <button onClick={() => scrollToElement('faq')} className="hover:text-[#f2ca50] transition-colors uppercase">
                  Safety FAQ Accordions
                </button>
              </li>
              <li>
                <button onClick={() => scrollToElement('contact')} className="hover:text-[#f2ca50] transition-colors uppercase">
                  Reception Contact Desk
                </button>
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

      {/* Floating Sticky Navigation Bar (Mobile Only) */}
      <div id="sticky-bottom-actions-rail" className="lg:hidden fixed bottom-5 inset-x-0 z-40 px-6 flex justify-center pointer-events-none">
        <nav className="bg-[#1c1b1b]/95 backdrop-blur-xl border border-[#f2ca50]/30 w-[320px] rounded-full shadow-[0_8px_32px_rgba(242,202,80,0.14)] flex justify-around items-center py-2 px-1 pointer-events-auto">
          
          <a
            href="https://wa.me/918271712580"
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#f2ca50] py-2 px-4 rounded-full hover:bg-[#f2ca50]/10 transition-all font-sans cursor-pointer text-center"
          >
            <MessageSquare size={15} />
            WhatsApp
          </a>

          <div className="w-[1px] h-6 bg-[#f2ca50]/20 shrink-0" />

          <a
            href="tel:+918271712580"
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#f2ca50] py-2 px-4 rounded-full hover:bg-[#f2ca50]/10 transition-all font-sans cursor-pointer text-center"
          >
            <Phone size={15} />
            Call Now
          </a>

        </nav>
      </div>

      {/* Private Slide-over Panel for Active Guest Reservations */}
      <AnimatePresence>
        {isReservationsPanelOpen && (
          <div id="reservations-backdrop" className="fixed inset-0 z-[120] flex justify-end">
            {/* Dark glass backdrop block overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReservationsPanelOpen(false)}
              className="absolute inset-0 bg-black backdrop-blur-xs"
            />
            
            {/* Draw side menu container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-md bg-[#131313] border-l border-[#f2ca50]/25 h-full z-10 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#4d4635]/25 flex justify-between items-center bg-[#1c1b1b]">
                <div className="space-y-0.5 text-left">
                  <h3 className="font-serif text-lg text-[#f2ca50] tracking-wide font-semibold">
                    My Sanctuary Bookings
                  </h3>
                  <span className="text-[10px] text-[#d0c5af]/70 tracking-widest uppercase font-sans">
                    Live Guest Schedule Panel
                  </span>
                </div>
                <button
                  onClick={() => setIsReservationsPanelOpen(false)}
                  className="text-[#d0c5af] hover:text-[#f2ca50] hover:bg-white/5 p-2 rounded-full cursor-pointer transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scroll Content panel list */}
              <div className="p-6 flex-grow overflow-y-auto space-y-4 select-none">
                <MyBookings 
                  bookingsTrigger={bookingsTrigger} 
                  onCancelBooking={handleCancelBooking}
                />
              </div>

              {/* Footer CTA of panel drawer */}
              <div className="p-6 border-t border-[#4d4635]/25 bg-[#0e0e0e]/95 space-y-4">
                <div className="p-3 bg-[#f2ca50]/5 border border-[#f2ca50]/15 rounded text-[11px] text-[#d0c5af]/80 leading-normal flex gap-2 text-left font-sans">
                  <Clock size={16} className="text-[#f2ca50] shrink-0 mt-0.5" />
                  <span>Please arrive 10 minutes prior to your scheduled therapy to check-in, enjoy welcome beverages, and adjust steam settings.</span>
                </div>
                
                <button
                  onClick={() => {
                    setIsReservationsPanelOpen(false);
                    triggerInstantBooking('');
                  }}
                  className="w-full bg-[#f2ca50] text-[#3c2f00] py-3 text-xs font-bold tracking-widest uppercase font-sans hover:brightness-110 active:scale-95 transition-all rounded cursor-pointer"
                >
                  Schedule A New Session
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Pop-up Booking Appointment Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div id="booking-modal-overlay" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#131313] border border-[#f2ca50]/30 rounded shadow-2xl overflow-hidden backdrop-blur-xl z-10"
            >
              <div className="p-6 md:p-8">
                
                {/* Header title */}
                <div className="flex justify-between items-center mb-6">
                  <div className="text-left space-y-0.5">
                    <h3 className="font-serif text-xl text-[#f2ca50] tracking-wide font-semibold">Book Your Escape</h3>
                    <p className="text-[10px] text-[#d0c5af] uppercase tracking-widest font-sans">Private Wellness suite reservation</p>
                  </div>
                  <button
                    onClick={() => setIsBookingModalOpen(false)}
                    className="text-[#d0c5af] hover:text-[#f2ca50] hover:bg-white/5 p-1.5 rounded-full cursor-pointer transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Form component */}
                <BookingForm
                  initialServiceId={preSelectedService}
                  onBookingSuccess={handleBookingSuccess}
                  isModal={true}
                  onCloseModal={() => setIsBookingModalOpen(false)}
                />

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Module Dialog */}
      <Lightbox
        isOpen={lightbox.isOpen}
        imageUrl={lightbox.url}
        title={lightbox.title}
        description={lightbox.desc}
        onClose={() => setLightbox({ isOpen: false, url: '', title: '', desc: '' })}
      />

    </div>
  );
}
