import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertServiceInquirySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // TODO: Integrate with Google Sheets API
      // TODO: Send WhatsApp notification
      
      res.json({ 
        success: true, 
        message: "Contact form submitted successfully",
        data: contact 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Service inquiry submission
  app.post("/api/service-inquiry", async (req, res) => {
    try {
      const validatedData = insertServiceInquirySchema.parse(req.body);
      const inquiry = await storage.createServiceInquiry(validatedData);
      
      // TODO: Integrate with Google Sheets API
      // TODO: Send WhatsApp notification
      
      res.json({ 
        success: true, 
        message: "Service inquiry submitted successfully",
        data: inquiry 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ success: true, data: contacts });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Get service inquiries (admin endpoint)
  app.get("/api/service-inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getServiceInquiries();
      res.json({ success: true, data: inquiries });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
