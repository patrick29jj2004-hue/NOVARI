import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  country: z.string().trim().min(2).max(80),
  business: z.string().trim().max(120).optional().default(""),
  projectType: z.string().trim().min(2).max(80),
  budget: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(20).max(4000),
  website: z.string().max(0).optional().default(""),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
