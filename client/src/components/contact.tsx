import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaPhone, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectDescription: "",
    service: "",
    country: "",
    budget: "",
    customBudget: "",
    timeline: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitContact = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Your inquiry has been saved to Google Sheets and WhatsApp chat is opening.",
      });
      
      // Create WhatsApp message
      const serviceNames = {
        "website-dev": "Website Development",
        "ui-ux": "UI/UX Design", 
        "app-dev": "Mobile App Development",
        "ai-chatbot": "AI Chatbot Integration",
        "branding": "Brand Design",
        "digital-marketing": "Digital Marketing",
        "seo": "SEO Optimization",
        "wordpress": "WordPress Development",
        "ecommerce": "E-commerce Solutions"
      };

      const budgetDisplay = formData.budget === "custom" 
        ? `Custom Budget: ${formData.customBudget}`
        : formData.budget;

      const message = `Hi! I'm ${formData.name} and I'm interested in your services.

📧 Email: ${formData.email}
🎯 Service: ${serviceNames[formData.service as keyof typeof serviceNames] || formData.service}
🌍 Country: ${formData.country}
💰 Budget: ${budgetDisplay}
⏰ Timeline: ${formData.timeline}

📝 Project Description:
${formData.projectDescription}

Looking forward to discussing this project with you!`;
      
      const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        projectDescription: "",
        service: "",
        country: "",
        budget: "",
        customBudget: "",
        timeline: ""
      });
      
      // Invalidate cache
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.projectDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    submitContact.mutate(formData);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      info: "milan.dhiraj@iitm.ac.in",
      gradient: "from-blue-primary to-blue-secondary"
    },
    {
      icon: FaPhone,
      title: "Phone",
      info: "+91 98765 43210",
      gradient: "from-green-500 to-blue-primary"
    },
    {
      icon: FaInstagram,
      title: "Instagram",
      info: "@milan_dhiraj_dev",
      gradient: "from-pink-500 to-purple-accent"
    },
    {
      icon: FaLinkedin,
      title: "LinkedIn",
      info: "Milan & Dhiraj - Developers",
      gradient: "from-blue-600 to-blue-primary"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to start your project? Let's discuss how we can help bring your vision to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
            
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.title}
                  className="flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${contact.gradient} rounded-xl flex items-center justify-center mr-4`}>
                    <contact.icon className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{contact.title}</h4>
                    <p className="text-gray-300">{contact.info}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-dark-tertiary rounded-lg flex items-center justify-center hover:bg-blue-primary transition-colors">
                  <FaLinkedin />
                </a>
                <a href="#" className="w-10 h-10 bg-dark-tertiary rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-dark-tertiary rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-dark-tertiary rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <FaInstagram />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-dark-tertiary p-8 rounded-2xl border border-gray-700"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Start Your Project</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-dark-secondary border-gray-600 text-white focus:border-blue-primary"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-dark-secondary border-gray-600 text-white focus:border-blue-primary"
                  required
                />
              </div>

              <div>
                <Label htmlFor="project-description">Project Description *</Label>
                <Textarea
                  id="project-description"
                  value={formData.projectDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                  className="bg-dark-secondary border-gray-600 text-white focus:border-blue-primary resize-vertical"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="service">Service Needed</Label>
                <Select value={formData.service} onValueChange={(value) => setFormData(prev => ({ ...prev, service: value, budget: "" }))}>
                  <SelectTrigger className="bg-dark-secondary border-gray-600 text-white focus:border-blue-primary">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-secondary border-gray-600">
                    <SelectItem value="website-dev">Website Development</SelectItem>
                    <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                    <SelectItem value="app-dev">Mobile App Development</SelectItem>
                    <SelectItem value="ai-chatbot">AI Chatbot Integration</SelectItem>
                    <SelectItem value="branding">Brand Design</SelectItem>
                    <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                    <SelectItem value="seo">SEO Optimization</SelectItem>
                    <SelectItem value="wordpress">WordPress Development</SelectItem>
                    <SelectItem value="ecommerce">E-commerce Solutions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value, budget: "" }))}>
                  <SelectTrigger className="bg-dark-secondary border-gray-600 text-white focus:border-blue-primary">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="bg-dark-secondary border-gray-600">
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                    <SelectTrigger className="bg-dark-secondary border-gray-600 text-white focus:border-blue-primary">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-secondary border-gray-600">
                      {formData.country === "india" ? (
                        // India budget ranges based on service
                        formData.service === "website-dev" || formData.service === "wordpress" ? (
                          <>
                            <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                            <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                            <SelectItem value="1l-3l">₹1,00,000 - ₹3,00,000</SelectItem>
                            <SelectItem value="3l-5l">₹3,00,000 - ₹5,00,000</SelectItem>
                            <SelectItem value="5l-plus">₹5,00,000+</SelectItem>
                            <SelectItem value="custom">Others (Custom Budget)</SelectItem>
                          </>
                        ) : formData.service === "app-dev" ? (
                          <>
                            <SelectItem value="under-2l">Under ₹2,00,000</SelectItem>
                            <SelectItem value="2l-5l">₹2,00,000 - ₹5,00,000</SelectItem>
                            <SelectItem value="5l-10l">₹5,00,000 - ₹10,00,000</SelectItem>
                            <SelectItem value="10l-20l">₹10,00,000 - ₹20,00,000</SelectItem>
                            <SelectItem value="20l-plus">₹20,00,000+</SelectItem>
                            <SelectItem value="custom">Others (Custom Budget)</SelectItem>
                          </>
                        ) : formData.service === "ui-ux" || formData.service === "branding" ? (
                          <>
                            <SelectItem value="under-25k">Under ₹25,000</SelectItem>
                            <SelectItem value="25k-75k">₹25,000 - ₹75,000</SelectItem>
                            <SelectItem value="75k-1.5l">₹75,000 - ₹1,50,000</SelectItem>
                            <SelectItem value="1.5l-3l">₹1,50,000 - ₹3,00,000</SelectItem>
                            <SelectItem value="3l-plus">₹3,00,000+</SelectItem>
                            <SelectItem value="custom">Others (Custom Budget)</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="under-30k">Under ₹30,000</SelectItem>
                            <SelectItem value="30k-1l">₹30,000 - ₹1,00,000</SelectItem>
                            <SelectItem value="1l-2l">₹1,00,000 - ₹2,00,000</SelectItem>
                            <SelectItem value="2l-5l">₹2,00,000 - ₹5,00,000</SelectItem>
                            <SelectItem value="5l-plus">₹5,00,000+</SelectItem>
                            <SelectItem value="custom">Others (Custom Budget)</SelectItem>
                          </>
                        )
                      ) : (
                        // International budget ranges based on service
                        formData.service === "website-dev" || formData.service === "wordpress" ? (
                          <>
                            <SelectItem value="under-2k">Under $2,000</SelectItem>
                            <SelectItem value="2k-5k">$2,000 - $5,000</SelectItem>
                            <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10k-20k">$10,000 - $20,000</SelectItem>
                            <SelectItem value="20k-plus">$20,000+</SelectItem>
                            <SelectItem value="custom">Others (Custom Budget)</SelectItem>
                          </>
                        ) : formData.service === "app-dev" ? (
                          <>
                            <SelectItem value="under-10k">Under $10,000</SelectItem>
                            <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                            <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                            <SelectItem value="100k-plus">$100,000+</SelectItem>
                            <SelectItem value="custom">Others (Custom Budget)</SelectItem>
                          </>
                        ) : formData.service === "ui-ux" || formData.service === "branding" ? (
                          <>
                            <SelectItem value="under-1k">Under $1,000</SelectItem>
                            <SelectItem value="1k-3k">$1,000 - $3,000</SelectItem>
                            <SelectItem value="3k-7k">$3,000 - $7,000</SelectItem>
                            <SelectItem value="7k-15k">$7,000 - $15,000</SelectItem>
                            <SelectItem value="15k-plus">$15,000+</SelectItem>
                            <SelectItem value="custom">Others (Custom Budget)</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="under-1k">Under $1,000</SelectItem>
                            <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                            <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                            <SelectItem value="25k-plus">$25,000+</SelectItem>
                            <SelectItem value="custom">Others (Custom Budget)</SelectItem>
                          </>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Custom Budget Input */}
                {formData.budget === "custom" && (
                  <div>
                    <Label htmlFor="customBudget">Your Budget</Label>
                    <Input
                      id="customBudget"
                      type="text"
                      placeholder={formData.country === "india" ? "Enter your budget in ₹" : "Enter your budget in $"}
                      value={formData.customBudget}
                      onChange={(e) => setFormData(prev => ({ ...prev, customBudget: e.target.value }))}
                      className="bg-dark-secondary border-gray-600 text-white focus:border-blue-primary placeholder-gray-400"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="timeline">Timeline</Label>
                  <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                    <SelectTrigger className="bg-dark-secondary border-gray-600 text-white focus:border-blue-primary">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-secondary border-gray-600">
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                      <SelectItem value="1month">1 month</SelectItem>
                      <SelectItem value="2-3months">2-3 months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitContact.isPending}
                className="w-full bg-gradient-to-r from-blue-primary to-blue-secondary hover:from-blue-secondary hover:to-purple-accent shadow-lg hover:shadow-blue-primary/25"
              >
                {submitContact.isPending ? "Sending..." : "Send Message & Start WhatsApp Chat"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
