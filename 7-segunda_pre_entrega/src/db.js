import mongoose from "mongoose";
import config from "./config.js";

const { database } = config;
const db = {
  connect: async () => {
    try {
      await mongoose
        .connect(
          `mongodb+srv://${database.dbUser}:${database.dbPassword}@practica-integradora.d7s7guz.mongodb.net/${database.dbName}?retryWrites=true&w=majority`,
          { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then(() => {
          console.log("Connected to MongoDB");
        });
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  },
};

export default db;
