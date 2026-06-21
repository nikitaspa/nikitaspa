import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Phone } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import BookingForm from './BookingForm';
import MyBookings from './MyBookings';

export default function GlobalModals() {
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    preSelectedService,
    handleBookingSuccess,
    isReservationsPanelOpen,
    setIsReservationsPanelOpen,
    bookingsTrigger,
    handleCancelBooking,
    triggerInstantBooking
  } = useAppContext();

  return (
    <>
      {/* Private Slide-over Panel for Active Guest Reservations */}
      <AnimatePresence>
        {isReservationsPanelOpen && (
          <div id="reservations-backdrop" className="fixed inset-0 z-[120] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReservationsPanelOpen(false)}
              className="absolute inset-0 bg-black backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-md bg-[#131313] border-l border-[#f2ca50]/25 h-full z-10 shadow-2xl flex flex-col justify-between"
            >
              <div className="p-6 border-b border-[#4d4635]/25 flex justify-between items-center bg-[#1c1b1b]">
                <div className="space-y-0.5 text-left">
                  <h2 className="font-serif text-lg text-[#f2ca50] tracking-wide font-semibold">
                    My Sanctuary Bookings
                  </h2>
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

              <div className="p-6 flex-grow overflow-y-auto space-y-4 select-none">
                <MyBookings
                  bookingsTrigger={bookingsTrigger}
                  onCancelBooking={handleCancelBooking}
                />
              </div>

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
              className="relative w-full max-w-md bg-[#131313] border border-[#f2ca50]/30 rounded shadow-2xl backdrop-blur-xl z-10 max-h-[85vh] flex flex-col"
            >
              <div className="p-5 sm:p-8 overflow-y-auto custom-scrollbar flex-grow">
                <div className="flex justify-between items-center mb-6 pb-3 border-b border-[#f2ca50]/10">
                  <div className="text-left space-y-0.5">
                    <h2 className="font-serif text-xl text-[#f2ca50] tracking-wide font-semibold">Book Your Escape</h2>
                    <p className="text-[10px] text-[#d0c5af] uppercase tracking-widest font-sans">Private Wellness suite reservation</p>
                  </div>
                  <button
                    onClick={() => setIsBookingModalOpen(false)}
                    className="text-[#d0c5af] hover:text-[#f2ca50] hover:bg-white/5 p-1.5 rounded-full cursor-pointer transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
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

      {/* Floating Sticky Navigation Bar (Mobile Only) */}
      <div id="sticky-bottom-actions-rail" className="lg:hidden fixed bottom-5 inset-x-0 z-40 px-6 flex justify-center pointer-events-none">
        <nav className="bg-[#1c1b1b]/95 backdrop-blur-xl border border-[#f2ca50]/30 w-[320px] rounded-full shadow-[0_8px_32px_rgba(242,202,80,0.14)] flex justify-around items-center py-2 px-1 pointer-events-auto">
          <a
            href="https://wa.me/918271712580"
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#f2ca50] py-2 px-4 rounded-full hover:bg-[#f2ca50]/10 transition-all font-sans cursor-pointer text-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12.031 0C5.385 0 0 5.385 0 12.032c0 2.128.552 4.195 1.605 6.012L.014 24l6.136-1.608A11.96 11.96 0 0 0 12.031 24c6.643 0 12.032-5.384 12.032-12.031C24.063 5.385 18.674 0 12.031 0zm0 21.996c-1.794 0-3.551-.482-5.09-1.39l-.365-.216-3.784.992.992-3.69-.236-.376a9.96 9.96 0 0 1-1.524-5.289c0-5.512 4.485-9.997 9.997-9.997 5.513 0 9.997 4.485 9.997 9.997 0 5.512-4.484 9.997-9.997 9.997z"/>
              <path d="M17.5 14.381c-.301-.15-1.767-.866-2.041-.965-.274-.1-.473-.15-.673.15-.197.295-.771.964-.944 1.161-.174.196-.349.21-.645.065-.302-.15-1.265-.462-2.406-1.485-.888-.795-1.484-1.77-1.659-2.07-.174-.3-.02-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.098-.202.049-.382-.029-.533-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345z"/>
            </svg>
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

      {/* Global Floating WhatsApp Button */}
      <a
        href="https://wa.me/918271712580"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-[90px] lg:bottom-8 right-6 z-[90] bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Chat with us on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:-rotate-12 transition-transform duration-300">
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        </svg>
      </a>
    </>
  );
}
