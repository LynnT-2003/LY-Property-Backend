import connectMongodb from "../../../../lib/mongodb";
import listingModel from "../../../../models/listingModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(_, { params }) {
  try {
    const { listingId } = params;
    await connectMongodb();

    const listing = await listingModel.findOne({
      _id: new mongoose.Types.ObjectId(listingId),
    });

    if (!listing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }
    const response = NextResponse.json(listing);

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
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching listing" },
      { status: 500 }
    );
  }
}
