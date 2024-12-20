import { JwtPayload } from 'jsonwebtoken';
import { TUser } from '../user/user.interface';
import { TBlog, TBlogUpdate } from './blogs.interface';
import { Blog } from './bogs.model';
import User from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { isPopulatedAuthor } from './blog.utils';

const createBlogIntoDb = async (user: JwtPayload, payload: TBlog) => {
  const userData = await User.findOne({ email: user?.email });
  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User does not exist');
  }
  const blogData = {
    ...payload,
    author: userData._id,
  };
  const result = await Blog.create(blogData);
  const populatedBlog = await Blog.findById(result._id)
    .select('_id title content author')
    .populate('author', '_id email name role');
  console.log(populatedBlog);
  if (!populatedBlog) {
    throw new Error('Blog not found');
  }
  return populatedBlog;
};

const updateBlogFormDb = async (
  blogId: string,
  user: JwtPayload,
  payload: TBlogUpdate,
) => {
  const email = user.email;
  const { title, content } = payload;
  const blog = await Blog.findById(blogId)
    .select('_id title content author')
    .populate('author', '_id email name role');
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  if (!isPopulatedAuthor(blog.author)) {
    throw new Error('You are not authorized to update this blog');
  }
  if (blog.author?.email !== email) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to update this blog',
    );
  }

  if (title) blog.title = title;
  if (content) blog.content = content;

  // Save the updated blog
  const updatedBlog = await blog.save();

  return updatedBlog;
};

const deleteBlogFormDB = async (blogId: string, user: JwtPayload) => {
  const email = user.email;
  const blog = await Blog.findById(blogId)
    .select('_id title content author')
    .populate('author', '_id email name role');
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  if (!isPopulatedAuthor(blog.author)) {
    throw new Error('You are not authorized to delete this blog');
  }
  if (blog.author?.email !== email) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not authorized to delete this blog',
    );
  }
  const result = await Blog.findByIdAndDelete(blogId);
  return result;
};

const getAllBlogsFormDb = async (querys: any) => {
  const { search, sortBy = 'createdAt', sortOrder = 'desc', filter } = querys;
  const query: any = {};
  if (search) {
    const regex = new RegExp(search as string, 'i');
    query.$or = [{ title: regex }, { content: regex }];
  }
  if (filter) {
    query.author = filter;
  }
  const sort: Record<string, 1 | -1> = {
    [sortBy as string]: sortOrder === 'asc' ? 1 : -1,
  };
  const blogs = await Blog.find(query)
    .sort(sort)
    .select('_id title content author')
    .populate('author', '_id email name role');
  return blogs;
};

export const BlogService = {
  createBlogIntoDb,
  updateBlogFormDb,
  deleteBlogFormDB,
  getAllBlogsFormDb,
};
