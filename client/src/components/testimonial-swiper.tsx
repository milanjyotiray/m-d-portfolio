import { motion } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from "react";

interface Testimonial {
  name: string;
  role: string;
  feedback: string;
  avatar: string;
  rating: number;
}

interface TestimonialSwiperProps {
  testimonials: Testimonial[];
}

export default function TestimonialSwiper({ testimonials }: TestimonialSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  
  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet: 2 items
      } else {
        setItemsPerPage(3); // Desktop: 3 items
      }
    };
    
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);
  
  const maxIndex = Math.max(0, testimonials.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div 
          className="flex gap-8"
          animate={{ x: -currentIndex * (100 / itemsPerPage) + "%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`flex-shrink-0 ${
                itemsPerPage === 1 ? 'w-full' : 
                itemsPerPage === 2 ? 'w-full md:w-1/2' : 
                'w-full md:w-1/2 lg:w-1/3'
              }`}
            >
              <motion.div
                className="bg-dark-secondary p-8 rounded-2xl border border-gray-700 h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % itemsPerPage) * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-500 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.feedback}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={prevSlide}
          disabled={!canGoPrev}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
            canGoPrev 
              ? 'bg-blue-primary hover:bg-blue-secondary text-white' 
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          <FaChevronLeft className="text-sm sm:text-base" />
        </button>
        <button
          onClick={nextSlide}
          disabled={!canGoNext}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
            canGoNext 
              ? 'bg-blue-primary hover:bg-blue-secondary text-white' 
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          <FaChevronRight className="text-sm sm:text-base" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-blue-primary' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}