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

export const AnswerSchema = z.object({
  answer: z
    .string()
    .min(16, { message: "Answer must be at least 16 characters." }),
});

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters." })
    .max(50, { message: "Name must not have more than 50 characters." }),
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters." })
    .max(50, { message: "Username must not have more than 50 characters." }),
  personalWebsite: z.string().url(),
  location: z
    .string()
    .min(5, { message: "Location must be at least 5 characters." })
    .max(50, { message: "Location must not have more than 50 characters." }),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters.")
    .max(150, { message: "Bio must not have more than 150 characters." }),
});
