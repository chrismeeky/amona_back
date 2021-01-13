import { Schema, model } from "mongoose";

const carSchema = Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  location: { type: Schema.Types.ObjectId, ref: "Location" },
  pictures: { type: Schema.Types.ObjectId, ref: "Pictures" },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    min: 2004,
    max: Date.now.year,
    required: true,
  },
  gearType: {
    enum: ["Automatic", "Manual"],
  },
  mileage: {
    type: Number,
    max: 300000,
    required: true,
  },
  mileageUnit: {
    enum: ["miles", "kilometers"],
  },
  color: {
    type: String,
  },
  leather: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    min: 5,
  },
  purpose: {
    enum: ["rent", "hirepurchase"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  status: {
    enum: ["available", "sold", "rented"],
  },
  description: {
    type: String,
    max: 500,
    required: true,
  },
  promoted: {
    type: Boolean,
    default: false,
  },
  interval: {
    type: Number,
  },
  intervalUnit: {
    enum: ["week", "month", "year"],
  },
  remittance: {
    type: Number,
    default: 25000,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = model("Car", carSchema);
