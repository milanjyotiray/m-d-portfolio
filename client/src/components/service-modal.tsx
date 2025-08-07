import { motion } from "framer-motion";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  gradient: string;
}

interface ServiceModalProps {
  serviceId: string;
  services: Service[];
  onClose: () => void;
}

export default function ServiceModal({ serviceId, services, onClose }: ServiceModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const service = services.find(s => s.id === serviceId);

  const submitInquiry = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/service-inquiry", {
        ...data,
        service: serviceId
      });
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent!",
        description: "We'll get back to you soon via WhatsApp.",
      });
      
      // Create WhatsApp message
      const message = `Hi! I'm ${formData.name} (${formData.email}). Interested in your ${service?.title} service. Message: ${formData.message}`;
      const whatsappUrl = `https://wa.me/919678165375?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      // Reset form and close modal
      setFormData({ name: "", email: "", message: "" });
      onClose();
      
      // Invalidate cache
      queryClient.invalidateQueries({ queryKey: ['/api/service-inquiries'] });
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
    if (!formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email.",
        variant: "destructive"
      });
      return;
    }
    submitInquiry.mutate(formData);
  };

  if (!service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-dark-secondary rounded-2xl p-8 max-w-md w-full border border-gray-700 relative"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          <FaTimes />
        </button>
        
        <div className="text-center mb-6">
          <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
            <service.icon className="text-2xl text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
          <p className="text-gray-300">{service.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="modal-name">Name *</Label>
            <Input
              id="modal-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-dark-tertiary border-gray-600 text-white focus:border-blue-primary"
              required
            />
          </div>

          <div>
            <Label htmlFor="modal-email">Email *</Label>
            <Input
              id="modal-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="bg-dark-tertiary border-gray-600 text-white focus:border-blue-primary"
              required
            />
          </div>

          <div>
            <Label htmlFor="modal-message">Message</Label>
            <Textarea
              id="modal-message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="bg-dark-tertiary border-gray-600 text-white focus:border-blue-primary resize-vertical"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={submitInquiry.isPending}
            className="w-full bg-gradient-to-r from-blue-primary to-blue-secondary hover:from-blue-secondary hover:to-purple-accent"
          >
            {submitInquiry.isPending ? "Sending..." : "Send Inquiry"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
