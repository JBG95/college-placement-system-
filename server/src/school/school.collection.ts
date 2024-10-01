import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { prisma } from "../config/prisma"; // Assuming you have prisma set up

export class SchoolCollection {
  // 1. Create a new School
  async createSchool(req: Request, res: Response) {
    try {
      const { name, address, program, year, userId } = req.body;

      const newSchool = await prisma.school.create({
        data: {
          name,
          address,
          program,
          year,
          userId,
        },
      });

      res.status(httpStatus.CREATED).json(newSchool);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while creating the school",
        message: error.message,
      });
    }
  }

  // 2. Get All Schools
  async getAllSchools(_req: Request, res: Response) {
    try {
      const schools = await prisma.school.findMany();
      res.status(httpStatus.OK).json(schools);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while fetching schools",
        message: error.message,
      });
    }
  }

  // 3. Get School By ID
  async getSchoolById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const school = await prisma.school.findUnique({
        where: { id },
      });

      if (!school) {
        res.status(httpStatus.NOT_FOUND).json({
          message: "School not found",
        });
        return;
      }

      res.status(httpStatus.OK).json(school);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while fetching the school",
        message: error.message,
      });
    }
  }

  // 4. Update a School
  async updateSchool(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedSchool = await prisma.school.update({
        where: { id },
        data: updateData,
      });

      res.status(httpStatus.OK).json(updatedSchool);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while updating the school",
        message: error.message,
      });
    }
  }

  // 5. Delete a School
  async deleteSchool(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const school = await prisma.school.findUnique({
        where: { id },
      });

      if (!school) {
        res.status(httpStatus.NOT_FOUND).json({
          message: "School not found",
        });
        return;
      }

      await prisma.school.delete({
        where: { id },
      });

      res.status(httpStatus.OK).json({
        message: "School deleted successfully",
      });
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while deleting the school",
        message: error.message,
      });
    }
  }
}
