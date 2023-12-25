"use server";

import Answer from "@/database/answer.model";
import { databaseConnection } from "../mongoose";
import { CreateAnswerParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    databaseConnection();
    const { author, description, question, path } = params;

    const newAnswer = new Answer({
      author,
      description,
      question,
    });

    // To add new answers to question model
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
