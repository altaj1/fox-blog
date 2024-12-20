import catchAsync from '../../../utils/catchAsync';
import httpStatus from 'http-status';
import { AuthServices } from './auth.service';
import sendResponse from '../../../utils/sendResponse';

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserIntoDb(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: {
      email: result?.email,
      name: result?.name,
      _id: result?._id,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: {
      token: result,
    },
  });
});
export const AuthControllers = {
  registerUser,
  login,
};
