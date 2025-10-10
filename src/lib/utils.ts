// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✅ WhatsApp API Credentials
const PHONE_ID = "780619091801476";
const TOKEN = "EAAYWCLCijuABPuTHBokaLTWnTilJ1BLWXD2H0J8ZBzMGomQqYPNKpQ7u8hnVZB8g5EmrzgC87RhUs6KfWErP3O1lFDZCqX8AoPzFsbQdZAO4AFkM2JsQOXLvaZBcnzsFKmZCxZCqakHbcmDmvvHcjSGx6ekqMWuKsZAr7foVM7w38J3ZBU99zZAWbb4I6QdfGvt9IenAZDZD";

/**
 * Sends a WhatsApp confirmation message via Meta's Graph API
 */
export const sendWhatsAppMessage = async (
  to: string,
  firstName: string,
  bookingId: string,
  vehicle: string,
  category: string,
  route: string,
  tripType: string,
  price: string,
  preferredDate: string,
  phone: string,
  email: string
) => {
  const cleanPhone = to.replace(/\D/g, "");
  const formattedTo = "+" + cleanPhone;

  // 🔴 Fixed: Removed extra spaces in URL
  const url = `https://graph.facebook.com/v19.0/${PHONE_ID}/messages`;

  const cleanText = (text: string) => {
    return text.replace(/[\n\r\t]/g, " ").replace(/\s{2,}/g, " ").trim();
  };

  const payload = {
    messaging_product: "whatsapp",
    to: formattedTo,
    type: "template",
    template: {
      name: "cabbooking_confirmation",
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: cleanText(firstName) },
            { type: "text", text: cleanText(bookingId) },
            { type: "text", text: cleanText(vehicle) },
            { type: "text", text: cleanText(category) },
            { type: "text", text: cleanText(route) },
            { type: "text", text: cleanText(tripType) },
            { type: "text", text: cleanText(price) },
            { type: "text", text: cleanText(preferredDate) },
            { type: "text", text: cleanText(phone) },
            { type: "text", text: cleanText(email) },
          ],
        },
      ],
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("WhatsApp API Error Response:", errorText);
      throw new Error(`WhatsApp send failed: ${response.status}`);
    }

    const result = await response.json();
    console.log("✅ WhatsApp sent successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ WhatsApp message failed:", error);
    throw error;
  }
};