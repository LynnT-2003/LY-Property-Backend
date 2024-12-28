import connectMongodb from "../../../lib/mongodb";
import listingModel from "../../../models/listingModel";
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

export async function OPTIONS() {
  const response = NextResponse.json(null, { status: 204 }); // No content
  return addCorsHeaders(response);
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.propertyId) {
      return NextResponse.json(
        { message: "Property ID is required" },
        { status: 400 }
      );
    }
    await connectMongodb();

    const _ = await propertyModel.findOneAndUpdate(
      { _id: body.propertyId },
      { $push: { listings: body } },
      { upsert: true, new: true }
    );
    const listing = await listingModel.create(body);
    const response = NextResponse.json(
      { message: "Listing created successfully", listing },
      { status: 201 }
    );
    return addCorsHeaders(response);
    s;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating listing" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectMongodb();

    // Parse query parameters
    const { searchParams } = new URL(req.url);
    const listingId = searchParams.get("id");

    if (listingId) {
      const listing = await listingModel.findOne({ _id: listingId });

      if (!listing) {
        return NextResponse.json(
          { message: "Listing not found" },
          { status: 404 }
        );
      }

      const response = NextResponse.json(listing);
      s;
      return addCorsHeaders(response);
    } else {
      // Fetch all listings
      const listings = await listingModel.find();
      const response = NextResponse.json(listings);
      return addCorsHeaders(response);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
