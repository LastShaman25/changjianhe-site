const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactPayload = {
  name: string;
  email: string;
  organization?: string;
  subject?: string;
  message: string;
  website?: string;
};

export type ContactErrorCode =
  | "invalid_request"
  | "missing_fields"
  | "invalid_email"
  | "message_too_short"
  | "service_unavailable"
  | "send_failed";

export function validateContactPayload(payload: ContactPayload): ContactErrorCode | null {
  if (!payload.name?.trim() || !payload.email?.trim() || !payload.message?.trim()) {
    return "missing_fields";
  }

  if (!emailPattern.test(payload.email.trim())) {
    return "invalid_email";
  }

  if (payload.message.trim().length < 20) {
    return "message_too_short";
  }

  return null;
}

export function getContactConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    toEmail: process.env.CONTACT_TO_EMAIL,
    fromEmail: process.env.CONTACT_FROM_EMAIL
  };
}

