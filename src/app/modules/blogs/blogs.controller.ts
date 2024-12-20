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
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.deleteBlogFormDB(req.params.id, req.user);

  sendResponse(res, {
    success: true,
    message: 'Blog delete successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getAllBlogsFormDb(req.query);

  sendResponse(res, {
    success: true,
    message: 'Blogs retrieve successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};
