import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertServiceInquirySchema } from "@shared/schema";
import { addToGoogleSheets } from "./googleSheets";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      // Save to database
      const contact = await storage.createContact(validatedData);
      
      // Add to Google Sheets
      const sheetsResult = await addToGoogleSheets({
        ...validatedData,
        createdAt: new Date()
      });
      
      console.log('Google Sheets integration result:', sheetsResult);
      
      res.json({ 
        success: true, 
        message: "Contact form submitted successfully. Data saved to database and Google Sheets.",
        data: contact,
        sheetsIntegration: sheetsResult.success
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      
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
      
      // Save to database
      const inquiry = await storage.createServiceInquiry(validatedData);
      
      // Add to Google Sheets
      const sheetsResult = await addToGoogleSheets({
        name: validatedData.name,
        email: validatedData.email,
        projectDescription: validatedData.description,
        service: validatedData.service,
        budget: validatedData.budget,
        createdAt: new Date()
      });
      
      console.log('Google Sheets integration result:', sheetsResult);
      
      res.json({ 
        success: true, 
        message: "Service inquiry submitted successfully. Data saved to database and Google Sheets.",
        data: inquiry,
        sheetsIntegration: sheetsResult.success
      });
    } catch (error) {
      console.error('Service inquiry submission error:', error);
      
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
