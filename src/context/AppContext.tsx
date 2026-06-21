import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Booking } from '../types';

interface AppContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  headerScrolled: boolean;
  setHeaderScrolled: (scrolled: boolean) => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;
  preSelectedService: string;
  setPreSelectedService: (serviceId: string) => void;
  isReservationsPanelOpen: boolean;
  setIsReservationsPanelOpen: (open: boolean) => void;
  bookingsTrigger: number;
  setBookingsTrigger: React.Dispatch<React.SetStateAction<number>>;
  activeBookingCount: number;
  setActiveBookingCount: (count: number) => void;
  triggerInstantBooking: (serviceId: string) => void;
  handleBookingSuccess: (newBooking: Booking) => void;
  handleCancelBooking: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preSelectedService, setPreSelectedService] = useState('');
  const [isReservationsPanelOpen, setIsReservationsPanelOpen] = useState(false);
  const [bookingsTrigger, setBookingsTrigger] = useState(0);
  const [activeBookingCount, setActiveBookingCount] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem('nikita_spa_bookings');
    if (raw) {
      try {
        const list: Booking[] = JSON.parse(raw);
        setActiveBookingCount(list.length);
      } catch (e) {
        console.error(e);
      }
    } else {
      setActiveBookingCount(0);
    }
  }, [bookingsTrigger]);

  const triggerInstantBooking = (serviceId: string) => {
    setPreSelectedService(serviceId);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    setBookingsTrigger(prev => prev + 1);
    setTimeout(() => {
      setIsBookingModalOpen(false);
    }, 2500);
  };

  const handleCancelBooking = () => {
    setBookingsTrigger(prev => prev + 1);
  };

  return (
    <AppContext.Provider
      value={{
        activeSection, setActiveSection,
        mobileMenuOpen, setMobileMenuOpen,
        headerScrolled, setHeaderScrolled,
        isBookingModalOpen, setIsBookingModalOpen,
        preSelectedService, setPreSelectedService,
        isReservationsPanelOpen, setIsReservationsPanelOpen,
        bookingsTrigger, setBookingsTrigger,
        activeBookingCount, setActiveBookingCount,
        triggerInstantBooking, handleBookingSuccess, handleCancelBooking
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
