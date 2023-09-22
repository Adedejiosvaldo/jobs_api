import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors/index.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  let CustomError = {
    //default error object
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, PLease try again later",
  };

  //   if (err instanceof CustomAPIError) {
  //     return res.status(err.statusCode).json({ msg: err.message });
  //   }

  if (err.name === "ValidationError") {
    CustomError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");

    CustomError.statusCode = 400;
  }

  if (err.name === "CastError") {
    CustomError.message = `No item found with ID ${err.value}`;
    CustomError.statusCode = 404;
  }

  if (err.code && err.code === 11000) {
    CustomError.message = `${Object.keys(
      err.keyValue
    )} has been used already. Please choose another value`;
    CustomError.statusCode = 400;
  }

  //   return res.status(CustomError.statusCode).json({ err });
  return res.status(CustomError.statusCode).json({ msg: CustomError.message });
};

export default errorHandlerMiddleware;
//
