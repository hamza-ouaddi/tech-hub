import * as z from "zod";

export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters." })
    .max(130, { message: "Title must not have more than 130 characters." }),
  description: z
    .string()
    .min(100, { message: "Description must be at least 64 characters." }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "A tag must have at least 1 character." })
        .max(15, { message: "A tag must not have more than 15 characters." })
    )
    .min(1, { message: "You must add at least 1 tag." })
    .max(3, { message: "Maximum 3 tags." }),
});
