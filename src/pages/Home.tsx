import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import showsData from '../data/shows.json';
import Countdown from '../components/Countdown';
import TeaserVideo from '../components/TeaserVideo';
import FloatingCTA from '../components/FloatingCTA';
import ExitPopup from '../components/ExitPopup';
import TicketCard from '../components/TicketCard';
import { format } from 'date-fns';

const Home = () => {
  const navigate = useNavigate();
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Get featured/upcoming shows
  const featuredShows = showsData.shows.filter((show) => show.featured);
  const nextShow = showsData.shows[0]; // First show is the next one

  const handleBookClick = (slug?: string) => {
    if (slug) {
      navigate(`/shows#${slug}`);
    } else {
      navigate('/shows');
    }
  };

  // Track mouse for exit intent
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowExitPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-parchment-50">
      {/* Hero Section - Enhanced for Mobile & Desktop */}
      <section className="relative h-screen min-h-[600px] md:min-h-[700px] lg:min-h-screen flex items-center justify-center overflow-hidden">
        <TeaserVideo
          videoUrl={nextShow.videoUrl || undefined}
          posterImage={nextShow.image}
          autoplay={true}
          loop={true}
        />

        {/* Enhanced Overlay Gradient */}
        <div className="cinematic-overlay" />

        {/* Content Overlay - Better mobile spacing */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
            style={{
              transform: window.innerWidth > 768 ? `translate(${mousePosition.x}px, ${mousePosition.y}px)` : 'none',
            }}
          >
            {/* Urgency Badge - Enhanced mobile styling */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-4 md:mb-6"
            >
              <span className="bg-primary-700/95 backdrop-blur-md text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-semibold animate-pulse flex items-center gap-2 shadow-xl border border-primary-500/30">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="whitespace-nowrap">Limited Seats. Reserve Your Story.</span>
              </span>
            </motion.div>

            {/* Main Headline - Better mobile typography with 3D effect */}
            <div className="perspective-3d" style={{ perspective: '1000px' }}>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 lg:mb-8 leading-[1.1] md:leading-tight text-shadow-xl px-2 text-3d-glow animate-float-3d"
              >
                {nextShow.title}
              </motion.h1>
            </div>

            {/* Countdown - Better mobile layout */}
            <div className="mb-6 md:mb-8 lg:mb-10 flex justify-center px-2">
              <Countdown
                targetDate={nextShow.date}
                targetTime={nextShow.time}
              />
            </div>

            {/* CTA Buttons - Enhanced mobile touch targets with 3D effects */}
            <div className="perspective-3d" style={{ perspective: '1000px' }}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4 mb-8 md:mb-12"
              >
                <motion.button
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={typeof window !== 'undefined' && window.innerWidth > 768 ? { 
                    scale: 1.08,
                    rotateY: 5,
                    rotateX: 5,
                    boxShadow: "0 20px 40px rgba(217, 119, 68, 0.4)",
                    transition: { type: "spring", stiffness: 300 }
                  } : { scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={() => handleBookClick(nextShow.slug)}
                  className="w-full sm:w-auto bg-gradient-to-r from-primary-600 via-primary-500 to-story-600 text-white font-semibold py-4 px-6 md:py-5 md:px-10 rounded-lg md:rounded-xl text-base md:text-lg lg:text-xl shadow-2xl hover:shadow-primary-600/30 transition-all duration-300 flex items-center justify-center gap-3 min-h-[56px] md:min-h-[64px] touch-manipulation border border-primary-500/20 magnetic gradient-animate"
                >
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Book Your Ticket Now
                </motion.span>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
                </motion.div>
              </motion.button>
              <motion.button
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                whileHover={typeof window !== 'undefined' && window.innerWidth > 768 ? { 
                  scale: 1.05,
                  rotateY: -3,
                  rotateX: 3,
                  transition: { type: "spring", stiffness: 300 }
                } : { scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: 'preserve-3d' }}
                onClick={() => navigate('/shows')}
                className="w-full sm:w-auto bg-parchment-100/20 backdrop-blur-md text-white font-semibold py-4 px-6 md:py-5 md:px-10 rounded-lg md:rounded-xl text-base md:text-lg lg:text-xl border-2 border-parchment-200/50 hover:bg-parchment-100/30 transition-all duration-300 min-h-[56px] md:min-h-[64px] touch-manipulation magnetic"
              >
                View All Shows
              </motion.button>
            </motion.div>
            </div>

            {/* Social Proof - Better mobile layout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-6 text-white/90 text-sm md:text-base lg:text-lg"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                <span className="whitespace-nowrap">
                  {showsData.influencer.followerCount.toLocaleString()} followers
                </span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="whitespace-nowrap">
                  {showsData.shows.reduce(
                    (sum, show) => sum + (show.totalSeats - show.availableSeats),
                    0
                  )}{' '}
                  tickets sold
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Better mobile visibility */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs md:text-sm font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Featured Shows Section - Enhanced spacing */}
      <section className="section-padding bg-parchment-50">
        <div className="container mx-auto container-mobile">
          <div className="perspective-3d" style={{ perspective: '1000px' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-center mb-8 md:mb-12 lg:mb-16"
            >
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-3 md:mb-4 lg:mb-6 text-3d"
                whileInView={{ scale: [1, 1.05, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                Upcoming Shows
              </motion.h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-story-700 max-w-2xl mx-auto px-4 leading-relaxed">
                Immerse yourself in captivating narratives. Reserve your place at these intimate storytelling experiences.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featuredShows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <TicketCard
                  {...show}
                  onBookClick={handleBookClick}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8 md:mt-12 lg:mt-16"
          >
            <button
              onClick={() => navigate('/shows')}
              className="btn-primary text-base md:text-lg lg:text-xl px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 inline-flex items-center gap-2"
            >
              View All Shows
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Floating CTA */}
      <FloatingCTA onBookClick={() => handleBookClick()} />

      {/* Exit Popup */}
      {showExitPopup && (
        <ExitPopup onClose={() => setShowExitPopup(false)} />
      )}
    </div>
  );
};

export default Home;