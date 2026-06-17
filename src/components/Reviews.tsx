import React, { useState, useEffect } from 'react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data';
import { Star, MessageSquare, Plus, CheckCircle, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [source, setSource] = useState('Verified Guest');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  // Load reviews on initial load
  useEffect(() => {
    const raw = localStorage.getItem('nikita_spa_reviews');
    if (raw) {
      try {
        setReviews(JSON.parse(raw));
      } catch (err) {
        console.error('Error parsing reviews, reverting to defaults', err);
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('nikita_spa_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) {
      alert('Please fill out a name and a small description of your wellness experience.');
      return;
    }

    const newReview: Review = {
      id: 'rev-' + Date.now().toString(36),
      author,
      comment,
      rating,
      source,
      date: 'Just now'
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('nikita_spa_reviews', JSON.stringify(updated));

    // Reset fields
    setAuthor('');
    setComment('');
    setRating(5);
    setSource('Verified Guest');
    setIsFormOpen(false);

    setJustSubmitted(true);
    setTimeout(() => {
      setJustSubmitted(false);
    }, 4000);
  };

  // Helper code to map a star quantity
  const renderStars = (count: number, size = 14, interactive = false, onSelect?: (r: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = star <= count;
          return (
            <Star
              key={star}
              size={size}
              onClick={() => interactive && onSelect && onSelect(star)}
              className={`${
                active ? 'text-[#f2ca50] fill-[#f2ca50]' : 'text-[#4d4635] fill-transparent'
              } ${interactive ? 'cursor-pointer hover:scale-115 transition-transform' : ''}`}
            />
          );
        })}
      </div>
    );
  };

  // Calculate stats
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <div id="spa-reviews-module" className="space-y-12">
      {/* Testimonials Header Metrics */}
      <div id="reviews-header-panel" className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-[#1c1b1b] border border-[#f2ca50]/10 p-6 rounded-lg">
        {/* Metric 1 */}
        <div className="text-center md:text-left space-y-1 border-r border-[#4d4635]/25 last:border-0 md:pr-4">
          <span className="text-xs tracking-widest text-[#d0c5af] font-sans uppercase">Cumulative Rating</span>
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="font-serif text-3xl md:text-4xl text-[#f2ca50] font-bold">{averageRating}</span>
            <span className="text-xs text-[#d0c5af]">/ 5.0</span>
          </div>
          <div className="flex justify-center md:justify-start">
            {renderStars(Math.round(parseFloat(averageRating)), 16)}
          </div>
        </div>

        {/* Metric 2 */}
        <div className="text-center space-y-1 border-r border-[#4d4635]/25 last:border-0 md:px-4">
          <span className="text-xs tracking-widest text-[#d0c5af] font-sans uppercase">Verified Guest Reviews</span>
          <div className="font-serif text-3xl md:text-4xl text-white font-bold">{reviews.length}</div>
          <p className="text-[10px] text-[#d0c5af]/60 font-sans">Collected from Google, Local Guides, and Spa feedback cards</p>
        </div>

        {/* Metric 3 / Call to Action */}
        <div className="text-center md:text-right md:pl-4">
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex items-center gap-2 bg-[#f2ca50]/10 border border-[#f2ca50] text-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#3c2f00] px-5 py-2.5 rounded text-xs font-semibold tracking-wider transition-colors cursor-pointer"
          >
            <Plus size={14} />
            SHARE YOUR EXPERIENCE
          </button>
        </div>
      </div>

      {/* Write a Review Overlay Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            id="review-form-block"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-[#1c1b1b]/50 border border-[#f2ca50]/20 p-6 rounded-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="font-serif text-[#f2ca50] text-sm tracking-widest uppercase mb-4">Post Spa Review</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-[#f2ca50] tracking-wider uppercase mb-1.5 font-sans">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jessica Mills"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-transparent border-b border-[#4d4635] focus:border-[#f2ca50] outline-none py-2 text-xs font-sans text-white focus:ring-0"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#f2ca50] tracking-wider uppercase mb-1.5 font-sans">Guest Status</label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full bg-[#1c1b1b] border-b border-[#4d4635] focus:border-[#f2ca50] outline-none py-2 text-xs font-sans text-[#d0c5af]"
                  >
                    <option value="Verified Guest">Verified Guest</option>
                    <option value="Local Guide">Local Guide</option>
                    <option value="Executive Club Member">Executive Club Member</option>
                    <option value="Google Reviewer">Google Reviewer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#f2ca50] tracking-wider uppercase mb-1.5 font-sans">Set Experience Rating</label>
                <div className="flex items-center gap-2">
                  {renderStars(rating, 20, true, (newRating) => setRating(newRating))}
                  <span className="text-xs text-[#d0c5af] font-sans">({rating} / 5 stars)</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#f2ca50] tracking-wider uppercase mb-1.5 font-sans">Your Review Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the therapists, the hygiene, and the premium wellness rooms at Nikita Spa..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-transparent border border-[#4d4635] focus:border-[#f2ca50] outline-none p-3 text-xs font-sans text-white focus:ring-0 rounded placeholder-[#d0c5af]/30 resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-transparent text-[#d0c5af] hover:text-white px-4 py-2 rounded text-xs font-sans cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#f2ca50] text-[#3c2f00] px-6 py-2 rounded text-xs font-semibold tracking-wider font-sans hover:brightness-110 cursor-pointer"
                >
                  SUBMIT FEEDBACK
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submission success feedback toast */}
      <AnimatePresence>
        {justSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded flex items-center gap-2.5 text-xs font-sans"
          >
            <CheckCircle size={16} />
            Thank you! Your testimonial has been posted and factored into our global scores.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Cards Grid Layout */}
      <div id="reviews-grid-scroller" className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x antialiased">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="min-w-[280px] md:min-w-[380px] max-w-[400px] bg-[#1c1b1b] p-6 md:p-8 snap-center border-l-4 border-[#f2ca50] rounded-r-lg flex flex-col justify-between relative group shadow-lg"
          >
            {/* Absolute decorative quotation mark */}
            <Quote size={40} className="text-[#f2ca50]/[0.03] absolute right-6 top-6 pointer-events-none group-hover:text-[#f2ca50]/[0.06] transition-colors" />

            <div className="space-y-4">
              {/* Star Rating Rendering */}
              <div id="stars-row">
                {renderStars(rev.rating)}
              </div>

              {/* Description comment */}
              <p className="font-sans text-xs md:text-sm italic text-[#e5e2e1] leading-relaxed relative z-10">
                "{rev.comment}"
              </p>
            </div>

            {/* Author and Metadata details */}
            <div className="mt-6 pt-4 border-t border-[#4d4635]/20 flex justify-between items-end">
              <div>
                <div className="font-bold text-[#f2ca50] text-sm font-sans tracking-wide">{rev.author}</div>
                <div className="text-[10px] text-[#d0c5af]/60 font-sans tracking-wider mt-0.5 uppercase">
                  {rev.source}
                </div>
              </div>
              <span className="text-[10px] text-[#d0c5af]/40 font-sans">{rev.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
