import { Schema, model } from "mongoose";

const categorySchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  thumbnail: {
    type: String,
    required:true
  },

  count: {
    type: Number,
    default: 0,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = model("Category", categorySchema);
