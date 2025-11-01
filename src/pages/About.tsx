import { motion } from 'framer-motion';
import { Youtube, Instagram, Twitter, ExternalLink, Star, Quote } from 'lucide-react';
import showsData from '../data/shows.json';

const About = () => {
  const influencer = showsData.influencer;
  const testimonials = influencer.testimonials;

  return (
    <div className="min-h-screen bg-parchment-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 via-story-700 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              About {influencer.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              {influencer.bio}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 bg-white border-t border-primary-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Story
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                {influencer.bio}
              </p>
              <p className="text-lg text-story-800 leading-relaxed mb-4">
                With over {influencer.followerCount.toLocaleString()} followers across
                social media platforms, {influencer.name} has been sharing stories
                that resonate with audiences worldwide. From intimate story nights to
                narrative workshops, each gathering is crafted to create meaningful
                connections through the art of storytelling.
              </p>
              <p className="text-lg text-story-800 leading-relaxed">
                Join us for an unforgettable journey filled with stories that inspire,
                heal, and connect. Every gathering is an opportunity to discover new
                narratives, share your own voice, and become part of a community that
                cherishes the power of stories.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
            >
              <div className="text-center p-6 bg-parchment-100 rounded-xl border border-primary-200/50">
                <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                  {influencer.followerCount.toLocaleString().slice(0, 3)}K+
                </div>
                <div className="text-gray-600">Followers</div>
              </div>
              <div className="text-center p-6 bg-parchment-100 rounded-xl border border-primary-200/50">
                <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                  {showsData.shows.length}
                </div>
                <div className="text-gray-600">Upcoming Shows</div>
              </div>
              <div className="text-center p-6 bg-parchment-100 rounded-xl border border-primary-200/50">
                <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                  {showsData.shows.reduce(
                    (sum, show) => sum + (show.totalSeats - show.availableSeats),
                    0
                  )}
                </div>
                <div className="text-gray-600">Tickets Sold</div>
              </div>
              <div className="text-center p-6 bg-parchment-100 rounded-xl border border-primary-200/50">
                <div className="text-3xl md:text-4xl font-bold text-primary-700 mb-2">
                  5★
                </div>
                <div className="text-gray-600">Avg Rating</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Feeds */}
      <section className="py-20 bg-parchment-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Follow Along
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Catch behind-the-scenes content and updates
            </p>
          </motion.div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {Object.entries(influencer.socialLinks).map(([platform, url]) => (
              <motion.a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-parchment-100 px-6 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary-600"
              >
                {platform === 'youtube' && (
                  <Youtube className="w-6 h-6 text-red-600" />
                )}
                {platform === 'instagram' && (
                  <Instagram className="w-6 h-6 text-pink-600" />
                )}
                {platform === 'twitter' && (
                  <Twitter className="w-6 h-6 text-blue-400" />
                )}
                {platform === 'tiktok' && (
                  <div className="w-6 h-6 bg-black rounded-sm" />
                )}
                <span className="font-semibold text-gray-900 capitalize">
                  {platform}
                </span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </motion.a>
            ))}
          </div>

          {/* Embedded Video Feed Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Latest Videos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* YouTube Embed Placeholder */}
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Youtube className="w-12 h-12 text-red-600 mx-auto mb-2" />
                    <p className="text-gray-600">
                      YouTube embed would go here
                    </p>
                    <a
                      href={influencer.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-700 hover:underline mt-2 inline-block font-semibold"
                    >
                      Visit YouTube Channel
                    </a>
                  </div>
                </div>
                <div className="aspect-video bg-parchment-200 rounded-lg flex items-center justify-center border border-primary-200/50">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-600 rounded-sm mx-auto mb-2" />
                    <p className="text-story-700">TikTok embed would go here</p>
                    <a
                      href={influencer.socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-700 hover:underline mt-2 inline-block font-semibold"
                    >
                      Visit TikTok Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white border-t border-primary-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Fans Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real experiences from real fans
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-parchment-100 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-primary-200/50"
              >
                <Quote className="w-8 h-8 text-primary-700 mb-4" />
                <p className="text-story-800 mb-4 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-primary-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-story-600">
                      {new Date(testimonial.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
