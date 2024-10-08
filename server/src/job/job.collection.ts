import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { prisma } from "../config/prisma";

export class JobCollection {
  // 1. Create a new Job
  async createJob(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        requirements,
        salaryRange,
        type,
        work,
        listing,
        location,
        deadline,
        userId,
        companyId,
      } = req.body;

      console.log(req.body);

      const newJob = await prisma.job.create({
        data: {
          title,
          description,
          requirements,
          salaryRange,
          type,
          work,
          listing,
          location,
          deadline,
          userId,
          companyId,
        },
      });

      res.status(httpStatus.CREATED).json(newJob);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while creating the job",
        message: error.message,
      });
    }
  }

  // 2. Get All Jobs
  async getAllJobs(_req: Request, res: Response) {
    try {
      const jobs = await prisma.job.findMany();
      res.status(httpStatus.OK).json(jobs);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while fetching jobs",
        message: error.message,
      });
    }
  }

  // 3. Get Job By ID
  async getJobById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const job = await prisma.job.findUnique({
        where: { id },
      });

      if (!job) {
        res.status(httpStatus.NOT_FOUND).json({
          message: "Job not found",
        });
        return;
      }

      res.status(httpStatus.OK).json(job);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while fetching the job",
        message: error.message,
      });
    }
  }

  async getJobByUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const job = await prisma.job.findMany({
        where: { userId: id },
      });

      res.status(httpStatus.OK).json(job);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while fetching the job",
        message: error.message,
      });
    }
  }
  // 4. Update a Job
  async updateJob(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedJob = await prisma.job.update({
        where: { id },
        data: updateData,
      });

      res.status(httpStatus.OK).json(updatedJob);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while updating the job",
        message: error.message,
      });
    }
  }

  // 5. Delete a Job
  async deleteJob(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const job = await prisma.job.findUnique({
        where: { id },
      });

      if (!job) {
        res.status(httpStatus.NOT_FOUND).json({
          message: "Job not found",
        });
        return;
      }

      await prisma.job.delete({
        where: { id },
      });

      res.status(httpStatus.OK).json({
        message: "Job deleted successfully",
      });
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while deleting the job",
        message: error.message,
      });
    }
  }
}
