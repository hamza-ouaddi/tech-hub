import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface GetUserStatsParams {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface SaveQuestionParams {
  userId: string;
  questionId: string;
  path: string;
}

export interface GetSavedQuestionsParams {
  clerkId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface CreateQuestionParams {
  title: string;
  description: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}
export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface GetQuestionByIdParams {
  questionId: string;
}

export interface GetQuestionByTagIdParams {
  tagId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
}

export interface QuestionVoteParams {
  questionId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}

export interface EditQuestionParams {
  questionId: string;
  title: string;
  description: string;
  path: string;
}

export interface DeleteQuestionParams {
  questionId: string;
  path: string;
}

export interface CreateAnswerParams {
  description: string;
  author: string;
  question: string;
  path: string;
}

export interface GetAnswersParams {
  questionId: string;
  sortBy?: string;
  page?: string;
  pageSize?: string;
}

export interface AnswerVoteParams {
  answerId: string;
  userId: string;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  path: string;
}

export interface DeleteAnswerParams {
  answerId: string;
  path: string;
}

export interface GetTopTagsParams {
  userId: string;
  limit?: number;
}

export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface countQuestionViewsParams {
  questionId: string;
  userId: string | undefined;
}
