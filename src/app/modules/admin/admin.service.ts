import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import User from '../user/user.model';

const blockUserIntoDb = async (userId: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true }, // Return the updated document
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

export const AdminService = {
  blockUserIntoDb,
};
