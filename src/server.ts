import app from "./app";
import DB from "./core/db";
import config from "./config/config";

(async () => {
  const db = new DB();
  db.connect();

  app.listen(config.HttpPort, () => {
    `app is running on port ${config.HttpPort}`;
  });
})();
