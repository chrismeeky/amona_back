import { Schema, model } from "mongoose";

const rolesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  permissions: [{ type: String, required: true }],
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = model("Roles", rolesSchema);
