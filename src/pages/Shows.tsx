import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';
import showsData from '../data/shows.json';
import TicketCard from '../components/TicketCard';
import FloatingCTA from '../components/FloatingCTA';

const Shows = () => {
  const navigate = useNavigate();
  const [shows, setShows] = useState(showsData.shows);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique cities and categories
  const cities = ['all', ...new Set(showsData.shows.map((show) => show.city))];
  const categories = [
    'all',
    ...new Set(showsData.shows.map((show) => show.category)),
  ];

  useEffect(() => {
    let filtered = showsData.shows;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (show) =>
          show.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          show.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          show.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by city
    if (selectedCity !== 'all') {
      filtered = filtered.filter((show) => show.city === selectedCity);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((show) => show.category === selectedCategory);
    }

    setShows(filtered);
  }, [searchQuery, selectedCity, selectedCategory]);

  const handleBookClick = (slug: string) => {
    navigate(`/booking/${slug}`);
  };

  return (
    <div className="min-h-screen bg-parchment-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary-700 via-story-700 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              All Shows
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Discover storytelling events and reserve your seat
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full md:w-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-purple-600 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {/* Filters (Desktop) */}
            <div className="hidden md:flex gap-4">
              {/* City Filter */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                    className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors appearance-none bg-white"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city === 'all' ? 'All Cities' : city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                    className="pl-10 pr-8 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-600 focus:outline-none transition-colors appearance-none bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Filters Dropdown */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden w-full space-y-4 pt-4 border-t border-gray-200"
              >
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-10 pr-8 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none transition-colors appearance-none bg-white"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city === 'all' ? 'All Cities' : city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-8 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-600 focus:outline-none transition-colors appearance-none bg-white"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Shows Grid */}
      <section className="py-12 bg-parchment-50">
        <div className="container mx-auto px-4">
          {shows.length > 0 ? (
            <>
              <div className="mb-6 text-gray-600">
                Found {shows.length} {shows.length === 1 ? 'show' : 'shows'}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shows.map((show) => (
                  <TicketCard
                    key={show.id}
                    {...show}
                    onBookClick={handleBookClick}
                  />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No shows found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search query
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCity('all');
                  setSelectedCategory('all');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Floating CTA */}
      <FloatingCTA onBookClick={() => navigate('/shows')} />
    </div>
  );
};

export default Shows;
