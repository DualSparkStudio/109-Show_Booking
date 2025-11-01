import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, BookOpen, Heart, Mic, Users, UserCircle, User } from 'lucide-react';
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
      navigate(`/booking/${slug}`);
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
              transform: typeof window !== 'undefined' && window.innerWidth > 768 ? `translate(${mousePosition.x}px, ${mousePosition.y}px)` : 'none',
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

      {/* About Influencer Section with Character Animation */}
      <section className="section-padding bg-gradient-to-b from-parchment-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 left-10 w-20 h-20 opacity-10"
          >
            <BookOpen className="w-full h-full text-primary-600" />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute bottom-20 right-10 w-16 h-16 opacity-10"
          >
            <Heart className="w-full h-full text-story-600" />
          </motion.div>
        </div>

        <div className="container mx-auto container-mobile relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Side - Character/Image with Animation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative"
            >
              {/* Animated Character Container */}
              <div className="relative">
                {/* Floating Animation Container */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative z-10"
                >
                  {/* Character Sticker */}
                  <div className="relative w-full max-w-md mx-auto flex items-center justify-center">
                    {/* Sticker Container - No shape constraint */}
                    <motion.div
                      initial={{ scale: 0, rotate: -15 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
                      className="relative"
                    >
                      {/* Character Image Cutout */}
                      {(showsData.influencer as any).image ? (
                        // Cutout-style image (like sticker)
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="relative"
                        >
                          {/* Cutout white border - shows first */}
                          <div className="cutout-border" />
                          <div className="cutout-white-edge" />
                          
                          {/* Main image with cutout effect */}
                          <motion.img 
                            src={(showsData.influencer as any).image} 
                            alt={showsData.influencer.name}
                            animate={{
                              y: [0, -10, 0],
                              rotate: [-2, 2, -2, 0]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            className="w-72 h-72 md:w-96 md:h-96 object-contain cutout-image relative z-10"
                            style={{
                              imageRendering: 'auto',
                              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                              WebkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                            }}
                          />
                          
                          {/* Sticker texture overlay */}
                          <div className="sticker-texture" />
                          {/* Inner highlight for cutout effect */}
                          <div className="cutout-shadow" />
                        </motion.div>
                      ) : (
                        // Animated character cutout (sticker style)
                        <motion.div
                          animate={{
                            y: [0, -10, 0],
                            rotate: [-2, 2, -2, 0]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="relative"
                        >
                          {/* Cutout borders for SVG character */}
                          <div className="cutout-border" />
                          <div className="cutout-white-edge" />
                          
                          {/* Character SVG/Icon as cutout sticker */}
                          <svg 
                            width="300" 
                            height="400" 
                            viewBox="0 0 300 400" 
                            className="w-72 h-96 md:w-96 md:h-[500px] relative z-10 cutout-image"
                            style={{ 
                              imageRendering: 'auto'
                            }}
                          >
                            <defs>
                              <filter id="cutoutShadow">
                                <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3"/>
                                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.2"/>
                              </filter>
                              {/* Gradients */}
                              <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#f4d5c0" />
                                <stop offset="100%" stopColor="#ecb895" />
                              </linearGradient>
                              <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#d97744" />
                                <stop offset="100%" stopColor="#c85f32" />
                              </linearGradient>
                              <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#6d3522" />
                                <stop offset="100%" stopColor="#4a2518" />
                              </linearGradient>
                            </defs>
                            {/* Head */}
                            <motion.ellipse
                              animate={{ scale: [1, 1.02, 1] }}
                              transition={{ duration: 3, repeat: Infinity }}
                              cx="150" 
                              cy="120" 
                              rx="60" 
                              ry="70" 
                              fill="url(#skinGradient)"
                              stroke="#ffffff"
                              strokeWidth="3"
                            />
                            {/* Eyes */}
                            <motion.circle
                              animate={{ scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                              cx="135" 
                              cy="110" 
                              r="8" 
                              fill="#ffffff"
                            />
                            <motion.circle
                              animate={{ scale: [1, 1.2, 1], opacity: [0.9, 1, 0.9] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
                              cx="165" 
                              cy="110" 
                              r="8" 
                              fill="#ffffff"
                            />
                            {/* Smile */}
                            <motion.path
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1, delay: 0.5 }}
                              d="M 120 140 Q 150 160 180 140" 
                              stroke="#ffffff" 
                              strokeWidth="4" 
                              fill="none" 
                              strokeLinecap="round"
                            />
                            {/* Body */}
                            <motion.ellipse
                              animate={{ y: [0, -2, 0] }}
                              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                              cx="150" 
                              cy="240" 
                              rx="50" 
                              ry="80" 
                              fill="url(#bodyGradient)"
                              stroke="#ffffff"
                              strokeWidth="3"
                            />
                            {/* Arms */}
                            <ellipse cx="100" cy="230" rx="15" ry="40" fill="url(#skinGradient)" stroke="#ffffff" strokeWidth="2" />
                            <ellipse cx="200" cy="230" rx="15" ry="40" fill="url(#skinGradient)" stroke="#ffffff" strokeWidth="2" />
                            {/* Hair */}
                            <path d="M 90 80 Q 150 40 210 80 Q 150 60 90 80" fill="url(#hairGradient)" stroke="#ffffff" strokeWidth="2" />
                          </svg>
                          
                          {/* Sticker texture overlay */}
                          <div className="sticker-texture" />
                          {/* Inner highlight for cutout effect */}
                          <div className="cutout-shadow" />
                        </motion.div>
                      )}
                      
                      {/* Floating Sparkles around sticker */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          animate={{
                            x: [
                              0,
                              Math.cos((i * 45) * Math.PI / 180) * 120,
                              Math.cos((i * 45) * Math.PI / 180) * 140,
                              0
                            ],
                            y: [
                              0,
                              Math.sin((i * 45) * Math.PI / 180) * 120,
                              Math.sin((i * 45) * Math.PI / 180) * 140,
                              0
                            ],
                            rotate: [0, 360],
                            opacity: [0.6, 1, 0.8, 0.6],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 4 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2
                          }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                          <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-primary-400" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-8 -right-8 w-32 h-32 opacity-20 pointer-events-none"
                >
                  <BookOpen className="w-full h-full text-primary-400" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-8 -left-8 w-28 h-28 opacity-20 pointer-events-none"
                >
                  <Heart className="w-full h-full text-story-400" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
              className="space-y-6 md:space-y-8"
            >
              {/* Heading */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="inline-block mb-4"
                >
                  <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm md:text-base font-semibold">
                    Meet Your Storyteller
                  </span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-4 md:mb-6"
                >
                  {showsData.influencer.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-story-700 text-lg md:text-xl lg:text-2xl font-medium"
                >
                  {showsData.influencer.username}
                </motion.p>
              </div>

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <p className="text-base md:text-lg lg:text-xl text-story-800 leading-relaxed">
                  {showsData.influencer.bio}
                </p>
              </motion.div>

              {/* Stats with Animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-3 gap-4 md:gap-6 pt-6 border-t border-primary-200"
              >
                {[
                  {
                    icon: Users,
                    label: 'Followers',
                    value: showsData.influencer.followerCount.toLocaleString(),
                    color: 'text-primary-600'
                  },
                  {
                    icon: BookOpen,
                    label: 'Stories',
                    value: showsData.shows.length,
                    color: 'text-story-600'
                  },
                  {
                    icon: Heart,
                    label: 'Events',
                    value: showsData.shows.filter(s => s.status === 'upcoming').length,
                    color: 'text-primary-500'
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-4 md:p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-primary-100"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      className={`inline-block mb-2 md:mb-3 ${stat.color}`}
                    >
                      <stat.icon className="w-6 h-6 md:w-8 md:h-8" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="text-2xl md:text-3xl font-bold text-primary-900 mb-1"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs md:text-sm text-story-700 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/about')}
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  Learn More About Elena
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
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