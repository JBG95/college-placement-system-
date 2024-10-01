import { Router } from "express";
import { JobCollection } from "./job.collection";
import { validate } from "../middleware";
import { createJobSchema, updateJobSchema } from "./job.dto";

const jobRouter = Router();
const jobController = new JobCollection();

jobRouter.post("/", validate(createJobSchema), jobController.createJob);

jobRouter.get("/", jobController.getAllJobs);

jobRouter.get("/:id", jobController.getJobById);

jobRouter.put("/:id", validate(updateJobSchema), jobController.updateJob);

jobRouter.delete("/:id", jobController.deleteJob);

export default jobRouter;
