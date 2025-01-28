import { NextRequest } from "next/server";

export function validateApiKey(req: NextRequest): boolean {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return false; // Invalid API key
  }
  return true; // Valid API key
}
