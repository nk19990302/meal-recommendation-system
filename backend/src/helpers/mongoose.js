import * as mongoose from "mongoose";
const mongoUrl = "mongodb://0.0.0.0:27017/dilfood";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("mongodb connection established");
  } catch (error) {
    console.log("mongodb connection failed", error);
  }
};

export default connectMongoDB;