import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: "CELESTIA CAPITALS",
    subtitle: "YOUR TRUSTED PARTNER IN FINANCIAL GROWTH",
    description: "Expert financial solutions tailored to help you achieve your investment goals and secure your financial future.",
    bgImage: "https://images.unsplash.com/photo-1462007895615-c8c073bebcd8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Get Started",
    features: [
      "Investment Management",
      "Financial Planning",
      "Wealth Management"
    ]
  },
  {
    title: "Personalized Investment Strategies",
    subtitle: "Tailored to Your Financial Goals",
    description: "Our expert advisors create customized investment plans designed to maximize returns while managing risk.",
    bgImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonText: "Learn More",
    features: [
      "Retirement Planning",
      "Tax-Efficient Investing",
      "Estate Planning"
    ]
  },
  {
    title: "Grow Your Wealth With Confidence",
    subtitle: "Expert Financial Guidance",
    description: "Partner with our experienced team to navigate the complexities of wealth management and investment.",
    bgImage: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?ixlib=rb-4.1.0&auto=format&fit=crop&w=2070&q=80",
    buttonText: "Contact Us",
    features: [
      "Market Analysis",
      "Portfolio Diversification",
      "Risk Management"
    ]
  }
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Use the bgImage from each slide for the background
  const getCurrentBackground = () => {
    return slides[currentSlide].bgImage;
  };

  // Mouse move effect for background parallax only
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };
  
  // Calculate background movement based on mouse position
  const backgroundMovement = {
    x: useTransform(
      useMotionValue(mousePosition.x * 30),
      [-0.5, 0.5],
      ['-5%', '5%']
    ),
    y: useTransform(
      useMotionValue(mousePosition.y * 20),
      [-0.5, 0.5],
      ['-3%', '3%']
    )
  };

  // Scroll-based transforms for background elements only
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  
  // Responsive text sizes using CSS variables
  const responsiveText = {
    title: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
    subtitle: 'text-sm sm:text-base md:text-lg lg:text-xl',
    description: 'text-sm sm:text-base md:text-lg',
    button: 'text-sm sm:text-base md:text-lg',
    feature: 'text-xs sm:text-sm md:text-base'
  };

  // Responsive spacing
  const spacing = {
    section: 'py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32',
    title: 'mb-2 sm:mb-3 md:mb-4 lg:mb-6',
    subtitle: 'mb-4 sm:mb-5 md:mb-6 lg:mb-8',
    description: 'mb-6 sm:mb-8 md:mb-10 lg:mb-12',
    buttons: 'pt-8 sm:pt-10 md:pt-12 lg:pt-16 xl:pt-20',
    buttonGap: 'gap-4 sm:gap-5 md:gap-6',
    features: 'gap-4 sm:gap-5 md:gap-6',
    featureItem: 'px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4'
  };

  // Fade in animation for content
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  } as const;
  
  // Stagger animation for features
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  } as const;
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  } as const;

  // Navigation functions
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen overflow-hidden"
    >
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        <motion.div 
          style={{ 
            x: backgroundMovement.x,
            y: backgroundMovement.y,
            opacity,
            scale: 1.05
          }}
          className="absolute inset-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 z-10" />
          <motion.div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${getCurrentBackground()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              scale: 1.1,
              transition: 'opacity 1s ease-in-out',
              opacity: 1
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              transition: {
                duration: 30,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
          />
          <div className="absolute inset-0 bg-grid-pattern opacity-10 z-20" />
        </motion.div>
      </motion.div>

      {/* Floating 3D Elements */}
      {[1, 2, 3, 4, 5].map((i) => {
        // Responsive size classes for each triangle
        const sizeClassesArr = [
          'w-8 h-8 sm:w-16 sm:h-16 md:w-24 md:h-24',
          'w-10 h-10 sm:w-20 sm:h-20 md:w-28 md:h-28',
          'w-12 h-12 sm:w-24 sm:h-24 md:w-32 md:h-32',
          'w-9 h-9 sm:w-18 sm:h-18 md:w-24 md:h-24',
          'w-7 h-7 sm:w-14 sm:h-14 md:w-20 md:h-20',
        ];
        const sizeClass = sizeClassesArr[i - 1] || 'w-8 h-8 sm:w-16 sm:h-16 md:w-24 md:h-24';
        const depth = i * 0.5;
        return (
          <motion.div
            key={i}
            style={{
              x: mousePosition.x * (i * 15),
              y: mousePosition.y * (i * 15),
              rotate: i * 36,
              transformStyle: 'preserve-3d',
              transform: `translateZ(${depth}px)`,
              transition: 'transform 0.1s ease-out'
            }}
            className={`absolute rounded-lg filter backdrop-blur-sm ${
              i % 2 === 0 ? 'bg-blue-500/30' : 'bg-indigo-500/30'
            } border border-white/10 shadow-lg ${sizeClass}`}
            animate={{
              y: [0, -30, 0],
              rotate: i * 36 + 360,
              boxShadow: [
                '0 0 15px rgba(59, 130, 246, 0.3)',
                '0 0 30px rgba(99, 102, 241, 0.5)',
                '0 0 15px rgba(59, 130, 246, 0.3)'
              ]
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              boxShadow: {
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
            whileHover={{
              scale: 1.2,
              z: 50,
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.8)'
            }}
          />
        );
      })}

      {/* Content Container */}
      <div className="relative h-full w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-full h-full flex items-center justify-center"
          >
            <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
              <div className="w-full max-w-4xl mx-auto text-center space-y-8 px-4 hero-text-white">
                <motion.div variants={fadeInUp} className="text-center">
                  <motion.div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1 
                      variants={fadeInUp}
                      className={`${responsiveText.title} font-bold ${spacing.title} !text-white drop-shadow-lg leading-tight max-w-4xl mx-auto`}
                      style={{ color: 'white' }}
                    >
                      {slides[currentSlide].title}
                    </motion.h1>
                    
                    <motion.h2 
                      variants={fadeInUp}
                      className={`${responsiveText.subtitle} font-medium !text-white ${spacing.subtitle} drop-shadow`}
                      style={{ color: 'white' }}
                    >
                      {slides[currentSlide].subtitle}
                    </motion.h2>
                    
                    <motion.p 
                      variants={fadeInUp}
                      className={`${responsiveText.description} !text-white max-w-2xl mx-auto leading-relaxed ${spacing.description} drop-shadow-md`}
                      style={{ color: 'white' }}
                    >
                      {slides[currentSlide].description}
                    </motion.p>
                  </motion.div>
                </motion.div>

                {/* Features List */}
                <motion.div className="w-full flex justify-center">
                  <motion.ul 
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${spacing.features} w-full max-w-6xl px-4`}
                    variants={container}
                    initial="hidden"
                    animate="visible"
                  >
                  {slides[currentSlide].features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className={`flex items-center justify-center gap-2 ${spacing.featureItem} bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-center hover:bg-white/20 transition-all duration-300`}
                      variants={item}
                      whileHover={{ 
                        y: -5,
                        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="w-2 h-2 flex-shrink-0 rounded-full bg-blue-400" />
                      <span className={`${responsiveText.feature} font-medium !text-white`} style={{ color: 'white' }}>{feature}</span>
                    </motion.li>
                  ))}
                  </motion.ul>
                </motion.div>
                
                <motion.div
                  variants={fadeInUp}
                  className={`flex flex-col sm:flex-row ${spacing.buttonGap} justify-center px-4 ${
                    currentSlide === 0 ? spacing.buttons : 'pt-12'
                  }`}
                >
                  <div className="relative group w-full sm:w-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-indigo-700/70 rounded-xl backdrop-blur-md group-hover:from-blue-600/50 group-hover:to-indigo-700/50 group-hover:backdrop-blur-lg transition-all duration-300 border border-white/20"></div>
                    <Button 
                      size="lg" 
                      className={`relative z-10 ${responsiveText.button} px-6 sm:px-8 py-4 sm:py-5 rounded-xl bg-transparent hover:bg-white/5 transition-colors duration-300 w-full sm:w-auto min-w-[180px] flex items-center justify-center text-white font-semibold [text-shadow:_0_1px_2px_rgb(0_0_0_/_40%)]`}
                    >
                      {slides[currentSlide].buttonText}
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                  <Button 
                    variant="outline"
                    size="lg"
                    className={`${responsiveText.button} px-6 sm:px-8 py-4 sm:py-5 rounded-xl border-2 border-white/20 hover:bg-white/10 hover:text-white transition-all transform hover:-translate-y-0.5 w-full sm:w-auto min-w-[180px] flex items-center justify-center`}
                  >
                    View Services
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/20 backdrop-blur-sm border border-border/50 hover:bg-background/40 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/20 backdrop-blur-sm border border-border/50 hover:bg-background/40 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-blue-400' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>


    </section>
  );
};

export default HeroCarousel;
