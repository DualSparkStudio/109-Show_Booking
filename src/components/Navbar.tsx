import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Ticket } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shows', label: 'Shows' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with 3D effect */}
          <div className="perspective-3d" style={{ perspective: '1000px' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Link to="/" className="flex items-center gap-2">
                <motion.div 
                  className="bg-gradient-to-r from-primary-600 to-story-600 p-2 rounded-lg shadow-md"
                  whileHover={typeof window !== 'undefined' && window.innerWidth > 768 ? {
                    rotateY: 360,
                    transition: { duration: 0.6 }
                  } : {}}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Ticket className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </motion.div>
                <motion.span 
                  className="text-xl md:text-2xl font-semibold text-primary-800"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Stories with Elena
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-primary-700'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 to-story-600"
                  />
                )}
              </Link>
            ))}
            <Link
              to="/shows"
              className="btn-primary text-sm md:text-base py-2 px-4 md:py-3 md:px-6"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-primary-600 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-semibold transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-700'
                      : 'text-gray-700 hover:text-primary-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/shows"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-center"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;