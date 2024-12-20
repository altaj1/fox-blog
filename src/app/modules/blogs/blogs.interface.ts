import { Types } from 'mongoose';

export interface TAuthor {
  _id: string | Types.ObjectId;
  email: string;
  name: string;
  role: string;
}

export type TBlog = {
  title: string;
  content: string;
  author?: Types.ObjectId | TAuthor;
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
export type TBlogUpdate = {
  title?: string;
  content?: string;
};
