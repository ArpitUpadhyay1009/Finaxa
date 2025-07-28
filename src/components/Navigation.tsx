import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference or use system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Update the HTML class and save preference when dark mode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Platform', href: '#platform' },
    { label: 'Services', href: '#services' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-card' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-primary-foreground font-bold text-sm">CC</span>
            </div>
            <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
              Celestia Capitals
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-smooth relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={darkMode ? 'moon' : 'sun'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="flex items-center justify-center w-5 h-5"
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Sign In
            </Button>
            <Button size="sm" className="shadow-glow">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-card">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  className="block text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-smooth py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border/50 space-y-3">
                <div className="flex justify-center py-2">
                  <button
                    onClick={() => {
                      toggleDarkMode();
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={darkMode ? 'moon-mobile' : 'sun-mobile'}
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="flex items-center justify-center w-5 h-5"
                      >
                        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </div>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Sign In
                </Button>
                <Button className="w-full shadow-glow">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};