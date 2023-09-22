import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors/index.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  let CustomError = {
    //default error object
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, PLease try again later",
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err.code && err.code === 11000) {
    CustomError.message = `${Object.keys(
      err.keyValue
    )} has been used already. Please choose another email address`;
    CustomError.statusCode = 400;
  }

  return res.status(CustomError.statusCode).json({ msg: CustomError.message });
};

export default errorHandlerMiddleware;
//
