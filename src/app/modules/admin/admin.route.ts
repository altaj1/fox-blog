import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { AdminController } from './admin.controller';
const router = express.Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  AdminController.blockUser,
);
router.delete(
  '/blogs/:blogId',
  auth(USER_ROLE.admin),
  AdminController.deleteBlog,
);

export const AdminRoutes = router;
