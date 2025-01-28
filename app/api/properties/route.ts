import { NextRequest, NextResponse } from "next/server";
import connectMongodb from "../../../lib/mongodb";
import propertyModel from "../../../models/propertyModel";
import { validateApiKey } from "@/lib/middleware/validateApiKey";

// Function to set CORS headers on all responses
function addCorsHeaders(response: NextResponse): NextResponse {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins, or specify your frontend origin here
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, x-api-key, Authorization"
  );
  return response;
}

// Handle preflight OPTIONS request
export async function OPTIONS(req: NextRequest): Promise<NextResponse> {
  const response = NextResponse.json(null, { status: 204 }); // No content
  return addCorsHeaders(response); // Add CORS headers to the OPTIONS response
}

// Handle POST request (creating a property)
export async function POST(req: NextRequest): Promise<NextResponse> {
  if (!validateApiKey(req)) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid API Key" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    await connectMongodb();
    const listing = await propertyModel.create(body);
    const response = NextResponse.json(
      { message: "Property created successfully", listing },
      { status: 201 }
    );
    return addCorsHeaders(response); // Ensure CORS headers are added
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating property" },
      { status: 500 }
    );
  }
}

// Handle GET request (fetching all properties)
export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!validateApiKey(req)) {
    return NextResponse.json(
      { message: "Unauthorized: Invalid API Key" },
      { status: 401 }
    );
  }

  try {
    console.log("GET request received, attempting to connect to MongoDB...");
    await connectMongodb();
    console.log("MongoDB connection established.");

    console.log("Fetching properties from the database...");
    const properties = await propertyModel.find();
    console.log(`Found ${properties.length} properties.`);

    const response = NextResponse.json(properties);
    return addCorsHeaders(response); // Ensure CORS headers are added
  } catch (error) {
    console.log("Error occurred during GET request:", error);
    return NextResponse.json(
      { message: "Error fetching properties" },
      { status: 500 }
    );
  }
}
