import axios from "axios";

export type Room = {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  images: string[];
  capacity: number;
  price_per_night: number;
};

export type GalleryImage = {
  _id: string;
  image_url: string;
  caption: string;
};

export const createBooking = async (bookingData: any) => {
  const { data } = await API.post("/bookings", bookingData);
  return data;
};

export const fetchBookings = async () => {
  const { data } = await API.get("/bookings");
  return data.bookings;
};

export const SITE = {
  name: "Valley Medows",
  phone: "+91 9419202363",
  email: "valleymedowskmr@gmail.com",
};

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchRooms = async () => {
  const { data } = await API.get("/rooms");
  return data.rooms;
};

export const fetchGallery = async () => {
  const { data } = await API.get("/gallery");
  return data.gallery;
};