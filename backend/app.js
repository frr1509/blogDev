import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import routers from "./routes/index.js";

const port = 3001;
const app = express();

app.use(express.static("../frontend/build"));

app.use(express.json());
app.use(cookieParser());

app.use("/", routers);

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
