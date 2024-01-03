"use server";

import User from "@/database/user.model";
import { databaseConnection } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionByTagIdParams,
  GetTopTagsParams,
} from "./shared.types";
import { Error, FilterQuery } from "mongoose";
import Tag, { ITag } from "@/database/tag.model";
import Question from "@/database/question.model";

export async function getTopTags(params: GetTopTagsParams) {
  try {
    databaseConnection();

    const { userId } = params;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // To collect tags that user have been interacted with more

    // For test
    return [
      { _id: "1", name: "Next.js" },
      { _id: "2", name: "React" },
      { _id: "3", name: "UI/UX" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    databaseConnection();
    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionByTagId(params: GetQuestionByTagIdParams) {
  try {
    databaseConnection();

    const { tagId, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPopularTags() {
  try {
    databaseConnection();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 6 },
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
