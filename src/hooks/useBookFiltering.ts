import { useMemo } from 'react';
import { Book, BookFilters } from '../types/book';

export const useBookFiltering = (books: Book[], filters: BookFilters) => {
  return useMemo(() => {
    let filtered = [...books];

    // Search by title or author
    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim();
      filtered = filtered.filter(
        book =>
          book.title.toLowerCase().includes(searchTerm) ||
          book.author.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by genre
    if (filters.genre && filters.genre !== '') {
      filtered = filtered.filter(book => book.genre === filters.genre);
    }

    // Filter by status
    if (filters.status && filters.status !== '') {
      filtered = filtered.filter(book => book.status === filters.status);
    }

    return filtered;
  }, [books, filters]);
};