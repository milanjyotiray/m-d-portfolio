import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaFigma, FaWordpress, FaGithub, FaGoogle, FaLinkedin, FaInstagram, FaTwitter, FaApple, FaAndroid } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiFirebase, SiFlutter, SiReact, SiKotlin, SiSwift } from "react-icons/si";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function About() {
  const techStack = [
    { icon: FaReact, name: "React", color: "text-blue-400" },
    { icon: SiNextdotjs, name: "Next.js", color: "text-white" },
    { icon: FaNodeJs, name: "Node.js", color: "text-green-500" },
    { icon: FaFigma, name: "Figma", color: "text-purple-500" },
    { icon: SiTailwindcss, name: "Tailwind CSS", color: "text-cyan-400" },
    { icon: FaWordpress, name: "WordPress", color: "text-blue-600" },
    { icon: SiFirebase, name: "Firebase", color: "text-orange-500" },
    { icon: FaGithub, name: "GitHub", color: "text-white" },
    { icon: SiFlutter, name: "Flutter", color: "text-blue-500" },
    { icon: SiReact, name: "React Native", color: "text-blue-400" },
    { icon: SiKotlin, name: "Kotlin", color: "text-purple-600" },
    { icon: SiSwift, name: "Swift", color: "text-orange-600" },
  ];

  return (
    <section id="about" className="py-20 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Meet the <span className="gradient-text">Team</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Two passionate students from IIT Madras who love building amazing digital experiences
          </p>
        </motion.div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Milan */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-64 h-64 rounded-full mx-auto mb-6 overflow-hidden border-4 border-blue-primary/30 hover:border-blue-primary transition-colors">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
                alt="Milan - Student Developer from IIT Madras"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2 gradient-text">Milan</h3>
            <p className="text-blue-primary font-semibold mb-4">Full-Stack Developer</p>
            <p className="text-gray-300 max-w-sm mx-auto mb-4">
              Passionate about creating seamless user experiences and robust backend systems. 
              Specializes in React, Node.js, and modern web technologies.
            </p>
            <div className="flex justify-center space-x-3">
              <a href="#" className="text-blue-600 hover:text-blue-400 text-xl transition-colors">
                <FaLinkedin />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl transition-colors">
                <FaGithub />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-xl transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-400 text-xl transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-blue-primary hover:text-blue-secondary text-xl transition-colors" title="Portfolio Website">
                <FaGoogle />
              </a>
            </div>
          </motion.div>

          {/* Dhiraj */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-64 h-64 rounded-full mx-auto mb-6 overflow-hidden border-4 border-purple-accent/30 hover:border-purple-accent transition-colors">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400"
                alt="Dhiraj - Student Developer from IIT Madras"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2 gradient-text">Dhiraj</h3>
            <p className="text-purple-accent font-semibold mb-4">UI/UX Designer & Developer</p>
            <p className="text-gray-300 max-w-sm mx-auto mb-4">
              Expert in creating beautiful, functional designs and bringing them to life with code. 
              Focuses on user-centered design and modern development practices.
            </p>
            <div className="flex justify-center space-x-3">
              <a href="#" className="text-blue-600 hover:text-blue-400 text-xl transition-colors">
                <FaLinkedin />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl transition-colors">
                <FaGithub />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 text-xl transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-pink-500 hover:text-pink-400 text-xl transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-purple-accent hover:text-purple-400 text-xl transition-colors" title="Portfolio Website">
                <FaGoogle />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-8">Our <span className="gradient-text">Tech Stack</span></h3>
          <p className="text-gray-300 mb-12">Technologies we use to build amazing digital experiences</p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 justify-items-center">
          {techStack.map((tech, index) => (
            <Tooltip key={tech.name}>
              <TooltipTrigger asChild>
                <motion.div
                  className="tech-icon cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-dark-tertiary rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-primary/20 hover:to-blue-secondary/20 border border-gray-700 hover:border-blue-primary/50 transition-all duration-300">
                    <tech.icon className={`text-3xl ${tech.color}`} />
                  </div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tech.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </section>
  );
}
