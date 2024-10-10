import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { prisma } from "../config/prisma";
import { sendEmail } from "../utils";

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

      const job = await prisma.job.findUnique({
        where: { id: jobId },
        include: { user: true },
      });

      if (job && job.user && job.user.email) {
        const jobCreatorEmail = job.user.email;
        const jobCreatorName = job.user.fullname;

        const subject = "New Application Submitted for Your Job Posting";
        const message = `Dear ${jobCreatorName},\n\nA new application has been submitted for your job posting "${job.title}".\n\nApplicant Name: ${fullname}\nApplicant Email: ${email}\n\nBest regards,\nYour Job Platform`;

        await sendEmail(jobCreatorEmail, subject, message);
      }

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
        include: {
          Job: {
            include: {
              Company: true,
            },
          },
          User: true,
        },
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

  async getAllApplicationByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      // Step 1: Find jobs related to the user
      const jobs = await prisma.job.findMany({
        where: { userId }, // Assuming there's a userId field in the Job model
      });

      if (jobs.length === 0) {
        res.status(httpStatus.NOT_FOUND).json({
          message: "No jobs found for this user",
        });
        return;
      }

      // Extract job IDs
      const jobIds = jobs.map((job) => job.id);

      // Step 2: Find applications related to the job IDs
      const applications = await prisma.application.findMany({
        where: { jobId: { in: jobIds } },
        include: {
          Job: {
            include: {
              Company: true, // Adjust this based on your data model
            },
          },
          User: true,
        },
      });

      if (applications.length === 0) {
        res.status(httpStatus.NOT_FOUND).json({
          message: "No applications found for the jobs of this user",
        });
        return;
      }

      res.status(httpStatus.OK).json(applications);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        error: "An error occurred while fetching applications",
        message: error.message,
      });
    }
  }

  // 4. Update an Application
  async updateApplication(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Update the application in the database
      const updatedApplication = await prisma.application.update({
        where: { id },
        data: updateData,
        include: { User: true }, // Fetch the related user with email
      });

      // Get user email and application status
      const userEmail = updatedApplication.User.email;
      const applicationStatus = updatedApplication.status;

      // Construct the email message based on the application status
      let subject = "";
      let message = "";

      if (applicationStatus === "Approved") {
        subject = "Congratulations! Your Application is Approved";
        message = `Dear ${updatedApplication.User.fullname},\n\nWe are thrilled to inform you that your application has been approved. Congratulations on this achievement! We look forward to have an interview with you soon`;
      } else if (applicationStatus === "Declined") {
        subject = "Update on Your Application";
        message = `Dear ${updatedApplication.User.fullname},\n\nWe regret to inform you that your application has been declined. We encourage you to stay positive and reapply in the future.`;
      }

      // Send email if the status is either Approved or Declined
      if (
        applicationStatus === "Approved" ||
        applicationStatus === "Declined"
      ) {
        await sendEmail(userEmail, subject, message);
      }

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
