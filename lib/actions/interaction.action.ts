"use server";

import Question from "@/database/question.model";
import { databaseConnection } from "../mongoose";
import { countQuestionViewsParams } from "./shared.types";
import Intercation from "@/database/interaction.model";

export async function countQuestionViews(params: countQuestionViewsParams) {
  try {
    databaseConnection();

    const { questionId, userId } = params;

    // To update view count
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Intercation.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) {
        console.log("User has already viewed that question");
      }

      await Intercation.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log("interaction error:", error);
    throw error;
  }
}
