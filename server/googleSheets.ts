import { google } from 'googleapis';

// Google Sheets configuration
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const CREDENTIALS = process.env.GOOGLE_SHEETS_CREDENTIALS;

interface ContactData {
  name: string;
  email: string;
  projectDescription: string;
  service?: string;
  country?: string;
  budget?: string;
  customBudget?: string;
  timeline?: string;
  createdAt: Date;
}

export async function addToGoogleSheets(contactData: ContactData) {
  try {
    if (!SHEET_ID || !CREDENTIALS) {
      console.log('Google Sheets credentials not configured. Skipping sheets integration.');
      return { success: false, message: 'Google Sheets not configured' };
    }

    // Parse credentials from environment variable
    const credentials = JSON.parse(CREDENTIALS);
    
    // Create JWT client
    const jwtClient = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    // Authenticate
    await jwtClient.authorize();

    // Create sheets API instance
    const sheets = google.sheets({ version: 'v4', auth: jwtClient });

    // Prepare row data
    const budgetDisplay = contactData.budget === 'custom' 
      ? `Custom: ${contactData.customBudget || 'Not specified'}`
      : contactData.budget || 'Not specified';

    const rowData = [
      new Date().toISOString(),
      contactData.name,
      contactData.email,
      contactData.service || 'Not specified',
      contactData.country || 'Not specified',
      budgetDisplay,
      contactData.timeline || 'Not specified',
      contactData.projectDescription,
      'New' // Status column
    ];

    // Add data to sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:I', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData]
      }
    });

    console.log('Successfully added contact to Google Sheets:', response.data);
    return { success: true, data: response.data };

  } catch (error) {
    console.error('Error adding to Google Sheets:', error);
    return { success: false, error: error.message };
  }
}

export async function initializeGoogleSheet() {
  try {
    if (!SHEET_ID || !CREDENTIALS) {
      console.log('Google Sheets not configured. Skipping initialization.');
      return;
    }

    const credentials = JSON.parse(CREDENTIALS);
    const jwtClient = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    await jwtClient.authorize();
    const sheets = google.sheets({ version: 'v4', auth: jwtClient });

    // Check if headers exist, if not add them
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1:I1'
    });

    if (!response.data.values || response.data.values.length === 0) {
      // Add headers
      const headers = [
        'Timestamp',
        'Name',
        'Email',
        'Service',
        'Country',
        'Budget',
        'Timeline',
        'Project Description',
        'Status'
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: 'Sheet1!A1:I1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [headers]
        }
      });

      console.log('Google Sheets headers initialized successfully');
    }

  } catch (error) {
    console.error('Error initializing Google Sheets:', error);
  }
}