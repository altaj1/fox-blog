import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { TUserRole } from '../modules/user/user.interface';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, {
  JwtPayload,
  JsonWebTokenError,
  TokenExpiredError,
} from 'jsonwebtoken';
import config from '../config';
import User from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token || !token.startsWith('Bearer ')) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'Authorization token missing Bearer or invalid!',
        );
      }

      const extractedToken = token.split(' ')[1];

      // Verify and decode the token
      const decoded = jwt.verify(
        extractedToken,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, email } = decoded;

      const user = await User.isUserExistsByEmail(email);
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
      }

      if (user.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'User account is deleted!');
      }

      if (user.isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, 'User account is blocked!');
      }

      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          'You do not have the required permissions!',
        );
      }

      req.user = decoded;

      next();
    } catch (error) {
      if (
        error instanceof JsonWebTokenError ||
        error instanceof TokenExpiredError
      ) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'Invalid or expired token!',
        );
      }
      throw error;
    }
  });
};

export default auth;
