import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { BlogService } from './blogs.service';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';
import { Types, Schema } from 'mongoose';
const createBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.createBlogIntoDb(req.user, req.body);
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.updateBlogFormDb(
    req.params.id,
    req.user,
    req.body,
  );

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
};
