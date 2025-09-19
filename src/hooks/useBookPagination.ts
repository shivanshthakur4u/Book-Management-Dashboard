import { useMemo } from 'react';
import { Book, PaginationInfo } from '../types/book';

export const useBookPagination = (
  books: Book[],
  pagination: PaginationInfo
) => {
  return useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.booksPerPage;
    const endIndex = startIndex + pagination.booksPerPage;
    const paginatedBooks = books.slice(startIndex, endIndex);

    const totalPages = Math.ceil(books.length / pagination.booksPerPage);

    const updatedPagination: PaginationInfo = {
      ...pagination,
      totalPages,
      totalBooks: books.length,
    };

    return { paginatedBooks, pagination: updatedPagination };
  }, [books, pagination]);
};