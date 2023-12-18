"use server";

import { databaseConnection } from "../mongoose";

export async function createQuestion(params) {
  // eslint-disable-next-line no-empty
  try {
    databaseConnection();
  } catch (error) {}
}
