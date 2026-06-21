import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GlobalModals from '../components/GlobalModals';
import { useAppContext } from '../context/AppContext';

export default function MainLayout() {
  const { setHeaderScrolled, setActiveSection } = useAppContext();

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'gallery', 'services', 'pricing', 'reviews', 'faq', 'contact'];
      let currentSection = 'home';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setHeaderScrolled, setActiveSection]);

  return (
    <div className="bg-[#131313] min-h-screen text-[#e5e2e1] flex flex-col font-sans overflow-x-hidden w-full m-0 p-0">
      <Header />
      <main className="flex-grow pt-[80px]">
        <Outlet />
      </main>
      <Footer />
      <GlobalModals />
    </div>
  );
}
