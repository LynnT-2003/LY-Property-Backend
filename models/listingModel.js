// ROOM LISTINGS
// id
// price
// type (studio, 2 bedroom)
// size (sqm)
// availability
// propertyId

import mongoose from "mongoose";

export const listingSchema = new mongoose.Schema({
  propertyId: String,
  price: Number,
  type: String,
  size: Number,
  availability: Boolean,
  imageUrls: [String],
});

export default mongoose.models.Listings ||
  mongoose.model("Listings", listingSchema);
