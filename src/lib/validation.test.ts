import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/validation";

const validContact = {
  name: "Alex Sample",
  email: "alex@example.com",
  country: "Peru",
  business: "",
  projectType: "Website",
  budget: "",
  message: "We need a responsive website for our new business.",
  website: "",
};

describe("contact form validation", () => {
  it("accepts valid details and trims whitespace", () => {
    const result = contactSchema.safeParse({ ...validContact, name: " Alex " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Alex");
  });

  it("rejects malformed email and honeypot input", () => {
    expect(contactSchema.safeParse({ ...validContact, email: "not-an-email" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...validContact, website: "spam" }).success).toBe(false);
  });
});
