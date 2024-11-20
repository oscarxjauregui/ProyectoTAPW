import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://oscar:Oscarjaro8@clustertedw.oixv6.mongodb.net/Proyecto"
    );
    console.log("DB is conected");
  } catch (error) {
    console.log(error);
  }
};
