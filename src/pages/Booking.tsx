import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, User, Mail, Phone, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import showsData from '../data/shows.json';

const Booking = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the show by slug
  const show = showsData.shows.find((s) => s.slug === slug);

  // Redirect if show not found
  useEffect(() => {
    if (!show) {
      toast.error('Show not found');
      navigate('/shows');
    }
  }, [show, navigate]);

  if (!show) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success(
      `Booking confirmed! ${formData.quantity} ticket${formData.quantity > 1 ? 's' : ''} reserved for ${formData.name}. Confirmation sent to ${formData.email}`,
      { duration: 5000 }
    );
    
    console.log('Booking data:', { show, ...formData });
    
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      quantity: 1,
    });

    // Optionally redirect after successful booking
    // navigate('/shows');
  };

  const totalPrice = show.price * formData.quantity;
  const maxQuantity = Math.min(show.availableSeats, 10); // Max 10 tickets per booking

  return (
    <div className="min-h-screen bg-parchment-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-700 via-story-700 to-primary-800 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Book Your Ticket</h1>
            <p className="text-xl md:text-2xl text-white/90">{show.title}</p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Booking Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Booking Details</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
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
                          className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-semibold text-lg"
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
                          className="w-24 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors text-center font-semibold text-lg"
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
                          className="w-12 h-12 rounded-lg border-2 border-gray-200 hover:border-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-semibold text-lg"
                        >
                          +
                        </button>
                        <span className="text-sm text-gray-600 ml-auto">
                          Max {maxQuantity} tickets
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-story-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-primary-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
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
                </motion.div>
              </div>

              {/* Right Column - Show Details */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-24"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Show Details</h3>

                  {/* Show Image */}
                  <div className="mb-6 rounded-xl overflow-hidden">
                    <img
                      src={show.image}
                      alt={show.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  {/* Show Info */}
                  <div className="space-y-4 mb-6">
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

                    <div className="flex items-center gap-3">
                      <Ticket className="w-5 h-5 text-primary-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Available Seats</p>
                        <p className="text-base font-semibold text-gray-900">
                          {show.availableSeats} / {show.totalSeats}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="border-t border-gray-200 pt-6 space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Price per ticket</span>
                      <span className="font-semibold">
                        {show.currency === 'USD' ? '$' : show.currency}{show.price}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Quantity</span>
                      <span className="font-semibold">{formData.quantity}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold text-primary-700 pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>
                        {show.currency === 'USD' ? '$' : show.currency}{totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;

