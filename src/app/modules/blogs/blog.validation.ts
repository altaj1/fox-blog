import { z } from 'zod';

export const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .min(1, { message: 'Title cannot be empty' })
      .max(100, { message: 'Title cannot exceed 100 characters' }),
    content: z
      .string({
        required_error: 'Content is required',
        invalid_type_error: 'Content must be a string',
      })
      .min(1, { message: 'Content cannot be empty' }),
  }),
});
export const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title must be a string',
      })
      .max(100, { message: 'Title cannot exceed 100 characters' })
      .optional(),
    content: z
      .string({
        required_error: 'Content is required',
        invalid_type_error: 'Content must be a string',
      })
      .optional(),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
};
