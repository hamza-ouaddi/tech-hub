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

import { FilterQuery } from "mongoose";
import Interaction from "@/database/interaction.model";

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

    // To add intercation points after creating question
    await Interaction.create({
      user: author,
      action: "ask_question",
      question: question._id,
      tags: tagDocuments,
    });

    // increment author's reputation by +5 for creating a question
    await User.findByIdAndUpdate(author, { $inc: { reputation: 5 } });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    databaseConnection();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    // To Skip the number of questions while paginating
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortFilterOption = {};

    switch (filter) {
      case "newest":
        sortFilterOption = { createdAt: -1 };
        break;

      case "frequent":
        sortFilterOption = { views: -1 };
        break;

      case "unanswered":
        query.answers = { $size: 0 };
        break;

      default:
        break;
    }

    const questions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortFilterOption);

    // To Check if there is still next page in pagination
    const totalQuestions = await Question.countDocuments(query);
    const isNext = totalQuestions > skipAmount + questions.length;

    return { questions, isNext };
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

    // increment user's reputation by +1 for upvoting
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasUpvoted ? -1 : 1 },
    });

    // increment user's reputation by +10 for recieving upvotes
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasUpvoted ? -10 : 10 },
    });

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

    // increment user's reputation by +1 for downvoting
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasDownvoted ? -1 : 1 },
    });

    // increment user's reputation by +10 for recieving downvotes
    await User.findByIdAndUpdate(question.author, {
      $inc: { reputation: hasDownvoted ? -10 : 10 },
    });

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

    await Interaction.deleteMany({ question: questionId });

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

export async function getTopQuestions() {
  try {
    databaseConnection();

    const topQuestions = await Question.find({})
      .sort({
        views: -1,
        upvotes: -1,
      })
      .limit(5);

    return topQuestions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
