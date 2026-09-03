import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("ERROR_mongoose: MONGODB_URI was not defined.");
  }
  await mongoose.connect(MONGODB_URI);
  return mongoose;
}

export default dbConnect;
