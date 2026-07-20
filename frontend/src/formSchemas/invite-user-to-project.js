import { z } from "zod";

export const inviteUserToProjectSchema = z.object({
  userId: z.coerce
    .number({ invalid_type_error: 'Please select a User.' })
    .gt(0, 'Please select a User.'),
  roleId: z.coerce
    .number({ invalid_type_error: 'Please select a Role.' })
    .gt(0, 'Please select a Role.'),
  jobTitleId: z.coerce
    .number({ invalid_type_error: 'Please select a Job Title.' })
    .gt(0, 'Please select a Job Title.'),
});
