import express from "express";
import cors from "cors";
import collectionRouter from "./routes/collection";

const app = express();

app.use(
  cors({
    origin: "http://loclahost:3000",
  })
);

app.use(express.json());

app.use("/api/v1/collections", collectionRouter);

export default app;
