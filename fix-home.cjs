const fs = require('fs');
const path = 'src/pages/Home.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove the global scroll listener block
content = content.replace(/\/\/ Global scroll listener[\s\S]*?}, \[\]\);/g, '');

// 2. Remove the existing scrollToElement block
content = content.replace(/const scrollToElement = \(id: string\) => {[\s\S]*?  };/g, '');

// 3. Inject the necessary state and the corrected scrollToElement
const injection = `
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [lightbox, setLightbox] = useState({ isOpen: false, url: '', title: '', desc: '' });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToElement = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };
`;

content = content.replace('const { triggerInstantBooking, setBookingsTrigger } = useAppContext();', 'const { triggerInstantBooking, setBookingsTrigger } = useAppContext();\n' + injection);

fs.writeFileSync(path, content, 'utf8');
console.log('Home.tsx state restored');
