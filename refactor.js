import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const appTsxPath = path.join(srcDir, 'App.tsx');

// Read App.tsx
let appContent = fs.readFileSync(appTsxPath, 'utf8');

// We will rename App.tsx to pages/Home.tsx later, but first let's create it.
if (!fs.existsSync(path.join(srcDir, 'pages'))) {
  fs.mkdirSync(path.join(srcDir, 'pages'));
}

// Rename function App to Home
appContent = appContent.replace('export default function App() {', 'export default function Home() {');
fs.writeFileSync(path.join(srcDir, 'pages', 'Home.tsx'), appContent);

// Now create the new App.tsx that wraps everything in React Router
const newAppContent = `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
`;
fs.writeFileSync(appTsxPath, newAppContent);

// Create placeholder pages for SEO
const createPage = (name, title, desc, keyword) => {
  return `import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function ${name}() {
  return (
    <div className="bg-[#131313] min-h-screen text-[#e5e2e1] flex flex-col items-center pt-20 px-6">
      <Helmet>
        <title>${title}</title>
        <meta name="description" content="${desc}" />
        <meta name="keywords" content="${keyword}" />
      </Helmet>
      
      <div className="w-full max-w-4xl">
        <Link to="/" className="inline-flex items-center text-[#f2ca50] hover:text-white mb-8 transition-colors">
          <ChevronLeft size={20} className="mr-1" /> Back to Home
        </Link>
        
        <h1 className="font-serif text-3xl md:text-5xl text-white font-bold mb-6">${title.split('|')[0].trim()}</h1>
        
        <div className="glass-card p-8 rounded-lg border border-white/10 mt-8">
          <p className="text-[#d0c5af] leading-relaxed mb-6">
            ${desc}
          </p>
          <p className="text-[#d0c5af] leading-relaxed">
            Please visit our <Link to="/" className="text-[#f2ca50] hover:underline">Home page</Link> to view our full menu, gallery, and to book an appointment online.
          </p>
        </div>
      </div>
    </div>
  );
}
`;
};

fs.writeFileSync(path.join(srcDir, 'pages', 'About.tsx'), createPage(
  'About', 
  'About Us | Premium Spa in Viman Nagar Pune', 
  'Learn about Nikita Spa, the premier wellness sanctuary in Viman Nagar, Pune. We provide certified therapists, sterile environments, and pure organic treatments.',
  'About Nikita Spa, Spa in Viman Nagar, Wellness Sanctuary Pune'
));

fs.writeFileSync(path.join(srcDir, 'pages', 'Services.tsx'), createPage(
  'Services', 
  'Our Signature Services | Best Massage Center Pune', 
  'Explore our signature wellness massages including Swedish Massage, Deep Tissue Therapy, Aroma Therapy, and Couple Spa Packages in Pune.',
  'Swedish Massage Pune, Deep Tissue Massage Pune, Couple Spa Pune, Aroma Therapy Pune'
));

fs.writeFileSync(path.join(srcDir, 'pages', 'Gallery.tsx'), createPage(
  'Gallery', 
  'Spa Gallery | Luxury Spa Ambience in Pune', 
  'Take a virtual tour of Nikita Spa. View our serene private suites, couple rooms, and luxurious wellness amenities in Viman Nagar.',
  'Spa photos Pune, Couple spa suite Pune, Nikita spa gallery'
));

fs.writeFileSync(path.join(srcDir, 'pages', 'Contact.tsx'), createPage(
  'Contact', 
  'Contact Us | Nikita Spa Viman Nagar', 
  'Get in touch with Nikita Spa in Viman Nagar, Pune. Call us at +91 8271712580 or visit us opposite Phoenix Marketcity Mall.',
  'Contact Nikita Spa, Spa location Viman Nagar, Book spa appointment Pune'
));

console.log('Refactoring complete!');
