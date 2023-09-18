const getAllJobs = async (req, res) => {
  res.send("All Jobs");
};
const getJob = async (req, res) => {
  res.send("Single Job Gotten");
};
const createJob = async (req, res) => {
  res.send("Job created sucessfully");
};
const updateJob = async (req, res) => {
  res.send("Updated Job sucessfully");
};
const deleteJob = async (req, res) => {
  res.send("Deleted Job sucessfully");
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
