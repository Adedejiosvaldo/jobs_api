import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";

import jobsRouter from "./routes/jobs.js";
import authRouter from "./routes/auth.js";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";

const app = express();
// middleware
app.use(express.json());
app.use("/api/v1/jobs/", jobsRouter);
app.use("/api/v1/auth/", authRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
