import { z } from "zod";

export const applicationStatusEnum = z.enum([
  "Pending",
  "Approved",
  "Declined",
]);

export const createApplicationSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" }),
  jobId: z.string(),
  userId: z.string(),
});

export const applicationResponseSchema = z.object({
  id: z.string(),
  fullname: z.string(),
  email: z.string(),
  phone: z.string(),
  status: applicationStatusEnum,
  coverLetter: z.string().nullable(),
  resumeUrl: z.string(),
  appliedAt: z.date(),
  jobId: z.string(),
  userId: z.string(),
});

export const updateApplicationSchema = z.object({
  fullname: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email" }).optional(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .optional(),
  coverLetter: z.string().optional(),
  resumeUrl: z
    .string()
    .url({ message: "Please provide a valid resume URL" })
    .optional(),
  status: applicationStatusEnum.optional(),
  jobId: z.string().optional(),
  userId: z.string().optional(),
});
