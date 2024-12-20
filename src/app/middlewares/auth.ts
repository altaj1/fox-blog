import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { JsonWebTokenError } from 'jsonwebtoken';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import User from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    const extractedToken = token.split(' ')[1]; // Extract the token after "Bearer"
    // console.log(extractedToken);
    // checking if the given token is valid
    const decoded = jwt.verify(
      extractedToken,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email, iat } = decoded;
    const user = await User.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
    const isBlocked = user?.isBlocked;

    if (isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
