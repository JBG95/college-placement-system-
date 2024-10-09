import { Router } from "express";
import { CompanyCollection } from "./company.collection";
import { validate } from "../middleware";
import { createCompanySchema, updateCompanySchema } from "./company.dto";
import { uploadImage } from "../uploadsfolder/file";

const companyRouter = Router();
const companyController = new CompanyCollection();

companyRouter.post(
  "/create",
  uploadImage.single("avatar"),
  validate(createCompanySchema),
  companyController.createCompany
);

companyRouter.get("/all", companyController.getAllCompanies);

companyRouter.get("/one/:id", companyController.getCompanyById);

companyRouter.get("/user/:id", companyController.getAllCompaniesByUserId);

companyRouter.put(
  "/:id",
  validate(updateCompanySchema),
  companyController.updateCompany
);

companyRouter.delete("/:id", companyController.deleteCompany);

export default companyRouter;
