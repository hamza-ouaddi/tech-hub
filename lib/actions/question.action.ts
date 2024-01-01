"use server";

import Question from "@/database/question.model";
import { databaseConnection } from "../mongoose";
import Tag from "@/database/tag.model";
import {
  CreateQuestionParams,
  DeleteQuestionParams,
  EditQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
  QuestionVoteParams,
} from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import Intercation from "@/database/interaction.model";

export async function createQuestion(params: CreateQuestionParams) {
  try {
    databaseConnection();

    const { title, description, tags, author, path } = params;

    const question = await Question.create({
      title,
      description,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existedTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existedTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {}
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    databaseConnection();

    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort({
        createdAt: -1,
      });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    databaseConnection();

    const { questionId } = params;

    const question = await Question.findById(questionId)
      .populate({
        path: "tags",
        model: Tag,
        select: "_id name",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteQuestion(params: QuestionVoteParams) {
  try {
    databaseConnection();

    const { questionId, userId, hasUpvoted, hasDownvoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateVote, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteQuestion(params: QuestionVoteParams) {
  try {
    databaseConnection();
    const { questionId, userId, hasUpvoted, hasDownvoted, path } = params;

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

    const question = await Question.findByIdAndUpdate(questionId, updateVote, {
      new: true,
    });

    if (!question) {
      throw new Error("Question not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editQuestion(params: EditQuestionParams) {
  try {
    databaseConnection();

    const { questionId, title, description, path } = params;

    const question = await Question.findById(questionId).populate("tags");

    if (!question) {
      throw new Error("Question not found");
    }

    question.title = title;
    question.description = description;

    await question.save();

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteQuestion(params: DeleteQuestionParams) {
  try {
    databaseConnection();

    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });

    await Answer.deleteMany({ question: questionId });

    await Intercation.deleteMany({ question: questionId });

    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
