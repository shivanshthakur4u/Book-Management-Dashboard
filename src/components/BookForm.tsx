import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save, AlertCircle } from 'lucide-react';
import { Book, BookFormData } from '../types/book';

const bookSchema = z.object({
  title: z.string()
    .min(2, 'Title must be at least 2 characters long')
    .max(200, 'Title must not exceed 200 characters'),
  author: z.string()
    .min(2, 'Author name must be at least 2 characters long')
    .max(100, 'Author name must not exceed 100 characters'),
  genre: z.enum(['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Biography'], {
    required_error: 'Please select a genre',
  }),
  publishedYear: z.number()
    .int('Year must be a whole number')
    .min(1900, 'Published year must be 1900 or later')
    .max(new Date().getFullYear(), 'Published year cannot be in the future'),
  status: z.enum(['Available', 'Issued'], {
    required_error: 'Please select a status',
  }),
});

interface BookFormProps {
  book?: Book | null;
  onSubmit: (data: BookFormData) => Promise<void>;
  onClose: () => void;
  loading: boolean;
}

export const BookForm: React.FC<BookFormProps> = ({
  book,
  onSubmit,
  onClose,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: '',
      author: '',
      genre: 'Fiction',
      publishedYear: new Date().getFullYear(),
      status: 'Available',
    },
  });

  useEffect(() => {
    if (book) {
      setValue('title', book.title);
      setValue('author', book.author);
      setValue('genre', book.genre);
      setValue('publishedYear', book.publishedYear);
      setValue('status', book.status);
    } else {
      reset();
    }
  }, [book, setValue, reset]);

  const handleFormSubmit = async (data: BookFormData) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
     console.error(error);
    }
  };

  const isEdit = !!book;
  const formLoading = loading || isSubmitting;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEdit ? 'Edit Book' : 'Add New Book'}
          </h2>
          <button
            onClick={onClose}
            disabled={formLoading}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              {...register('title')}
              type="text"
              id="title"
              disabled={formLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:opacity-50"
              placeholder="Enter book title"
            />
            {errors.title && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.title.message}
              </div>
            )}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              Author *
            </label>
            <input
              {...register('author')}
              type="text"
              id="author"
              disabled={formLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:opacity-50"
              placeholder="Enter author name"
            />
            {errors.author && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.author.message}
              </div>
            )}
          </div>

          {/* Genre */}
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
              Genre *
            </label>
            <select
              {...register('genre')}
              id="genre"
              disabled={formLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:opacity-50"
            >
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Romance">Romance</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Biography">Biography</option>
            </select>
            {errors.genre && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.genre.message}
              </div>
            )}
          </div>

          {/* Published Year */}
          <div>
            <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700 mb-1">
              Published Year *
            </label>
            <input
              {...register('publishedYear', { valueAsNumber: true })}
              type="number"
              id="publishedYear"
              disabled={formLoading}
              min="1900"
              max={new Date().getFullYear()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:opacity-50"
              placeholder="Enter published year"
            />
            {errors.publishedYear && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.publishedYear.message}
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status *
            </label>
            <select
              {...register('status')}
              id="status"
              disabled={formLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:opacity-50"
            >
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>
            {errors.status && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.status.message}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={formLoading}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {formLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {formLoading ? 'Saving...' : (isEdit ? 'Update Book' : 'Add Book')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};