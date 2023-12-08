import { z } from "zod";

const createIssueSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title must be at least 1 character" }).max(100, { message: "Title must be less than 100 characters" }),
  description: z.string().min(1, { message: "Description must be at least 1 character" }).max(1000, { message: "Description must be less than 1000 characters" }),
});

export { createIssueSchema };