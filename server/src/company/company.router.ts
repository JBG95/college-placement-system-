import { Router } from "express";
import { CompanyCollection } from "./company.collection";
import { validate } from "../middleware";
import { createCompanySchema, updateCompanySchema } from "./company.dto";
import { upload } from "../upload/file";

const companyRouter = Router();
const companyController = new CompanyCollection();

companyRouter.post(
  "/",
  upload.single("avatar"),
  validate(createCompanySchema),
  companyController.createCompany
);

companyRouter.get("/", companyController.getAllCompanies);

companyRouter.get("/:id", companyController.getCompanyById);

companyRouter.get("/user/:id", companyController.getAllCompaniesByUserId);

companyRouter.put(
  "/:id",
  validate(updateCompanySchema),
  companyController.updateCompany
);

companyRouter.delete("/:id", companyController.deleteCompany);

export default companyRouter;
