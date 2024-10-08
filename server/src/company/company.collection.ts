import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { prisma } from "../config/prisma";

export class CompanyCollection {
  // 1. Create a new Company
  async createCompany(req: Request, res: Response): Promise<void> {
    try {
      const { name, address, description, email, phone, userId, avatar } =
        req.body;

      console.log(req.body);

      // Create a new company record
      const newCompany = await prisma.company.create({
        data: {
          name,
          address,
          description,
          email,
          phone,
          userId,
          avatar,
        },
      });

      res.status(httpStatus.CREATED).json(newCompany);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while creating the company",
        message: error.message,
      });
    }
  }

  // 2. Get All Companies
  async getAllCompanies(_req: Request, res: Response) {
    try {
      const companies = await prisma.company.findMany();
      res.status(httpStatus.OK).json(companies);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while fetching companies",
        message: error.message,
      });
    }
  }

  // 3. Get All Companies
  async getAllCompaniesByUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log(id);

      const company = await prisma.company.findMany({
        where: { userId: id },
      });
      res.status(httpStatus.OK).json(company);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while fetching companies",
        message: error.message,
      });
    }
  }

  // 4. Get Company By ID
  async getCompanyById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const company = await prisma.company.findUnique({
        where: { id },
      });

      if (!company) {
        res.status(httpStatus.NOT_FOUND).json({
          message: "Company not found",
        });
        return;
      }

      res.status(httpStatus.OK).json(company);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while fetching the company",
        message: error.message,
      });
    }
  }

  // 5. Update a Company
  async updateCompany(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, address, description, email, phone } = req.body;

      const updatedCompany = await prisma.company.update({
        where: { id },
        data: {
          name,
          address,
          description,
          email,
          phone,
        },
      });

      res.status(httpStatus.OK).json(updatedCompany);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while updating the company",
        message: error.message,
      });
    }
  }

  // 6. Delete a Company
  async deleteCompany(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const company = await prisma.company.findUnique({
        where: { id },
      });

      if (!company) {
        res.status(httpStatus.NOT_FOUND).json({
          message: "Company not found",
        });
        return;
      }

      await prisma.company.delete({
        where: { id },
      });

      res.status(httpStatus.OK).json({
        message: "Company deleted successfully",
      });
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while deleting the company",
        message: error.message,
      });
    }
  }
}
