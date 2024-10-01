import { Router } from "express";
import { SchoolCollection } from "./school.collection";
import { validate } from "../middleware";
import { createSchoolSchema, updateSchoolSchema } from "./school.dto";

const schoolRouter = Router();
const schoolController = new SchoolCollection();

// Route to create a new school
schoolRouter.post(
  "/",
  validate(createSchoolSchema),
  schoolController.createSchool
);

// Route to get all schools
schoolRouter.get("/", schoolController.getAllSchools);

// Route to get a school by ID
schoolRouter.get("/:id", schoolController.getSchoolById);

// Route to update a school
schoolRouter.put(
  "/:id",
  validate(updateSchoolSchema),
  schoolController.updateSchool
);

// Route to delete a school
schoolRouter.delete("/:id", schoolController.deleteSchool);

export default schoolRouter;
