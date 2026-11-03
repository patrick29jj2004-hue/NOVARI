import { afterEach, describe, expect, it } from "vitest";
import { POST } from "./route";

const originalEnv = {
  key: process.env.RESEND_API_KEY,
  recipient: process.env.CONTACT_EMAIL,
  sender: process.env.RESEND_FROM_EMAIL,
};

function requestWith(body: unknown, locale = "es") {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": locale,
      "x-real-ip": "unit-test",
    },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "Alex Sample",
  email: "alex@example.com",
  country: "Peru",
  business: "",
  projectType: "Website",
  budget: "",
  message: "We need a responsive website for our new business.",
  website: "",
};

afterEach(() => {
  if (originalEnv.key === undefined) delete process.env.RESEND_API_KEY;
  else process.env.RESEND_API_KEY = originalEnv.key;
  if (originalEnv.recipient === undefined) delete process.env.CONTACT_EMAIL;
  else process.env.CONTACT_EMAIL = originalEnv.recipient;
  if (originalEnv.sender === undefined) delete process.env.RESEND_FROM_EMAIL;
  else process.env.RESEND_FROM_EMAIL = originalEnv.sender;
});

describe("POST /api/contact", () => {
  it("rejects malformed input before attempting email delivery", async () => {
    const response = await POST(requestWith({ ...validPayload, email: "invalid" }));
    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      message: expect.stringContaining("inválidos"),
    });
  });

  it("does not claim delivery when email credentials are missing", async () => {
    process.env.RESEND_API_KEY = "";
    process.env.CONTACT_EMAIL = "";
    process.env.RESEND_FROM_EMAIL = "";
    const response = await POST(requestWith(validPayload));
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      message: expect.stringContaining("no está configurado"),
    });
  });

  it("returns an English configuration error for English submissions", async () => {
    process.env.RESEND_API_KEY = "";
    process.env.CONTACT_EMAIL = "";
    process.env.RESEND_FROM_EMAIL = "";
    const response = await POST(requestWith(validPayload, "en"));
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      message: expect.stringContaining("not configured"),
    });
  });

  it("limits the actual streamed body when Content-Length is absent", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-real-ip": "large-body-test" },
      body: "x".repeat(32_001),
    });

    expect(request.headers.get("content-length")).toBeNull();
    const response = await POST(request);
    expect(response.status).toBe(413);
  });
});
