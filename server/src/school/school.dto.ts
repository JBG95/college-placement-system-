import { z } from "zod";

export const createSchoolSchema = z.object({
  name: z
    .string()
    .min(2, { message: "School name must be at least 2 characters" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  program: z
    .string()
    .min(3, { message: "Program name must be at least 3 characters" }),
  year: z.string().min(4, { message: "Year must be a valid year" }),
  userId: z.string().optional(),
});

export const schoolResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  program: z.string(),
  year: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().nullable(),
});

export const updateSchoolSchema = z.object({
  name: z
    .string()
    .min(2, { message: "School name must be at least 2 characters" })
    .optional(),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" })
    .optional(),
  program: z
    .string()
    .min(3, { message: "Program name must be at least 3 characters" })
    .optional(),
  year: z.string().min(4, { message: "Year must be a valid year" }).optional(),
  userId: z.string().optional(),
});
