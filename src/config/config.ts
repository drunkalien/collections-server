import dotenv from "dotenv";

dotenv.config();

type Config = {
  HttpPort: string;
  MongoPort: string;
  MongoDatabase: string;
  JwtSecret: string;
};

const config: Config = {
  HttpPort: getConf("PORT", "5000"),
  MongoPort: getConf("MONGO_PORT", "27217"),
  MongoDatabase: getConf("MONGO_DATABASE", "Task7"),
  JwtSecret: getConf("JWT_SECRET", "secret"),
};

function getConf(name: string, def: string): string {
  if (process.env[name]) {
    return process.env[name] || "";
  }

  return def;
}

export default config;
