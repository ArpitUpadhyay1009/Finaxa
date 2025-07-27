import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Plane, Home, BarChart3, Check } from 'lucide-react';

const investments = [
  {
    id: 1,
    title: 'Investment in Aviation',
    amount: 'AED 250,000',
    roi: '26%',
    minInvestment: 'AED 250,000',
    period: '2 years',
    approved: true,
    icon: <Plane className="w-8 h-8 text-blue-500" />
  },
  {
    id: 2,
    title: 'Investment in Real Estate',
    amount: 'AED 2,000,000',
    roi: '20%',
    minInvestment: 'AED 2,000,000',
    period: '5 years',
    approved: true,
    icon: <Home className="w-8 h-8 text-green-500" />
  },
  {
    id: 3,
    title: 'Investment in Commodities',
    amount: 'AED 100,000',
    roi: '32%',
    minInvestment: 'AED 100,000',
    period: '1 year',
    approved: true,
    icon: <BarChart3 className="w-8 h-8 text-amber-500" />
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const InvestmentProducts = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Investment Products
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our exclusive investment opportunities across various high-growth sectors
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {investments.map((investment) => (
            <motion.div key={investment.id} variants={item}>
              <Card className="h-full group hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-t-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-full bg-blue-50 dark:bg-gray-700">
                        {investment.icon}
                      </div>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {investment.roi} ROI
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {investment.title}
                    </h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                      {investment.amount}
                    </p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span>Min. Investment: <span className="font-medium">{investment.minInvestment}</span></span>
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span>Period: <span className="font-medium">{investment.period}</span></span>
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span>Status: <span className="font-medium">{investment.approved ? 'Approved' : 'Pending'}</span></span>
                    </li>
                  </ul>
                  <button className="mt-6 w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-300 transform hover:-translate-y-0.5">
                    Invest Now
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InvestmentProducts;
