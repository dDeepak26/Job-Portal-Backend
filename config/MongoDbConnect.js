const mongoose = require("mongoose");

async function MongoDbConnect() {
  try {
    await mongoose.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/"
    );
    console.log("Connected to MongoDb");
  } catch (error) {
    console.error("Error in connecting to MongoDb");
  }
}

module.exports = MongoDbConnect;
