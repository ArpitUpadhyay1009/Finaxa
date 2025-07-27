import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { TrendingUp, Users, Clock, Phone } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

const stats: Stat[] = [
  {
    value: "$10B+",
    label: "Assets Under Management",
    description: "Committed to growing your wealth",
    icon: <TrendingUp className="w-6 h-6" />,
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    value: "15+",
    label: "Years Experience",
    description: "Proven track record in wealth management",
    icon: <Clock className="w-6 h-6" />,
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    value: "98%",
    label: "Client Retention",
    description: "Satisfied long-term clients",
    icon: <Users className="w-6 h-6" />,
    gradient: "from-amber-500 to-orange-600"
  },
  {
    value: "24/7",
    label: "Dedicated Support",
    description: "Always here for our clients",
    icon: <Phone className="w-6 h-6" />,
    gradient: "from-purple-500 to-fuchsia-600"
  }
];

import type { Variants } from 'framer-motion';

// Animation variants with proper TypeScript types
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isInView) {
      controls.start('show');
    }
  }, [isInView, controls]);

  // Handle mouse move for 3D card effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setHoveredIndex(index);
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / 20);
    const rotateX = ((centerY - y) / 20);
    
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${-rotateY}deg`);
  };

  // Reset card position on mouse leave
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredIndex(null);
    const card = e.currentTarget;
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-background to-muted/5"
      id="stats"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM3NzciIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMCAxLjEwNC0uODk2IDItMiAycy0yLS44OTYtMi0yIC44OTYtMiAyLTIgMiAuODk2IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            show: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
            }
          }}
        >
          <motion.span 
            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wider uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={controls}
            transition={{ delay: 0.2 }}
          >
            Our Impact
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
            initial={{ opacity: 0, y: 10 }}
            animate={controls}
            transition={{ delay: 0.3 }}
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={controls}
            transition={{ delay: 0.4 }}
          >
            Our platform powers investment decisions for the world's most sophisticated financial institutions
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="h-full group relative"
              custom={index}
              variants={item}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              style={{
                '--rotate-x': '0deg',
                '--rotate-y': '0deg',
                '--gradient': stat.gradient,
                transform: 'perspective(1000px) rotateX(var(--rotate-x, 0)) rotateY(var(--rotate-y, 0))',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              } as React.CSSProperties}
            >
              <div className="absolute inset-0.5 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <Card 
                className={`h-full overflow-hidden transition-all duration-300 bg-card/60 backdrop-blur-sm border border-border/30 hover:border-primary/20 relative z-10 ${
                  hoveredIndex === index ? 'shadow-xl' : 'shadow-md'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <CardContent className="p-6 sm:p-8 h-full flex flex-col items-center text-center">
                  <div 
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-6 transition-transform duration-300 group-hover:scale-110`}
                  >
                    {stat.icon}
                  </div>
                  
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent mb-3">
                    {stat.value}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {stat.label}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Subtle hover highlight */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10 blur-xl`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Animated floating elements */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-600/20 blur-3xl -z-10" />
      <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-600/20 blur-3xl -z-10" />
    </section>
  );
};