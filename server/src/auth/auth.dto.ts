import { z } from "zod";
import { IUser } from "../types/index";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .min(5, { message: "Email is required" }),
  password: z.string().min(8, { message: "Password is required" }),
});

export const registerSchema = z.object<IUser | any>({
  username: z
    .string()
    .min(2, { message: "Name cannot be less than 2 characters" }),
  fullname: z
    .string()
    .min(2, { message: "Full name cannot be less than 2 characters" }),
  email: z.string().email().min(5, {
    message: "Please enter a valid email",
  }),
  phone: z
    .string()
    .min(10, { message: "Phone no. cannot be less than 10 characters" }),
  password: z
    .string()
    .min(8, { message: "Password cannot be less than 8 characters" })
    .max(20, { message: "Password cannot be more than 20 characters" }),
});

export const updateSchema = z.object<IUser | any>({
  username: z
    .string()
    .min(2, { message: "Name cannot be less than 2 characters" }),
  fullname: z
    .string()
    .min(2, { message: "Full name cannot be less than 2 characters" }),
  email: z.string().email().min(5, {
    message: "Please enter a valid email",
  }),
  phone: z
    .string()
    .min(10, { message: "Phone no. cannot be less than 10 characters" }),
  password: z
    .string()
    .min(8, { message: "Password cannot be less than 8 characters" })
    .max(20, { message: "Password cannot be more than 20 characters" }),
  role: z.enum(["Admin", "Creator", "User"], {
    message: "Role must be either 'Customer' or 'Seller'",
  }),
});

export const updateRoleSchema = z.object<IUser | any>({
  role: z.enum(["Admin", "Creator", "User"], {
    message: "Role must be either 'Creator' or 'User'",
  }),
});
