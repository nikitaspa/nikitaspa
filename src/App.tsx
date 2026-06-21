import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import { Suspense, lazy } from 'react';
import Home from './pages/Home';

// Lazy load non-critical routes to reduce initial JS payload
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <Router>
          <Suspense fallback={<div className="min-h-screen bg-[#131313] flex items-center justify-center text-[#f2ca50]">Loading...</div>}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:id" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AppProvider>
    </HelmetProvider>
  );
}
