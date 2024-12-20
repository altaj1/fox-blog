import { z } from 'zod';

export const createUserValidationSchema = z.object({
  // id: z
  //   .string({
  //     required_error: 'ID is required',
  //     invalid_type_error: 'ID must be a string',
  //   })
  //   .nonempty({ message: 'ID cannot be empty' }),
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
      })
      .min(2, { message: 'Name must be at least 2 characters long' })
      .max(50, { message: 'Name cannot exceed 50 characters' }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(3, { message: 'Password must be at least 8 characters long' })
      .max(20, { message: 'Password cannot exceed 20 characters' }),
  }),
});

// export const UserValidation = {
//   createUserValidationSchema,
// };
