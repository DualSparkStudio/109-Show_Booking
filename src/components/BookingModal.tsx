import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Ticket, User, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';

interface Show {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  city: string;
  category: string;
  price: number;
  currency: string;
  availableSeats: number;
  totalSeats: number;
}

interface BookingModalProps {
  show: Show | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bookingData: {
    name: string;
    email: string;
    phone: string;
    quantity: number;
  }) => void;
}

const BookingModal = ({ show, isOpen, onClose, onConfirm }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    onConfirm(formData);
    setIsSubmitting(false);
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      quantity: 1,
    });
  };

  const totalPrice = show.price * formData.quantity;
  const maxQuantity = Math.min(show.availableSeats, 10); // Max 10 tickets per booking

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-story-600 text-white p-6 flex items-start justify-between z-10">
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Book Your Ticket</h2>
                  <p className="text-white/90 text-sm md:text-base">{show.title}</p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Show Details */}
                <div className="bg-parchment-50 rounded-xl p-4 md:p-6 mb-6 border border-primary-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Date & Time</p>
                        <p className="text-base font-semibold text-gray-900">
                          {format(new Date(show.date), 'EEEE, MMMM dd, yyyy')}
                        </p>
                        <p className="text-sm text-gray-700">{show.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Location</p>
                        <p className="text-base font-semibold text-gray-900">{show.location}</p>
                        <p className="text-sm text-gray-700">{show.city}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-primary-600" />
                      <span className="text-sm text-gray-600">
                        {show.availableSeats} seats available
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Price per ticket</p>
                      <p className="text-2xl font-bold text-primary-700">
                        {show.currency === 'USD' ? '$' : show.currency}{show.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Tickets
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            quantity: Math.max(1, formData.quantity - 1),
                          })
                        }
                        disabled={formData.quantity <= 1}
                        className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-semibold"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        max={maxQuantity}
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quantity: Math.min(maxQuantity, Math.max(1, parseInt(e.target.value) || 1)),
                          })
                        }
                        className="w-20 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors text-center font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            quantity: Math.min(maxQuantity, formData.quantity + 1),
                          })
                        }
                        disabled={formData.quantity >= maxQuantity}
                        className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-semibold"
                      >
                        +
                      </button>
                      <span className="text-sm text-gray-600 ml-auto">
                        Max {maxQuantity} tickets
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-primary-50 rounded-xl p-4 border-2 border-primary-200">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-700">Total Amount</span>
                      <span className="text-3xl font-bold text-primary-700">
                        {show.currency === 'USD' ? '$' : show.currency}{totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {formData.quantity} ticket{formData.quantity !== 1 ? 's' : ''} × {show.currency === 'USD' ? '$' : show.currency}{show.price}
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-story-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Ticket className="w-5 h-5" />
                          Confirm Booking
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;

