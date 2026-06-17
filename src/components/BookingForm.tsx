import React, { useState } from 'react';
import { SERVICES, WELLNESS_PACKAGES } from '../data';
import { Booking } from '../types';
import { Calendar, Clock, User, Phone, Sparkles, CheckCircle, Gift, Sliders, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingFormProps {
  onBookingSuccess: (newBooking: Booking) => void;
  initialServiceId?: string;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export default function BookingForm({ onBookingSuccess, initialServiceId = '', isModal = false, onCloseModal }: BookingFormProps) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceId, setServiceId] = useState(initialServiceId || SERVICES[0].id);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  // Custom interactive enhancements
  const [pressurePreference, setPressurePreference] = useState<'Light' | 'Medium' | 'Firm'>('Medium');
  const [vipSuite, setVipSuite] = useState(false);
  const [aromaticSteam, setAromaticSteam] = useState(false);
  const [organicOil, setOrganicOil] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  // Calculate live total price
  const selectedService = SERVICES.find(s => s.id === serviceId);
  const basePrice = selectedService ? selectedService.price : 1499;
  const upgradeCost = (vipSuite ? 999 : 0) + (aromaticSteam ? 499 : 0) + (organicOil ? 399 : 0);
  const totalPrice = basePrice + upgradeCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneNumber || !date || !time) {
      alert('Please fill out all required fields to register your session.');
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury booking pipeline
    setTimeout(() => {
      const newBooking: Booking = {
        id: 'book-' + Date.now().toString(36),
        fullName,
        phoneNumber,
        serviceId,
        date,
        time,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      };

      // Store in localStorage directly so local portals instantly sync!
      const currentRaw = localStorage.getItem('nikita_spa_bookings');
      const currentList: Booking[] = currentRaw ? JSON.parse(currentRaw) : [];
      currentList.unshift(newBooking);
      localStorage.setItem('nikita_spa_bookings', JSON.stringify(currentList));

      setIsSubmitting(false);
      setSuccessBooking(newBooking);
      onBookingSuccess(newBooking);

      // Clean inputs
      setFullName('');
      setPhoneNumber('');
    }, 1200);
  };

  const handleReset = () => {
    setSuccessBooking(null);
    if (isModal && onCloseModal) {
      onCloseModal();
    }
  };

  return (
    <div id="booking-form-wrapper" className="w-full text-[#e5e2e1]">
      <AnimatePresence mode="wait">
        {!successBooking ? (
          <motion.form
            id="spa-booking-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Full Name */}
            <div id="form-field-name">
              <label id="lbl-name" className="block text-xs font-semibold tracking-widest text-[#f2ca50] mb-2 uppercase font-sans">
                Full Name *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#d0c5af]/50 pointer-events-none">
                  <User size={18} />
                </span>
                <input
                  id="input-fullname"
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 bg-transparent border-b border-[#4d4635] focus:border-[#f2ca50] outline-none py-3 text-on-surface font-sans transition-colors focus:ring-0 placeholder-[#d0c5af]/30"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div id="form-field-phone">
              <label id="lbl-phone" className="block text-xs font-semibold tracking-widest text-[#f2ca50] mb-2 uppercase font-sans">
                Phone Number *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#d0c5af]/50 pointer-events-none">
                  <Phone size={18} />
                </span>
                <input
                  id="input-phone"
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-10 pr-4 bg-transparent border-b border-[#4d4635] focus:border-[#f2ca50] outline-none py-3 text-on-surface font-sans transition-colors focus:ring-0 placeholder-[#d0c5af]/30"
                />
              </div>
            </div>

            {/* Service & Pack Selection */}
            <div id="form-field-service" className="space-y-4">
              <div>
                <label id="lbl-service" className="block text-xs font-semibold tracking-widest text-[#f2ca50] mb-2 uppercase font-sans">
                  Select Signature Treatment *
                </label>
                <div className="relative">
                  <select
                    id="select-service-choice"
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full bg-[#1c1b1b] border-b border-[#4d4635] focus:border-[#f2ca50] outline-none py-3 px-2 text-on-surface appearance-none font-sans transition-colors rounded-none cursor-pointer"
                  >
                    <optgroup label="Physical Massage Therapies" className="bg-[#1c1b1b] text-on-surface">
                      {SERVICES.filter(s => s.category !== 'Add-on Treatment').map((serv) => (
                        <option key={serv.id} value={serv.id}>
                          {serv.name} (₹{serv.price}) — {serv.duration} mins
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Add-on & Exfoliation" className="bg-[#1c1b1b] text-on-surface">
                      {SERVICES.filter(s => s.category === 'Add-on Treatment').map((serv) => (
                        <option key={serv.id} value={serv.id}>
                          {serv.name} (₹{serv.price})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#d0c5af]/50 pointer-events-none">
                    <ChevronDown size={18} />
                  </span>
                </div>
              </div>

              {/* Service description preview card */}
              {selectedService && (
                <div className="p-3 bg-[#131313]/90 rounded border border-[#f2ca50]/10 text-xs text-[#d0c5af] flex items-start gap-2.5">
                  <Sparkles size={14} className="text-[#f2ca50] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#f2ca50] font-medium mr-1.5">{selectedService.category}:</span>
                    {selectedService.description}
                  </div>
                </div>
              )}
            </div>

            {/* Date & Time Grid */}
            <div id="form-date-time-grid" className="grid grid-cols-2 gap-4">
              <div id="date-picker-div">
                <label id="lbl-date" className="block text-xs font-semibold tracking-widest text-[#f2ca50] mb-2 uppercase font-sans">
                  Preferred Date *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#d0c5af]/50 pointer-events-none">
                    <Calendar size={16} />
                  </span>
                  <input
                    id="input-date"
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-2 bg-transparent border-b border-[#4d4635] focus:border-[#f2ca50] outline-none py-2 text-xs md:text-sm text-on-surface font-sans transition-colors cursor-pointer"
                  />
                </div>
              </div>

              <div id="time-picker-div">
                <label id="lbl-time" className="block text-xs font-semibold tracking-widest text-[#f2ca50] mb-2 uppercase font-sans">
                  Preferred Time *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#d0c5af]/50 pointer-events-none">
                    <Clock size={16} />
                  </span>
                  <input
                    id="input-time"
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-9 pr-2 bg-transparent border-b border-[#4d4635] focus:border-[#f2ca50] outline-none py-2 text-xs md:text-sm text-on-surface font-sans transition-colors cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Custom Spa Preferences section (The Premium Feeling) */}
            <div id="premium-options" className="pt-4 border-t border-[#4d4635]/30 space-y-4">
              <h5 className="text-[#f2ca50] text-xs font-semibold tracking-widest uppercase flex items-center gap-1.5">
                <Sliders size={14} /> Personalize Your Escape
              </h5>

              {/* Massage pressure control */}
              <div>
                <span className="text-[11px] text-[#d0c5af] block mb-2">Therapy Massage Pressure: {pressurePreference}</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['Light', 'Medium', 'Firm'] as const).map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => setPressurePreference(pref)}
                      className={`py-1.5 px-3 text-xs border text-center cursor-pointer font-sans transition-all duration-300 ${
                        pressurePreference === pref
                          ? 'bg-[#f2ca50]/15 text-[#f2ca50] border-[#f2ca50]'
                          : 'border-[#4d4635] text-[#d0c5af] hover:bg-white/5'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkbox upgrades */}
              <div className="space-y-2 pt-1 font-sans text-xs">
                {/* VIP Suite Upgrades */}
                <label className="flex items-center gap-3 cursor-pointer group text-[#d0c5af] select-none">
                  <input
                    type="checkbox"
                    checked={vipSuite}
                    onChange={(e) => setVipSuite(e.target.checked)}
                    className="accent-[#f2ca50] cursor-pointer"
                  />
                  <span className="group-hover:text-white transition-colors">
                    Upgrade to Private VIP Suite <span className="text-[#f2ca50] font-medium">(+₹999)</span>
                  </span>
                </label>

                {/* Steam Addon */}
                <label className="flex items-center gap-3 cursor-pointer group text-[#d0c5af] select-none">
                  <input
                    type="checkbox"
                    checked={aromaticSteam}
                    onChange={(e) => setAromaticSteam(e.target.checked)}
                    className="accent-[#f2ca50] cursor-pointer"
                  />
                  <span className="group-hover:text-white transition-colors">
                    Add Warm Aromatic Steam Bath <span className="text-[#f2ca50] font-medium">(+₹499)</span>
                  </span>
                </label>

                {/* Premium Organic Oils */}
                <label className="flex items-center gap-3 cursor-pointer group text-[#d0c5af] select-none">
                  <input
                    type="checkbox"
                    checked={organicOil}
                    onChange={(e) => setOrganicOil(e.target.checked)}
                    className="accent-[#f2ca50] cursor-pointer"
                  />
                  <span className="group-hover:text-white transition-colors">
                    Use 100% Extract Golden Almond Essential Oils <span className="text-[#f2ca50] font-medium">(+₹399)</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Sumary & Price indicator */}
            <div className="flex justify-between items-center bg-[#0e0e0e] px-4 py-3 border border-[#f2ca50]/20 rounded-md">
              <span className="text-xs text-[#d0c5af] font-serif pr-2">Expected Session Price:</span>
              <span className="text-lg font-serif text-[#f2ca50] font-bold">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Request Callback Trigger */}
            <button
              id="booking-submit-button"
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#f2ca50] text-[#3c2f00] py-4 rounded font-semibold text-xs tracking-[0.2em] font-sans hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#3c2f00] border-t-transparent rounded-full animate-spin"></div>
                  SCHEDULING SESSION...
                </>
              ) : (
                <>CONFIRM APPOINTMENT</>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            id="booking-success-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-6 flex flex-col items-center"
          >
            <div className="p-4 bg-[#f2ca50]/10 border border-[#f2ca50]/30 rounded-full text-[#f2ca50]">
              <CheckCircle size={40} className="animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#f2ca50] tracking-wide">Appointment Registered!</h3>
              <p className="font-sans text-xs text-[#d0c5af] max-w-sm">
                Thank you, <span className="text-white font-medium">{successBooking.fullName}</span>. Your luxury wellness escape is provisionally confirmed.
              </p>
            </div>

            <div className="p-4 bg-[#1c1b1b] rounded-lg border border-[#f2ca50]/15 w-full font-sans text-xs space-y-2.5 text-left divide-y divide-[#4d4635]/20 max-w-sm">
              <div className="pb-2.5 flex justify-between">
                <span className="text-[#d0c5af]">Session Treatment:</span>
                <span className="text-white font-medium">
                  {SERVICES.find(s => s.id === successBooking.serviceId)?.name || successBooking.serviceId}
                </span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#d0c5af]">Booking ID:</span>
                <span className="text-[#f2ca50] font-mono">{successBooking.id}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#d0c5af]">Scheduled Date:</span>
                <span className="text-white font-medium">{successBooking.date}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#d0c5af]">Scheduled Time:</span>
                <span className="text-white font-medium">{successBooking.time}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-[#d0c5af]">Calculated Cost:</span>
                <span className="text-[#f2ca50] font-bold">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 flex justify-between items-center text-[10px] text-green-400">
                <span className="flex items-center gap-1">
                  <CheckCircle size={10} /> Certified Therapist Assigned
                </span>
                <span>Standby status</span>
              </div>
            </div>

            <p className="text-[11px] text-[#d0c5af]/70 italic max-w-xs leading-normal">
              We have dispatched a welcome reminder. Our representative will call you back shortly at <span className="font-semibold text-[#f2ca50]">{successBooking.phoneNumber}</span> to coordinate your arrival.
            </p>

            <button
              id="booking-reset-btn"
              onClick={handleReset}
              className="bg-transparent border border-[#f2ca50] text-[#f2ca50] px-8 py-2.5 rounded text-xs font-semibold tracking-wider hover:bg-[#f2ca50]/10 transition-colors cursor-pointer uppercase"
            >
              {isModal ? 'Close Window' : 'Book Another Treatment'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
