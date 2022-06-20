import express from "express";
import cors from "cors";
import collectionRouter from "./routes/collection";
import itemRouter from "./routes/item";
import userRouter from "./routes/user";

const app = express();
const BASE = "/api/v1";

app.use(
  cors({
    origin: "http://loclahost:3000",
  })
);

app.use(express.json());

app.use(`${BASE}/collections`, collectionRouter);
app.use(`${BASE}/items`, itemRouter);
app.use(`${BASE}/users`, userRouter);

export default app;
