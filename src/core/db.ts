import mongoose from "mongoose";
import config from "../config/config";

const db = mongoose.connection;

db.on("error", () => {
  console.log("Connection Error");
});

db.once("open", () => {
  console.log("DB connection successful");
});

export default class Database {
  private url = `mongodb+srv://drunkalien:j20011703b@cluster0.vqedw.mongodb.net/?retryWrites=true&w=majority/${config.MongoDatabase}`;

  connect() {
    return mongoose.connect(this.url, {}, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}
