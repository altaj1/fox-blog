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
    data: null,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const result = await AdminService.deleteBlogIntoDb(blogId);
  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const AdminController = {
  blockUser,
  deleteBlog,
};
