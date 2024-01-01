"use server";

import Answer from "@/database/answer.model";
import { databaseConnection } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Intercation from "@/database/interaction.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    databaseConnection();
    const { author, description, question, path } = params;

    const newAnswer = await Answer.create({
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

export async function getAnswers(params: GetAnswersParams) {
  try {
    databaseConnection();

    const { questionId } = params;

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    databaseConnection();

    const { answerId, userId, hasUpvoted, hasDownvoted, path } = params;

    let updateVote = {};

    if (hasUpvoted) {
      updateVote = { $pull: { upvotes: userId } };
    } else if (hasDownvoted) {
      updateVote = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateVote = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateVote, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    databaseConnection();
    const { answerId, userId, hasUpvoted, hasDownvoted, path } = params;

    let updateVote = {};

    if (hasDownvoted) {
      updateVote = { $pull: { downvotes: userId } };
    } else if (hasUpvoted) {
      updateVote = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateVote = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateVote, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    databaseConnection();

    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    await Answer.deleteOne({ _id: answerId });

    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    );

    await Intercation.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
