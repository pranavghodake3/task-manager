import z from "zod";

export const createOrEditTaskSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters'),
  description: z
    .string(),
  userId: z.coerce
    .number({ invalid_type_error: 'Please select a User.' }),
  statusId: z.coerce
    .number({ invalid_type_error: 'Please select a Status.' }),
  priorityId: z.coerce
    .number({ invalid_type_error: 'Please select a Priority.' }),
});
