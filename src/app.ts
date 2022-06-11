import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://loclahost:3000",
  })
);

app.use(express.json());

export default app;
