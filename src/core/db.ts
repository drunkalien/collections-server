import mongoose from "mongoose";
import config from "../config/config";

const db = mongoose.connection;

db.on("error", () => {
  console.log("Connection Error");
});

db.once("connection", () => {
  console.log("DB connection successful");
});

export default class Database {
  private url = `mongodb://localhost:/${config.MongoPort}/${config.MongoDatabase}`;

  connect() {
    return mongoose.connect(this.url, {}, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}
