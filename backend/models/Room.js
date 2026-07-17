import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    image_url: {
      type: String,
      required: true,
    },

    price_per_night: {
      type: Number,
      required: true,
    },

    images: [
  {
    type: String,
  },
],

    capacity: {
      type: Number,
      required: true,
    },

    amenities: [
      {
        type: String,
      },
    ],

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;