// packages
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import express from "express";
import xss from "xss-clean";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

// imports
import jobsRouter from "./routes/jobs.js";
import authRouter from "./routes/auth.js";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";
import authentificationMiddleWare from "./middleware/authentication.js";

//Swagger
import SwaggerUI from "swagger-ui-express";
import YAML from "yamljs";
const swagerDocument = YAML.load("./swagger.yaml");
const app = express();

app.use(express.json());

// middleware
// seccurity middleware
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, //Limit each IP to 100 requests per windowMS
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

const port = process.env.PORT || 5000;

//Main express app

//routers
app.use("/api/v1/jobs/", authentificationMiddleWare, jobsRouter);
app.use("/api/v1/auth/", authRouter);

app.use("api-docs", SwaggerUI.serve, SwaggerUI.setup(swagerDocument));

app.get("/", (req, res) => {
  res.send('<h1>Jobs Api</h1><a href="/api-doc">Documentation</a>' );
});

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

app.use(errorHandlerMiddleware);
app.use(notFound);

start();
