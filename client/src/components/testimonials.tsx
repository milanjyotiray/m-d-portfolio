import { motion } from "framer-motion";
import TestimonialSwiper from "./testimonial-swiper";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Solutions",
      feedback: "Milan and Dhiraj delivered an exceptional e-commerce platform that exceeded our expectations. Their attention to detail and technical expertise is outstanding.",
      avatar: "#",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Founder, Digital Innovations",
      feedback: "Working with these two was a pleasure. They understood our vision and brought it to life with beautiful design and flawless functionality.",
      avatar: "#",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director, GrowthCo",
      feedback: "The landing page they created for us increased our conversions by 300%. Their expertise in modern web development is impressive.",
      avatar: "#",
      rating: 5
    },
    {
      name: "David Thompson",
      role: "Owner, Local Business Hub",
      feedback: "Professional, reliable, and talented. They delivered our WordPress site on time and within budget. Highly recommended!",
      avatar: "#",
      rating: 5
    },
    {
      name: "Lisa Wang",
      role: "CTO, InnovateTech",
      feedback: "Their AI chatbot integration transformed our customer service. The implementation was smooth and the results were immediate.",
      avatar: "#",
      rating: 5
    },
    {
      name: "James Anderson",
      role: "Founder, Creative Studios",
      feedback: "Amazing work on our brand identity and website. They perfectly captured our vision and delivered beyond expectations.",
      avatar: "#",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-dark-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            What our clients say about working with us
          </p>
        </motion.div>

        <TestimonialSwiper testimonials={testimonials} />
      </div>
    </section>
  );
}
