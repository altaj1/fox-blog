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

      // Check if token exists and starts with "Bearer"
      if (!token || !token.startsWith('Bearer ')) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'Authorization token missing Bearer or invalid!',
        );
      }

      // Extract the token
      const extractedToken = token.split(' ')[1];

      // Verify and decode the token
      const decoded = jwt.verify(
        extractedToken,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      const { role, email } = decoded;

      // Verify if the user exists
      const user = await User.isUserExistsByEmail(email);
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
      }

      // Check if the user is deleted
      if (user.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'User account is deleted!');
      }

      // Check if the user is blocked
      if (user.isBlocked) {
        throw new AppError(httpStatus.FORBIDDEN, 'User account is blocked!');
      }

      // Check for role-based access if roles are required
      if (requiredRoles.length && !requiredRoles.includes(role)) {
        throw new AppError(
          httpStatus.FORBIDDEN,
          'You do not have the required permissions!',
        );
      }

      // Attach user details to the request object
      req.user = decoded;

      // Proceed to the next middleware or route handler
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
