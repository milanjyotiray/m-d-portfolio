import type { Contact } from "@shared/schema";

export interface GoogleSheetsConfig {
  webAppUrl?: string;
  apiKey?: string;
  spreadsheetId?: string;
}

export class GoogleSheetsService {
  private config: GoogleSheetsConfig;

  constructor(config: GoogleSheetsConfig = {}) {
    this.config = {
      webAppUrl: "https://script.google.com/macros/s/AKfycbxsoVbB3RgciTXuILLG7eLtSGFQltbh86m-zCD7HzevlXVfVYJdP7PdJzt5iWbp-zEO/exec", // 🔥 Working URL injected here
      apiKey: process.env.GOOGLE_SHEETS_API_KEY,
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      ...config
    };
  }

  async submitToSheet(contact: Contact): Promise<boolean> {
    try {
      if (this.config.webAppUrl) {
        return await this.submitViaWebApp(contact);
      }

      if (this.config.apiKey && this.config.spreadsheetId) {
        return await this.submitViaAPI(contact);
      }

      console.warn("No Google Sheets configuration found. Contact data will only be stored locally.");
      return false;
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      return false;
    }
  }

  private async submitViaWebApp(contact: Contact): Promise<boolean> {
    if (!this.config.webAppUrl) return false;

    const response = await fetch(this.config.webAppUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: contact.name,
        email: contact.email,
        project: contact.projectDescription,
        service: contact.service || "",
        country: contact.country || "",
        budget: contact.budget || "",
        customBudget: contact.customBudget || "",
        timeline: contact.timeline || "",
        submittedAt: contact.createdAt?.toISOString() || new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets submission failed: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ Successfully submitted to Google Sheets:", result);
    return true;
  }

  private async submitViaAPI(contact: Contact): Promise<boolean> {
    if (!this.config.apiKey || !this.config.spreadsheetId) return false;

    const values = [
      [
        contact.name,
        contact.email,
        contact.projectDescription,
        contact.service || "",
        contact.country || "",
        contact.budget || "",
        contact.customBudget || "",
        contact.timeline || "",
        contact.createdAt?.toISOString() || new Date().toISOString(),
      ],
    ];

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/Sheet1:append?valueInputOption=RAW&key=${this.config.apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      }
    );

    if (!response.ok) {
      throw new Error(`Google Sheets API call failed: ${response.status}`);
    }

    console.log("✅ Successfully submitted to Google Sheets via API");
    return true;
  }

  static getGoogleAppsScriptCode(): string {
    return `
// Google Apps Script Web App Code
// Deploy as web app with access: "Anyone"

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheet = SpreadsheetApp.getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Name',
        'Email',
        'Project Description',
        'Service',
        'Country',
        'Budget',
        'Custom Budget',
        'Timeline',
        'Submitted At'
      ]);
    }

    sheet.appendRow([
      data.name || "",
      data.email || "",
      data.project || "",
      data.service || "",
      data.country || "",
      data.budget || "",
      data.customBudget || "",
      data.timeline || "",
      data.submittedAt || new Date().toISOString(),
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Contact submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Milan & Dhiraj Portfolio Contact Form API'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
  }
}

// ✅ Now webAppUrl is injected directly here
export const googleSheetsService = new GoogleSheetsService();
