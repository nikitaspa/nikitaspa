import { useState, useEffect } from 'react';
import { Booking } from '../types';
import { SERVICES } from '../data';
import { Trash2, Calendar, Clock, Smile, Sparkles, Sliders, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MyBookingsProps {
  bookingsTrigger: number; // Increment this to force live updates from localStorage
  onCancelBooking: () => void;
}

export default function MyBookings({ bookingsTrigger, onCancelBooking }: MyBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Reload bookings from localStorage
  useEffect(() => {
    const raw = localStorage.getItem('nikita_spa_bookings');
    if (raw) {
      try {
        setBookings(JSON.parse(raw));
      } catch (err) {
        console.error('Error loading local bookings', err);
      }
    } else {
      setBookings([]);
    }
  }, [bookingsTrigger]);

  const handleDelete = (id: string) => {
    const filtered = bookings.filter((b) => b.id !== id);
    localStorage.setItem('nikita_spa_bookings', JSON.stringify(filtered));
    setBookings(filtered);
    onCancelBooking();
  };

  return (
    <div id="my-bookings-container" className="text-on-surface">
      <AnimatePresence mode="popLayout">
        {bookings.length > 0 ? (
          <div className="space-y-4">
            <span className="text-xs tracking-wider text-[#d0c5af] font-sans font-medium block">
              You have <span className="text-[#f2ca50] font-bold">{bookings.length}</span> active scheduled wellness slots
            </span>
            {bookings.map((booking, idx) => {
              const matchedService = SERVICES.find(s => s.id === booking.serviceId);
              return (
                <motion.div
                  key={booking.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 10 }}
                  transition={{ type: "spring", damping: 20, stiffness: 200 }}
                  className="bg-[#1c1b1b] border border-[#f2ca50]/10 p-4 rounded-lg relative overflow-hidden group hover:border-[#f2ca50]/25 transition-all"
                >
                  {/* Backdrop light aura */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#f2ca50]/[0.02] rounded-full blur-xl pointer-events-none" />

                  <div className="flex justify-between items-start">
                    <div>
                      {/* Booking Title / Service name */}
                      <h4 className="font-serif text-sm md:text-base text-[#f2ca50] font-medium tracking-wide flex items-center gap-1.5">
                        <Sparkles size={14} className="text-[#f2ca50]" />
                        {matchedService ? matchedService.name : booking.serviceId}
                      </h4>
                      
                      {/* Name of visitor */}
                      <p className="text-xs text-[#d0c5af] font-sans mt-0.5">
                        Guest: <span className="text-[#e5e2e1] font-semibold">{booking.fullName}</span>
                      </p>
                    </div>

                    {/* Delete trigger */}
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="text-red-400/70 hover:text-red-400 hover:bg-red-400/10 p-2 rounded cursor-pointer transition-colors"
                      title="Cancel this Appointment"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Scheduled timings */}
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 items-center text-xs text-[#d0c5af]/80 uppercase font-sans border-t border-[#4d4635]/20 pt-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-[#f2ca50]" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-[#f2ca50]" />
                      {booking.time}
                    </span>
                    <span className="flex items-center gap-1 my-0.5 px-2 py-0.5 text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                      <ShieldCheck size={10} /> Certified Staff Assigned
                    </span>
                  </div>

                  {/* Booking ID reference */}
                  <div className="mt-2 text-[9px] font-mono text-[#d0c5af]/40">
                    DIAL REF: {booking.id}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 bg-[#1c1b1b] border border-[#f2ca50]/5 rounded-lg flex flex-col items-center justify-center space-y-4"
          >
            <Smile size={32} className="text-[#d0c5af]/30" />
            <div className="space-y-1">
              <p className="text-[#e5e2e1] text-xs font-semibold">No bookings scheduled yet</p>
              <p className="text-[#d0c5af]/60 text-[11px] max-w-xs mx-auto px-4 leading-normal">
                Choose one of our premium massages or luxury packages in the sections below to register your session.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
