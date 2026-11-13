export const siteConfig = {
  name: "FANAMI",
  tagline: "Create. Connect. Grow.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fanami.vercel.app",
  contactEmail: process.env.CONTACT_EMAIL || "",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  },
} as const;
