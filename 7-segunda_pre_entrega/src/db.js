import mongoose from "mongoose";
import config from "./config.js";

const { dbUser, dbName, dbPassword } = config;
const database = {
  connect: async () => {
    try {
      await mongoose
        .connect(
          `mongodb+srv://${dbUser}:${dbPassword}@practica-integradora.d7s7guz.mongodb.net/${dbName}?retryWrites=true&w=majority`,
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

export default database;
