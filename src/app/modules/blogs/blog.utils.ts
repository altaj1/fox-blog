import { TAuthor } from './blogs.interface';

export const isPopulatedAuthor = (author: any): author is TAuthor => {
  return author && typeof author === 'object' && 'email' in author;
};
