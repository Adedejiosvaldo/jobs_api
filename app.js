import jobsRouter from "./routes/jobs";
require("dotenv").config();

import "express-async-errors";
import express from "express";

const app = express();
app.use("/api/v1/", jobsRouter);
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello World!"));

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  } catch (error) {}
};

start();
