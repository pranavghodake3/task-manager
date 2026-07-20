import { z } from "zod";

export const addUserSchema = z.object({
  firstName: z
    .string()
    .min(3, 'First Name must be at least 3 characters'),
  lastName: z
    .string()
    .min(3, 'Last Name must be at least 3 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
    // .regex(/[A-Z]/, 'Password must contain at least one uppercase letter'),
  confirm_password: z
    .string()
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"], 
});
