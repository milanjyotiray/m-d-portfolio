import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with advanced features and seamless user experience.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tech: ["React", "Node.js", "MongoDB"],
      techColors: ["bg-blue-primary/20 text-blue-primary", "bg-purple-accent/20 text-purple-accent", "bg-green-500/20 text-green-500"]
    },
    {
      title: "Startup Landing Page",
      description: "High-converting landing page for a tech startup with modern animations.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      techColors: ["bg-blue-primary/20 text-blue-primary", "bg-purple-accent/20 text-purple-accent", "bg-orange-500/20 text-orange-500"]
    },
    {
      title: "Portfolio Website",
      description: "Creative portfolio site for a designer with interactive elements and smooth animations.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tech: ["React", "Three.js", "GSAP"],
      techColors: ["bg-blue-primary/20 text-blue-primary", "bg-purple-accent/20 text-purple-accent", "bg-pink-500/20 text-pink-500"]
    },
    {
      title: "Mobile App UI/UX",
      description: "Complete mobile app design with modern UI patterns and user-friendly interface.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tech: ["Figma", "React Native", "Firebase"],
      techColors: ["bg-blue-primary/20 text-blue-primary", "bg-purple-accent/20 text-purple-accent", "bg-green-500/20 text-green-500"]
    },
    {
      title: "WordPress Business Site",
      description: "Professional WordPress website with custom theme and advanced functionality.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tech: ["WordPress", "PHP", "MySQL"],
      techColors: ["bg-blue-primary/20 text-blue-primary", "bg-purple-accent/20 text-purple-accent", "bg-yellow-500/20 text-yellow-500"]
    },
    {
      title: "AI Chatbot Platform",
      description: "Intelligent chatbot with natural language processing and machine learning capabilities.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tech: ["Python", "OpenAI", "Flask"],
      techColors: ["bg-blue-primary/20 text-blue-primary", "bg-purple-accent/20 text-purple-accent", "bg-green-500/20 text-green-500"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of our recent work and successful projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="project-card bg-dark-tertiary rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-primary/50 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 rounded text-sm ${project.techColors[techIndex]}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button className="bg-blue-primary hover:bg-blue-secondary flex-1">
                    View Live
                  </Button>
                  <Button variant="outline" className="border-blue-primary text-blue-primary hover:bg-blue-primary hover:text-white flex-1">
                    GitHub
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
