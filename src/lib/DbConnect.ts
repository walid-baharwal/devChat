import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

async function DbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to Database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log("Error connecting to Database");
    process.exit(1);
  }
}

export default DbConnect;
