import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().min(3, "First Name must be at least 3 characters"),
  lastName: z.string().min(3, "Last Name must be at least 3 characters"),
});
