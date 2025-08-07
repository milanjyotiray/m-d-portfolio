import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

import { GoogleSheetsService } from "./google-sheets";

const googleSheetsService = new GoogleSheetsService({
  webAppUrl: "https://script.google.com/macros/s/AKfycbxsoVbB3RgciTXuILLG7eLtSGFQltbh86m-zCD7HzevlXVfVYJdP7PdJzt5iWbp-zEO/exec"
});


export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);

      // 📨 Log the received contact
      console.log("📨 Contact form received:", contact);

      // Submit to Google Sheets
      try {
        const submitted = await googleSheetsService.submitToSheet(contact);
        console.log("📤 Google Sheets submission result:", submitted);

        if (submitted) {
          console.log("✅ Contact successfully submitted to Google Sheets:", contact.id);
        } else {
          console.log("⚠️ Google Sheets integration not configured or failed. Contact stored locally:", contact.id);
        }
      } catch (sheetsError) {
        console.error("❌ Google Sheets submission failed, but contact saved locally:", sheetsError);
      }

      res.json({ 
        success: true, 
        contact,
        message: "Contact submitted successfully"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Validation error", errors: error.errors });
      } else {
        console.error("❌ Contact submission error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get all contacts (admin endpoint)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get Google Apps Script code for Google Sheets integration
  app.get("/api/google-sheets-setup", async (req, res) => {
    try {
      const { GoogleSheetsService } = await import("./google-sheets");
      const scriptCode = GoogleSheetsService.getGoogleAppsScriptCode();

      res.json({
        success: true,
        scriptCode,
        instructions: [
          "1. Go to script.google.com and create a new project",
          "2. Replace the default code with the provided script",
          "3. Deploy as a web app with execute access set to 'Anyone'",
          "4. Copy the web app URL and set it as GOOGLE_SHEETS_WEB_APP_URL environment variable",
          "5. Test the integration by submitting a contact form"
        ]
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
