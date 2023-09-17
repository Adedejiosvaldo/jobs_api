import jobsRouter from "./routes/jobs";
require("dotenv").config();

import "express-async-errors";
import express from "express";

const app = express();
app.use("/api/v1/", jobsRouter);
const port = 5000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
