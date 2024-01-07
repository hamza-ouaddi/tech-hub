"use server";

import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import User from "@/database/user.model";
import Tag from "@/database/tag.model";
import { databaseConnection } from "../mongoose";
import { SearchParams } from "./shared.types";

// Global Search in all types (questions, answers, users, tags)
export async function globalSearch(params: SearchParams) {
  try {
    databaseConnection();

    const { query, type } = params;

    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: Answer, searchField: "description", type: "answer" },
      { model: User, searchField: "name", type: "user" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const availableTypes = ["question", "answer", "user", "tag"];

    const typeToLow = type?.toLocaleLowerCase();

    if (!typeToLow || !availableTypes.includes(typeToLow)) {
      // To search in everything at once
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answer containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                  ? item.question
                  : item._id,
          }))
        );
      }
    } else {
      // To seach in a specific model
      const modelSearch = modelsAndTypes.find((item) => item.type === type);

      if (!modelSearch) {
        throw new Error("Invalid search type");
      }

      const queryResults = await modelSearch.model
        .find({ [modelSearch.searchField]: regexQuery })
        .limit(8);

      results = queryResults.map((item) => ({
        title:
          type === "answer"
            ? `Answer containing ${query}`
            : item[modelSearch.searchField],

        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
              ? item.question
              : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
