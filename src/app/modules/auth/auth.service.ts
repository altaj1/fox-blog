import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import User from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';
import config from '../../config';

const registerUserIntoDb = async (payload: TUser) => {
  // console.log(payload);
  try {
    const user = await User.create(payload);
    return user;
  } catch (error) {
    throw new AppError(
      httpStatus.CONFLICT,
      'A user with this ID or email already exists.',
    );
  }
};
const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByEmail(payload.email);
  console.log(user, 'db user');

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid credentials');
  }
  const isDeleted = user?.isDeleted;
  const isBlocked = user?.isBlocked;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }
  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }
  if (
    !(await User.isPasswordMatched(payload?.password, user?.password as string))
  )
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials');
  if (user.role !== 'admin' && user.role !== 'user') {
    throw new Error('Invalid role');
  }
  const jwtPayload: {
    email: string;
    role: 'admin' | 'user';
  } = {
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return accessToken;
};
export const AuthServices = {
  registerUserIntoDb,
  loginUser,
};
