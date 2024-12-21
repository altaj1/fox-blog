import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import User from '../user/user.model';
import { Blog } from '../blogs/bogs.model';

const blockUserIntoDb = async (userId: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};
const deleteBlogIntoDb = async (blogId: string) => {
  const result = await Blog.findByIdAndDelete(blogId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  return result;
};

export const AdminService = {
  blockUserIntoDb,
  deleteBlogIntoDb,
};
