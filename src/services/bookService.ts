import { Book, BookFormData } from '../types/book';

const STORAGE_KEY = 'bookManagementData';

function generateId() {
  return `book_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getStoredBooks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return getDefaultBooks();
    }
    return JSON.parse(data);
  } catch {
    return getDefaultBooks();
  }
}

function saveBooks(books: Book[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function getDefaultBooks() {
  const defaultBooks: Book[] = [
    {
      id: generateId(),
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      publishedYear: 1925,
      status: 'Available',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: generateId(),
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Fiction',
      publishedYear: 1960,
      status: 'Issued',
      createdAt: new Date('2024-01-16'),
    },
    {
      id: generateId(),
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Fiction',
      publishedYear: 1951,
      status: 'Available',
      createdAt: new Date('2024-01-17'),
    },
    {
      id: generateId(),
      title: 'Agatha Christie: An Autobiography',
      author: 'Agatha Christie',
      genre: 'Biography',
      publishedYear: 1977,
      status: 'Available',
      createdAt: new Date('2024-01-18'),
    },
    {
      id: generateId(),
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Sci-Fi',
      publishedYear: 1965,
      status: 'Issued',
      createdAt: new Date('2024-01-19'),
    },
    {
      id: generateId(),
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      publishedYear: 1813,
      status: 'Available',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: generateId(),
      title: 'The Murder of Roger Ackroyd',
      author: 'Agatha Christie',
      genre: 'Mystery',
      publishedYear: 1926,
      status: 'Available',
      createdAt: new Date('2024-01-21'),
    },
    {
      id: generateId(),
      title: 'Sapiens: A Brief History of Humankind',
      author: 'Yuval Noah Harari',
      genre: 'Non-Fiction',
      publishedYear: 2011,
      status: 'Issued',
      createdAt: new Date('2024-01-22'),
    },
  ];

  saveBooks(defaultBooks);
  return defaultBooks;
}

export async function getAllBooks() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return getStoredBooks();
}

export async function createBook(bookData: BookFormData) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const books = getStoredBooks();
  const newBook: Book = {
    ...bookData,
    id: generateId(),
    createdAt: new Date(),
  };
  
  books.push(newBook);
  saveBooks(books);
  return newBook;
}

export async function updateBook(id: string, bookData: BookFormData) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const books = getStoredBooks();
  const bookIndex = books.findIndex((book: { id: string; }) => book.id === id);
  
  if (bookIndex === -1) {
    throw new Error('Book not found');
  }
  
  const updatedBook: Book = {
    ...books[bookIndex],
    ...bookData,
  };
  
  books[bookIndex] = updatedBook;
  saveBooks(books);
  return updatedBook;
}

export async function deleteBook(id: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const books = getStoredBooks();
  const filteredBooks = books.filter((book: { id: string; }) => book.id !== id);
  
  if (books.length === filteredBooks.length) {
    throw new Error('Book not found');
  }
  
  saveBooks(filteredBooks);
}