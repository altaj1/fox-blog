import { AnyZodObject } from 'zod';
import catchAsync from '../../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

export default validateRequest;
// import { Request, Response, NextFunction } from 'express';
// import { AnyZodObject } from 'zod';

// const validateRequest = (schema: AnyZodObject) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync({
//         body: req.body,
//         cookies: req.cookies,
//       });
//       next();
//     } catch (error) {
//       return res.status(400).json({ error: error.errors });
//     }
//   };
// };

// export default validateRequest;
