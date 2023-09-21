import { StatusCodes } from "http-status-codes";

import Job from "../models/Job.js";
import { BadRequest, NotFound } from "../errors/index.js";

const getAllJobs = async (req, res) => {
  res.json(req.user);
};
const getJob = async (req, res) => {
  res.send("Single Job Gotten");
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
