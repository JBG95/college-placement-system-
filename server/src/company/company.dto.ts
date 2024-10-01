import { z } from "zod";

export const createCompanySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z
    .string()
    .min(10, { message: "Phone must be at least 10 characters" }),
  services: z
    .array(z.string())
    .min(1, { message: "At least one service is required" }),
  userId: z.string(),
});

export const updateCompanySchema = z.object({
  name: z.string(),
  address: z.string(),
  email: z.string().email("Invalid email format"),
  phone: z.string(),
  description: z.string(),
  services: z
    .array(z.string())
    .min(1, { message: "At least one service is required" }),
});

export const companyResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  description: z.string(),
  email: z.string(),
  phone: z.string(),
  services: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().nullable(),
});
