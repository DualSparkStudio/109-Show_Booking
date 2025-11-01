import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface TicketCardProps {
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
  featured?: boolean;
  onBookClick: (slug: string) => void;
}

const TicketCard = ({
  slug,
  title,
  description,
  image,
  date,
  time,
  location,
  city,
  category,
  price,
  currency,
  availableSeats,
  totalSeats,
  featured = false,
  onBookClick,
}: TicketCardProps) => {
  const urgencyLevel = availableSeats / totalSeats;
  const isLowStock = urgencyLevel < 0.2;
  const isSoldOut = availableSeats === 0;

  return (
    <div className="perspective-3d" style={{ perspective: '1000px' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 100
        }}
        whileHover={typeof window !== 'undefined' && window.innerWidth > 768 ? { 
          y: -12,
          rotateX: 5,
          rotateY: 5,
          scale: 1.03,
          transition: { duration: 0.3 }
        } : {}}
        style={{ 
          transformStyle: 'preserve-3d'
        }}
        className={`group relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col card-3d ${
          featured ? 'ring-2 ring-primary-500 border-glow' : ''
        }`}
      >
      {/* Image - Better aspect ratio */}
      <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-t-xl md:rounded-t-2xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-parchment-100/95 backdrop-blur-sm text-primary-800 px-3 py-1 rounded-lg text-sm font-semibold border border-primary-200/50 shadow-sm">
            {category}
          </span>
        </div>

        {/* Urgency Badge */}
        {isLowStock && (
          <div className="absolute top-4 right-4">
            <span className="bg-primary-700 text-white px-3 py-1 rounded-lg text-sm font-semibold animate-pulse shadow-md border border-primary-600/30">
              Only {availableSeats} left!
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {featured && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-gradient-to-r from-primary-600 to-story-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg border border-primary-500/30">
              ✨ Featured Story
            </span>
          </div>
        )}
      </div>

      {/* Content - Better mobile padding */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary-900 mb-2 md:mb-3 group-hover:text-primary-700 transition-all duration-300 line-clamp-2 group-hover:scale-105">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-story-700 mb-3 md:mb-4 line-clamp-3 min-h-[2.5rem] md:min-h-[4rem] flex-grow leading-relaxed">
          {description}
        </p>

        {/* Info Icons */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-story-800">
            <Calendar className="w-4 h-4 text-primary-600" />
            <span className="text-sm md:text-base">
              {format(new Date(date), 'MMM dd, yyyy')} at {time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-story-800">
            <MapPin className="w-4 h-4 text-primary-600" />
            <span className="text-sm md:text-base">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-story-800">
            <Users className="w-4 h-4 text-primary-600" />
            <span className="text-sm md:text-base">
              {availableSeats} of {totalSeats} seats available
            </span>
          </div>
        </div>

        {/* Price and CTA - Better mobile layout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 pt-4 border-t border-gray-200 mt-auto">
          <div className="flex-shrink-0">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              {currency === 'USD' ? '$' : currency} {price}
            </div>
            <div className="text-xs sm:text-sm text-gray-500">per ticket</div>
          </div>
          <button
            onClick={() => onBookClick(slug)}
            disabled={isSoldOut}
            className={`w-full sm:w-auto flex-1 sm:flex-initial py-3 px-4 md:py-3 md:px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 text-sm sm:text-base min-h-[48px] md:min-h-[52px] touch-manipulation ${
              isSoldOut
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-600 to-story-600 text-white hover:shadow-lg hover:shadow-primary-600/30 md:group-hover:scale-105 border border-primary-500/20'
            }`}
          >
            <span>{isSoldOut ? 'Sold Out' : 'Get Ticket'}</span>
            {!isSoldOut && <ArrowRight className="w-4 h-4 md:w-5 md:h-5 md:group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>

        {/* Availability Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(availableSeats / totalSeats) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={`h-2 rounded-full ${
                isLowStock ? 'bg-red-500' : 'bg-green-500'
              }`}
            />
          </div>
        </div>
      </div>
      </motion.div>
    </div>
  );
};

export default TicketCard;