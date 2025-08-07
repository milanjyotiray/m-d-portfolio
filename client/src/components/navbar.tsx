import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-effect' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold gradient-text">Milan & Dhiraj</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => scrollToSection('home')} className="hover:text-blue-primary transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="hover:text-blue-primary transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="hover:text-blue-primary transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-blue-primary transition-colors">
                Projects
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="hover:text-blue-primary transition-colors">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-blue-primary transition-colors">
                Contact
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`md:hidden bg-dark-secondary ${isOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button onClick={() => scrollToSection('home')} className="block px-3 py-2 hover:text-blue-primary transition-colors">
            Home
          </button>
          <button onClick={() => scrollToSection('about')} className="block px-3 py-2 hover:text-blue-primary transition-colors">
            About
          </button>
          <button onClick={() => scrollToSection('services')} className="block px-3 py-2 hover:text-blue-primary transition-colors">
            Services
          </button>
          <button onClick={() => scrollToSection('projects')} className="block px-3 py-2 hover:text-blue-primary transition-colors">
            Projects
          </button>
          <button onClick={() => scrollToSection('testimonials')} className="block px-3 py-2 hover:text-blue-primary transition-colors">
            Testimonials
          </button>
          <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 hover:text-blue-primary transition-colors">
            Contact
          </button>
        </div>
      </motion.div>
    </motion.nav>
  );
}
