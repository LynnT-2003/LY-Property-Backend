import connectMongodb from "../../../lib/mongodb";
import propertyModel from "../../../models/propertyModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    await connectMongodb();
    const listing = await propertyModel.create(body);
    return NextResponse.json(
      { message: "Property created successfully", listing },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating property" },
      { status: 500 }
    );
  }
}

// Fetch all properties
export async function GET() {
  try {
    await connectMongodb();
    const properties = await propertyModel.find();
    return NextResponse.json(properties);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching properties" },
      { status: 500 }
    );
  }
}
