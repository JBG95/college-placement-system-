import { Router } from "express";
import { JobCollection } from "./job.collection";
import { validate } from "../middleware";
import { createJobSchema, updateJobSchema } from "./job.dto";

const jobRouter = Router();
const jobController = new JobCollection();

jobRouter.post("/create", validate(createJobSchema), jobController.createJob);

jobRouter.get("/all", jobController.getAllJobs);

jobRouter.get("/one/:id", jobController.getJobById);

jobRouter.get("/user/:id/jobs", jobController.getJobByUserId);

jobRouter.put("/:id", validate(updateJobSchema), jobController.updateJob);

jobRouter.delete("/:id", jobController.deleteJob);

export default jobRouter;
