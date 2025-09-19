export interface Book {
  id: string;
  title: string;
  author: string;
  genre: 'Fiction' | 'Non-Fiction' | 'Mystery' | 'Romance' | 'Sci-Fi' | 'Biography';
  publishedYear: number;
  status: 'Available' | 'Issued';
  createdAt: Date;
}

export interface BookFormData {
  title: string;
  author: string;
  genre: Book['genre'];
  publishedYear: number;
  status: Book['status'];
}

export interface BookFilters {
  search: string;
  genre: string;
  status: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalBooks: number;
  booksPerPage: number;
}