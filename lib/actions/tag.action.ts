"use server";

import User from "@/database/user.model";
import { databaseConnection } from "../mongoose";
import { GetAllTagsParams, GetTopTagsParams } from "./shared.types";
import { Error } from "mongoose";
import Tag from "@/database/tag.model";

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
