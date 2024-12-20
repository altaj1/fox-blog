import catchAsync from '../../../utils/catchAsync';
import { AdminService } from './admin.service';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await AdminService.blockUserIntoDb(userId);
  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const AdminController = {
  blockUser,
};
