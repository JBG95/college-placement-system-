import { Router } from "express";
import { ApplicationCollection } from "./application.collection";
import { validate } from "../middleware";
import {
  createApplicationSchema,
  updateApplicationSchema,
} from "./application.dto";
import { upload } from "../upload/file";

const applicationRouter = Router();
const applicationController = new ApplicationCollection();

// Route to create a new application
applicationRouter.post(
  "/",
  validate(createApplicationSchema),
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
  ]),
  applicationController.createApplication
);

// Route to get all applications
applicationRouter.get("/", applicationController.getAllApplications);

// Route to get an application by ID
applicationRouter.get("/:id", applicationController.getApplicationById);

applicationRouter.get(
  "/user/:id",
  applicationController.getApplicationByUserId
);

// Route to update an application
applicationRouter.put(
  "/:id",
  validate(updateApplicationSchema),
  applicationController.updateApplication
);

// Route to delete an application
applicationRouter.delete("/:id", applicationController.deleteApplication);

export default applicationRouter;
