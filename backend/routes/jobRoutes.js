import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { deleteJob, getAllJobs, getEmployerJobs, postJob } from "../controllers/jobController.js";

const jobRouter=express.Router();


 jobRouter.post("/post", isAuthenticated, postJob);
  jobRouter.get("/employer-jobs", isAuthenticated, getEmployerJobs);
    jobRouter.get("/all", getAllJobs);
     jobRouter.delete("/delete/:id", isAuthenticated,deleteJob);

export default jobRouter;