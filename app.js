require("dotenv").config();
import jobsRouter from "./routes/jobs";
import authRouter from "./routes/auth";

import "express-async-errors";
import express from "express";
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

const app = express();
app.use("/api/v1/", jobsRouter);
app.use("/api/v1/", authRouter);
const port = process.env.PORT || 3000;

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  } catch (error) {}
};

start();
