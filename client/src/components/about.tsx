import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaFigma, FaWordpress, FaGithub, FaGoogle, FaLinkedin, FaInstagram, FaApple, FaAndroid } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Milan */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full mx-auto mb-6 overflow-hidden border-4 border-blue-primary/30 hover:border-blue-primary transition-colors">
              <img
                  src="/images/milan.jpeg"
                  alt="Milan - Student Developer from IIT Madras"
                  className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2 gradient-text">Milanjyoti Ray</h3>
            <p className="text-purple-accent font-semibold mb-4">Frontend Developer & UI/UX Designer</p>
            <p className="text-gray-300 max-w-sm mx-auto mb-4">
              Passionate about creating beautiful user interfaces and seamless user experiences. 
              Specializes in Python, React, and modern web technologies.
            </p>
            <div className="flex justify-center space-x-3">
              <a href="https://www.linkedin.com/in/milanjyotiray" className="text-blue-600 hover:text-blue-400 text-xl transition-colors">
                <FaLinkedin />
              </a>
              <a href="https://github.com/milanjyotiray" className="text-gray-400 hover:text-white text-xl transition-colors">
                <FaGithub />
              </a>
              <a href="https://X.com/MilanjyotiRay" className="text-gray-300 hover:text-white text-xl transition-colors">
                <FaXTwitter />
              </a>
              <a href="https://www.instagram.com/iamraymilanjyoti" className="text-pink-500 hover:text-pink-400 text-xl transition-colors">
                <FaInstagram />
              </a>
              <a href="https://milanjyotiray.netlify.app" className="text-blue-primary hover:text-blue-secondary text-xl transition-colors" title="Portfolio Website">
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
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full mx-auto mb-6 overflow-hidden border-4 border-blue-primary/30 hover:border-blue-primary transition-colors">
              <img
                src="/images/dhiraj.jpeg"
                alt="Dhiraj - Student Developer from IIT Madras"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2 gradient-text">Dhiraj Talukdar</h3>
            <p className="text-purple-accent font-semibold mb-4">Backend Developer</p>
            <p className="text-gray-300 max-w-sm mx-auto mb-4">
              Expert in building robust backend systems and APIs that power amazing applications. 
              Focuses on scalable architecture and performance optimization.
            </p>
            <div className="flex justify-center space-x-3">
              <a href="https://www.linkedin.com/in/dhiraj-talukdar-574983284/" className="text-blue-600 hover:text-blue-400 text-xl transition-colors">
                <FaLinkedin />
              </a>
              <a href="https://github.com/dhirajtalukdar" className="text-gray-400 hover:text-white text-xl transition-colors">
                <FaGithub />
              </a>
              <a href="https://X.com/adhirajhun45631" className="text-gray-300 hover:text-white text-xl transition-colors">
                <FaXTwitter />
              </a>
              <a href="https://www.instagram.com/talukdardhiraj442diamond" className="text-pink-500 hover:text-pink-400 text-xl transition-colors">
                <FaInstagram />
              </a>
              {/* <a href="#" className="text-purple-accent hover:text-purple-400 text-xl transition-colors" title="Portfolio Website">
                <FaGoogle />
              </a> */}
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 sm:gap-8 justify-items-center">
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
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-dark-tertiary rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-primary/20 hover:to-blue-secondary/20 border border-gray-700 hover:border-blue-primary/50 transition-all duration-300">
                    <tech.icon className={`text-xl sm:text-2xl lg:text-3xl ${tech.color}`} />
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
