import emailjs from '@emailjs/browser';

// EmailJS configuration (client-side, use environment variables)
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
const EMAILJS_TO_EMAIL = process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL!;

// Ensure all required env vars are set
if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY || !EMAILJS_TO_EMAIL) {
  throw new Error('Missing EmailJS environment variables');
}

// Validate EMAILJS_TO_EMAIL format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(EMAILJS_TO_EMAIL)) {
  throw new Error('Invalid EMAILJS_TO_EMAIL format');
}

// Function to escape HTML special characters to prevent injection
const escapeHtml = (str: string): string =>
  str.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char] || char));

// Interface for EmailJS template parameters
interface EmailJSTemplateParams {
  html: string;
  to_email: string;
  subject: string;
  [key: string]: unknown; // Index signature for Record<string, unknown>
}

// Interface for parameters received from the client
interface ClientEmailParams {
  from_name: string; // Formatted as "Name <email>"
  subject: string; // Included in HTML, not email subject
  message: string;
}

// Client-side function to send email using @emailjs/browser
export async function sendEmail(params: ClientEmailParams) {
  // Client-side validation
  if (!params.from_name || params.from_name.length < 2) {
    throw new Error('Name must be at least 2 characters');
  }
  // Extract and validate email from from_name (e.g., "Name <email>")
  const emailMatch = params.from_name.match(/<([^>]+)>/);
  if (!emailMatch || !emailRegex.test(emailMatch[1])) {
    throw new Error('Invalid or missing email in from_name');
  }
  if (!params.subject || params.subject.length < 5) {
    throw new Error('Subject must be at least 5 characters');
  }
  if (!params.message || params.message.length < 10) {
    throw new Error('Message must be at least 10 characters');
  }

  try {
    // Extract name and email from from_name
    const name = params.from_name.split('<')[0].trim();
    const email = emailMatch[1];

    // Create HTML content with escaped inputs to prevent injection
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #1a73e8;">New Message from Portfolio Site</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(params.subject)}</p>
        <p><strong>Message:</strong></p>
        <p style="background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${escapeHtml(params.message)}</p>
        <hr style="border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">This message was sent from your portfolio website.</p>
      </div>
    `;

    const templateParams: EmailJSTemplateParams = {
      html: htmlContent,
      to_email: EMAILJS_TO_EMAIL,
      subject: "From Portfolio website"
    };

    // Initialize EmailJS with public key
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY! });

    // Send email using @emailjs/browser
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID!,
      EMAILJS_TEMPLATE_ID!,
      templateParams,
      { publicKey: EMAILJS_PUBLIC_KEY! }
    );

    return {
      status: response.status, // e.g., 200 for success
      text: response.text, // e.g., "OK"
    };
  } catch (error) {
    let errorMessage = 'Unknown error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(`Failed to send email to ${EMAILJS_TO_EMAIL}: ${errorMessage}`);
  }
}