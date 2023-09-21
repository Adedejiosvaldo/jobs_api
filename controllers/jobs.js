import { StatusCodes } from "http-status-codes";

import Job from "../models/Job.js";
import { BadRequest, NotFound } from "../errors/index.js";

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort(
    "-createdAt"
  );
  if (!jobs) {
    throw new BadRequest("No Job exists");
  }
  res.status(StatusCodes.OK).json({ jobs });
};
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFound("Job does not exist");
  }

  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  res.send("Updated Job sucessfully");
};
const deleteJob = async (req, res) => {
  res.send("Deleted Job sucessfully");
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
