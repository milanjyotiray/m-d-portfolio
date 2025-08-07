import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const quickLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" }
  ];

  const services = [
    "Website Development",
    "UI/UX Design",
    "AI Chatbot Integration",
    "Digital Marketing",
    "SEO Optimization"
  ];

  return (
    <footer className="bg-dark-primary py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold gradient-text mb-4">Milan & Dhiraj</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Student developers from IIT Madras passionate about building amazing digital experiences 
              for startups and businesses worldwide.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-dark-secondary rounded-lg flex items-center justify-center hover:bg-blue-primary transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-dark-secondary rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-dark-secondary rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-dark-secondary rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <FaInstagram />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-blue-primary transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-300 hover:text-blue-primary transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300">
            © 2024 Milan & Dhiraj. All rights reserved. |{' '}
            <a href="#" className="text-blue-primary hover:text-blue-secondary transition-colors">
              Portfolio
            </a>{' '}
            | Built with ❤️ at IIT Madras
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
