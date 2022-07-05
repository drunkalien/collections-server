import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import collectionRouter from "./routes/collection";
import itemRouter from "./routes/item";
import userRouter from "./routes/user";
import searchRouter from "./routes/search";
import adminRouter from "./routes/admin";
import customFieldsRouter from "./routes/customFields";
import commentRouter from "./routes/comment";

const cloudinary = require("cloudinary");

const app = express();
const BASE = "/api/v1";

cloudinary.config({
  cloud_name: "dbpb9xu8f",
  api_key: "474424751979154",
  api_secret: "FlE3Q9SYC0YNko5izRrwNwM7BD4",
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(`${BASE}/collections`, collectionRouter);
app.use(`${BASE}/items`, itemRouter);
app.use(`${BASE}/users`, userRouter);
app.use(`${BASE}/`, searchRouter);
app.use(`${BASE}/admins`, adminRouter);
app.use(`${BASE}/custom-fields`, customFieldsRouter);
app.use(`${BASE}/comments`, commentRouter);

export default app;
