import connectMongodb from "../../../lib/mongodb";
import propertyModel from "../../../models/propertyModel";
import { NextResponse } from "next/server";

function addCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  return response;
}

export async function POST(req) {
  try {
    const body = await req.json();
    await connectMongodb();
    const listing = await propertyModel.create(body);
    const response = NextResponse.json(
      { message: "Property created successfully", listing },
      { status: 201 }
    );
    return addCorsHeaders(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating property" },
      { status: 500 }
    );
  }
}

// Fetch all properties

export async function GET(req) {
  try {
    console.log("GET request received, attempting to connect to MongoDB...");

    await connectMongodb();
    console.log("MongoDB connection established.");

    console.log("Fetching properties from the database...");
    const properties = await propertyModel.find();
    console.log(`Found ${properties.length} properties.`);

    const response = NextResponse.json(properties);
    return addCorsHeaders(response);
  } catch (error) {
    console.log("Error occurred during GET request:", error);
    return NextResponse.json(
      { message: "Error fetching properties" },
      { status: 500 }
    );
  }
}
