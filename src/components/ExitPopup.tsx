import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Bell } from 'lucide-react';

interface ExitPopupProps {
  onClose: () => void;
}

const ExitPopup = ({ onClose }: ExitPopupProps) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Placeholder - would normally send to backend
      console.log('Email submitted:', email);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <AnimatePresence>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">You're In!</h3>
            <p className="text-gray-600">
              We'll notify you about early access to the next show.
            </p>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full relative shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-story-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Don't Miss Out!
            </h2>
            <p className="text-gray-600">
              Get early access to tickets and exclusive updates about upcoming shows.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors bg-white"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-story-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 border border-primary-500/20"
            >
              Get Early Access
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full text-gray-500 hover:text-gray-700 py-2 transition-colors"
            >
              No thanks, I'll pass
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ExitPopup;
