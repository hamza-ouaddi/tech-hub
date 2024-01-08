"use server";

import User from "@/database/user.model";
import { databaseConnection } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  SaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Answer from "@/database/answer.model";

export async function createUser(userData: CreateUserParams) {
  try {
    databaseConnection();

    const newUser = await User.create(userData);
    console.log("user data", userData);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserById(params: any) {
  try {
    databaseConnection();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    databaseConnection();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    databaseConnection();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // To delete all data related to user

    // Questions
    /// To get questions

    // const userQuestionIds = await Question.find({ author: user._id }).distinct(
    //   "_id"
    // );

    /// To delete user's questions
    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    databaseConnection();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    // To Skip the number of items while paginating
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortFilterOption = {};

    switch (filter) {
      case "new_users":
        sortFilterOption = { joinedAt: -1 };
        break;
      case "old_users":
        sortFilterOption = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortFilterOption = { reputation: -1 };
        break;
    }

    const users = await User.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortFilterOption);

    // To Check if there is still next page in pagination
    const totalUsers = await User.countDocuments(query);
    const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    databaseConnection();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    databaseConnection();

    const { userId, page = 1, pageSize = 10 } = params;

    // To Skip the number of items while paginating
    const skipAmount = (page - 1) * pageSize;

    const userQuestions = await Question.find({ author: userId })
      .sort({
        views: 1,
        upvotes: -1,
      })
      .skip(skipAmount)
      .limit(pageSize)
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture");

    const totalQuestions = await Question.countDocuments({
      author: userId,
    });

    // To Check if there is still next page in pagination
    const isNext = totalQuestions > skipAmount + userQuestions.length;

    return { totalQuestions, userQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    databaseConnection();

    const { userId, page = 1, pageSize = 10 } = params;

    // To Skip the number of items while paginating
    const skipAmount = (page - 1) * pageSize;

    const userAnswers = await Answer.find({ author: userId })
      .sort({
        upvotes: -1,
      })
      .skip(skipAmount)
      .limit(pageSize)
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");

    const totalAnswers = await Answer.countDocuments({ author: userId });

    // To Check if there is still next page in pagination
    const isNext = totalAnswers > skipAmount + userAnswers.length;

    return { totalAnswers, userAnswers, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function saveQuestion(params: SaveQuestionParams) {
  try {
    databaseConnection();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const isQuestionSaved = user.saved.includes(questionId);

    let updateSaved = {};

    if (isQuestionSaved) {
      updateSaved = { $pull: { saved: questionId } };
    } else {
      updateSaved = { $addToSet: { saved: questionId } };
    }

    await User.findByIdAndUpdate(userId, updateSaved, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    databaseConnection();

    const { clerkId, searchQuery, filter, page = 1, pageSize = 10 } = params;

    // To Skip the number of items while paginating
    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let sortFilterOption = {};

    switch (filter) {
      case "most_recent":
        sortFilterOption = { createdAt: -1 };
        break;
      case "oldest":
        sortFilterOption = { createdAt: 1 };
        break;
      case "most_voted":
        sortFilterOption = { upvotes: -1 };
        break;
      case "most_viewed":
        sortFilterOption = { views: -1 };
        break;
      case "most_answered":
        sortFilterOption = { answers: -1 };
        break;
    }

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortFilterOption,
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    // To Check if there is still next page in pagination
    const isNext = user.saved.length > pageSize;

    if (!user) {
      throw new Error("User not found");
    }

    const savedQuestions = user.saved;

    return { questions: savedQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
