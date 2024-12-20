import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  createBlogValidationSchema,
  updateBlogValidationSchema,
} from './blog.validation';
import { BlogController } from './blogs.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();
router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(createBlogValidationSchema),
  BlogController.createBlog,
);
router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(updateBlogValidationSchema),
  BlogController.updateBlog,
);

export const BlogRoutes = router;
