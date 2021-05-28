import mongoose from "mongoose";

const connectTomongoose = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://falakhe:21445754@cluster0.taxbm.mongodb.net/langashop",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("connected to db");
  } catch (error) {
    res.status(500);
    throw new Error("Problem With MongoDB");
  }
};

export default connectTomongoose;
