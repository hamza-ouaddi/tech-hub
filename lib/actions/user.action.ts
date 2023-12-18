"use server";

import User from "@/database/user.model";
import { databaseConnection } from "../mongoose";

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
