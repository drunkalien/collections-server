import express from "express";
import cors from "cors";
import collectionRouter from "./routes/collection";
import itemRouter from "./routes/item";

const app = express();

app.use(
  cors({
    origin: "http://loclahost:3000",
  })
);

app.use(express.json());

app.use("/api/v1/collections", collectionRouter);
app.use("/api/v1/items", itemRouter);

export default app;
