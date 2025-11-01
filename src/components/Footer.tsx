import { Link } from 'react-router-dom';
import { Youtube, Instagram, Twitter, Mail } from 'lucide-react';
import showsData from '../data/shows.json';

const Footer = () => {
  const influencer = showsData.influencer;

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-parchment-100">
              Stories with Elena
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Connecting hearts through the power of stories. Every tale matters, every voice deserves to be heard.
            </p>
            <div className="flex gap-4">
              <a
                href={influencer.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={influencer.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={influencer.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={`mailto:contact@${influencer.username.replace('@', '')}.com`}
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shows" className="hover:text-white transition-colors">
                  All Shows
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4 text-sm">
              Get notified about new shows and early access tickets.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Newsletter signup - would integrate with email service');
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-primary-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-primary-600 to-story-600 text-white font-semibold py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-300 border border-primary-500/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Stories with Elena. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            Created by {influencer.name} ({influencer.username})
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;