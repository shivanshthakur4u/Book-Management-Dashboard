import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Book, BookFormData, BookFilters, PaginationInfo } from '../types/book';
import * as bookService from '../services/bookService';
import toast from 'react-hot-toast';

interface BookState {
  books: Book[];
  filteredBooks: Book[];
  filters: BookFilters;
  pagination: PaginationInfo;
  selectedBook: Book | null;
  loading: boolean;
  error: string | null;
}

type BookAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_BOOKS'; payload: Book[] }
  | { type: 'SET_FILTERED_BOOKS'; payload: Book[] }
  | { type: 'SET_FILTERS'; payload: BookFilters }
  | { type: 'SET_PAGINATION'; payload: PaginationInfo }
  | { type: 'SET_SELECTED_BOOK'; payload: Book | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'UPDATE_BOOK'; payload: Book }
  | { type: 'DELETE_BOOK'; payload: string };

const initialState: BookState = {
  books: [],
  filteredBooks: [],
  filters: { search: '', genre: '', status: '' },
  pagination: { currentPage: 1, totalPages: 1, totalBooks: 0, booksPerPage: 10 },
  selectedBook: null,
  loading: false,
  error: null,
};

const bookReducer = (state: BookState, action: BookAction): BookState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    case 'SET_FILTERED_BOOKS':
      return { ...state, filteredBooks: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_PAGINATION':
      return { ...state, pagination: action.payload };
    case 'SET_SELECTED_BOOK':
      return { ...state, selectedBook: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
      };
    default:
      return state;
  }
};

interface BookContextValue extends BookState {
  fetchBooks: () => Promise<void>;
  addBook: (bookData: BookFormData) => Promise<void>;
  updateBook: (id: string, bookData: BookFormData) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
  setFilters: (filters: BookFilters) => void;
  setPagination: (pagination: PaginationInfo) => void;
  setSelectedBook: (book: Book | null) => void;
}

const BookContext = createContext<BookContextValue | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  const fetchBooks = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const books = await bookService.getAllBooks();
      dispatch({ type: 'SET_BOOKS', payload: books });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch books';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addBook = async (bookData: BookFormData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const newBook = await bookService.createBook(bookData);
      dispatch({ type: 'ADD_BOOK', payload: newBook });
      toast.success('Book added successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add book';
      toast.error(errorMessage);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateBook = async (id: string, bookData: BookFormData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const updatedBook = await bookService.updateBook(id, bookData);
      dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
      toast.success('Book updated successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update book';
      toast.error(errorMessage);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const deleteBook = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await bookService.deleteBook(id);
      dispatch({ type: 'DELETE_BOOK', payload: id });
      toast.success('Book deleted successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete book';
      toast.error(errorMessage);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const setFilters = (filters: BookFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const setPagination = (pagination: PaginationInfo) => {
    dispatch({ type: 'SET_PAGINATION', payload: pagination });
  };

  const setSelectedBook = (book: Book | null) => {
    dispatch({ type: 'SET_SELECTED_BOOK', payload: book });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const value: BookContextValue = {
    ...state,
    fetchBooks,
    addBook,
    updateBook,
    deleteBook,
    setFilters,
    setPagination,
    setSelectedBook,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};