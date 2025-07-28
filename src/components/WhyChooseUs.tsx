import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Check, Award, Users, Lock, Briefcase, BarChart2, Target } from 'lucide-react';

const benefits = [
  {
    icon: <Award className="w-6 h-6" />,
    title: "Proven Track Record",
    description: "Proven track record of successful, high-value ventures."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Expert Team",
    description: "Multidisciplinary team with cross-sectoral expertise."
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Exclusive Access",
    description: "Access to off-market, high-barrier investment opportunities."
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Strong Governance",
    description: "Strong governance and risk management framework."
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: "Institutional-Grade Assets",
    description: "Exclusive access to institutional-grade assets typically unavailable to retail investors."
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Tailored Strategies",
    description: "Client-centric strategies tailored to personal investment goals and risk appetite."
  }
];

export const WhyChooseUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % benefits.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const visibleBenefits = [
    benefits[currentIndex],
    benefits[(currentIndex + 1) % benefits.length],
    benefits[(currentIndex + 2) % benefits.length]
  ];

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      if (newIndex >= benefits.length) return 0;
      if (newIndex < 0) return benefits.length - 1;
      return newIndex;
    });
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Celestia Capitals?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our commitment to excellence and client success sets us apart in the investment landscape
          </p>
        </motion.div>

      <div 
        className="relative max-w-4xl mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-96 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {visibleBenefits.map((benefit, idx) => (
                <motion.div 
                  key={`${currentIndex}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: idx * 0.1 }
                  }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400 mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button 
          onClick={() => navigate(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-700"
          aria-label="Previous benefit"
        >
          ❮
        </button>
        <button 
          onClick={() => navigate(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-700"
          aria-label="Next benefit"
        >
          ❯
        </button>

        <div className="flex justify-center mt-8 space-x-2">
          {benefits.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === idx ? 'bg-blue-600 w-8' : 'bg-gray-300 dark:bg-gray-700'
              }`}
              aria-label={`Go to benefit ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

export default WhyChooseUs;
