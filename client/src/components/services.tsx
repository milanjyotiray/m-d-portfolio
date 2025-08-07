import { motion } from "framer-motion";
import { FaCode, FaPalette, FaRobot, FaPaintBrush, FaChartLine, FaSearch, FaHashtag, FaRocket } from "react-icons/fa";
import { FaWordpress } from "react-icons/fa";
import { useState } from "react";
import ServiceModal from "./service-modal";

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const services = [
    {
      id: "website-dev",
      title: "Website Development",
      description: "Custom websites built with modern technologies like React, Next.js, and more.",
      icon: FaCode,
      gradient: "from-blue-primary to-blue-secondary"
    },
    {
      id: "uiux-design",
      title: "UI/UX Design",
      description: "Beautiful and functional designs that provide excellent user experiences.",
      icon: FaPalette,
      gradient: "from-purple-accent to-blue-secondary"
    },
    {
      id: "ai-chatbot",
      title: "AI Chatbot Integration",
      description: "Smart chatbots powered by AI to enhance customer engagement.",
      icon: FaRobot,
      gradient: "from-green-500 to-blue-primary"
    },
    {
      id: "wordpress-dev",
      title: "WordPress Development",
      description: "Custom WordPress sites with modern themes and powerful functionality.",
      icon: FaWordpress,
      gradient: "from-blue-600 to-purple-accent"
    },
    {
      id: "branding",
      title: "Branding & Logo Design",
      description: "Complete brand identity solutions including logo design and brand guidelines.",
      icon: FaPaintBrush,
      gradient: "from-pink-500 to-purple-accent"
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns to grow your online presence.",
      icon: FaChartLine,
      gradient: "from-orange-500 to-pink-500"
    },
    {
      id: "seo",
      title: "SEO Optimization",
      description: "Improve your website's search engine rankings and organic traffic.",
      icon: FaSearch,
      gradient: "from-teal-500 to-green-500"
    },
    {
      id: "social-media",
      title: "Social Media Management",
      description: "Comprehensive social media strategy and content management services.",
      icon: FaHashtag,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "landing-pages",
      title: "Landing Pages for Startups",
      description: "High-converting landing pages designed specifically for startup growth.",
      icon: FaRocket,
      gradient: "from-indigo-500 to-blue-primary"
    }
  ];

  return (
    <section id="services" className="py-20 bg-dark-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From web development to digital marketing, we've got you covered
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card p-8 rounded-2xl border border-gray-700 hover:border-blue-primary/50 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              onClick={() => setSelectedService(service.id)}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-6`}>
                <service.icon className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <div className="flex items-center text-blue-primary font-semibold">
                Learn More
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceModal
          serviceId={selectedService}
          services={services}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}
