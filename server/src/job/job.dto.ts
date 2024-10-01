import { z } from "zod";

export const jobTypeEnum = z.enum(["Internship", "Parttime", "Permanent"]);
export const workTypeEnum = z.enum(["Remote", "Onsite"]);

export const createJobSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Job title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Job description must be at least 10 characters" }),
  requirements: z
    .array(z.string())
    .min(1, { message: "At least one requirement is needed" }),
  salaryRange: z.string().optional(),
  type: jobTypeEnum,
  work: workTypeEnum,
  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters" }),
  applicationDeadline: z.date({ message: "Please provide a valid date" }),
  userId: z.string().optional(),
});

export const jobResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  requirements: z.array(z.string()),
  salaryRange: z.string().nullable(),
  type: jobTypeEnum,
  work: workTypeEnum,
  location: z.string(),
  applicationDeadline: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().nullable(),
});

export const updateJobSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Job title must be at least 3 characters" })
    .optional(),
  description: z
    .string()
    .min(10, { message: "Job description must be at least 10 characters" })
    .optional(),
  requirements: z
    .array(z.string())
    .min(1, { message: "At least one requirement is needed" })
    .optional(),
  salaryRange: z.string().optional(),
  type: jobTypeEnum.optional(),
  work: workTypeEnum.optional(),
  location: z
    .string()
    .min(3, { message: "Location must be at least 3 characters" })
    .optional(),
  applicationDeadline: z
    .date({ message: "Please provide a valid date" })
    .optional(),
  userId: z.string().optional(),
});
