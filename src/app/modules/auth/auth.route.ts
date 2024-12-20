import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createUserValidationSchema } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = express.Router();
router.post(
  '/register',
  validateRequest(createUserValidationSchema),
  AuthControllers.registerUser,
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);
export const AuthRoutes = router;
