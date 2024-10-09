import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { prisma } from "../config/prisma";

export class ApplicationCollection {
  async createApplication(req: Request, res: Response): Promise<void> {
    try {
      const {
        fullname,
        email,
        phone,
        jobId,
        userId,
        resume,
        coverLetter,
        experience,
        education,
      } = req.body;

      console.log(req.body);

      const newApplication = await prisma.application.create({
        data: {
          fullname,
          email,
          phone,
          resumeUrl: resume,
          coverLetter: coverLetter || null,
          jobId,
          userId,
          status: "Pending",
          experience,
          education,
        },
      });

      res.status(httpStatus.CREATED).json(newApplication);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while creating the application",
        message: error.message,
      });
    }
  }

  // 2. Get All Applications
  async getAllApplications(_req: Request, res: Response) {
    try {
      const applications = await prisma.application.findMany();
      res.status(httpStatus.OK).json(applications);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while fetching applications",
        message: error.message,
      });
    }
  }

  // 3. Get Application By ID
  async getApplicationById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const application = await prisma.application.findUnique({
        where: { id },
      });

      if (!application) {
        res.status(httpStatus.NOT_FOUND).json({
          message: "Application not found",
        });
        return;
      }

      res.status(httpStatus.OK).json(application);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while fetching the application",
        message: error.message,
      });
    }
  }

  async getApplicationByUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const application = await prisma.application.findMany({
        where: { userId: id },
      });

      if (!application) {
        res.status(httpStatus.NOT_FOUND).json({
          message: "No applications found for this user",
        });
        return;
      }

      res.status(httpStatus.OK).json(application);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while fetching the application",
        message: error.message,
      });
    }
  }

  // 4. Update an Application
  async updateApplication(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedApplication = await prisma.application.update({
        where: { id },
        data: updateData,
      });

      res.status(httpStatus.OK).json(updatedApplication);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while updating the application",
        message: error.message,
      });
    }
  }

  // 5. Delete an Application
  async deleteApplication(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const application = await prisma.application.findUnique({
        where: { id },
      });

      if (!application) {
        res.status(httpStatus.NOT_FOUND).json({
          message: "Application not found",
        });
        return;
      }

      await prisma.application.delete({
        where: { id },
      });

      res.status(httpStatus.OK).json({
        message: "Application deleted successfully",
      });
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while deleting the application",
        message: error.message,
      });
    }
  }
}
