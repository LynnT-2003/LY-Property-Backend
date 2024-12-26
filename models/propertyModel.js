// APARTMENT / CONDO
// id
// price range
// name
// address
// facilities
// description
// [{ROOM_LISTINGS}]

import mongoose from "mongoose";
import { listingSchema } from "./listingModel.js";

const apartmentSchema = new mongoose.Schema({
  price: String,
  name: String,
  address: String,
  facilities: String,
  description: String,
  listings: [listingSchema],
});

export default mongoose.models.Apartments ||
  mongoose.model("Apartments", apartmentSchema);
