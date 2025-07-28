import { motion } from 'framer-motion';
import { Building2, Globe, BarChart3, Shield } from 'lucide-react';

const features = [
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Exclusive Opportunities",
    description: "Access to off-market, high-barrier investment opportunities"
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Global Reach",
    description: "Opportunities across international markets with transparent reporting"
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Risk Management",
    description: "Strong governance and risk management framework"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Wealth Preservation",
    description: "Strategies focused on long-term capital preservation"
  }
];

export const AboutSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="relative bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  About Us
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Our bespoke investment portfolios are built for high-net-worth individuals seeking exclusivity and performance. We provide opportunities across international markets with transparent reporting and access to global exchanges.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  At Celestia Capitals, we specialize in partnering with discerning investors to unlock exceptional opportunities across Real Estate, Aviation & Commodities. Bringing forth nearly a decade's industry expertise, financial capabilities, & operational excellence, we are committed to delivering consistent risk-adjusted returns and preserving generational wealth.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
