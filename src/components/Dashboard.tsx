import React, { useState, useEffect } from 'react';
import { Plus, BookOpen, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { useBookFiltering } from '../hooks/useBookFiltering';
import { useBookPagination } from '../hooks/useBookPagination';
import { SearchAndFilter } from './SearchAndFilter';
import { BookTable } from './BookTable';
import { Pagination } from './Pagination';
import { BookForm } from './BookForm';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { LoadingSkeleton } from './LoadingSkeleton';
import { Book, BookFormData } from '../types/book';

export const Dashboard: React.FC = () => {
  const {
    books,
    filters,
    pagination,
    selectedBook,
    loading,
    addBook,
    updateBook,
    deleteBook,
    setFilters,
    setPagination,
    setSelectedBook,
  } = useBooks();

  const [showBookForm, setShowBookForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

  const filteredBooks = useBookFiltering(books, filters);
  const { paginatedBooks, pagination: updatedPagination } = useBookPagination(
    filteredBooks,
    pagination
  );

  // Update pagination when filtered books changes
  useEffect(() => {
    if (updatedPagination.currentPage > updatedPagination.totalPages && updatedPagination.totalPages > 0) {
      setPagination({ ...updatedPagination, currentPage: 1 });
    } else {
      setPagination(updatedPagination);
    }
  }, [filteredBooks.length, updatedPagination, setPagination]);

  const handleAddBook = () => {
    setSelectedBook(null);
    setShowBookForm(true);
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setShowBookForm(true);
  };

  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book);
    setShowDeleteModal(true);
  };

  const handleBookSubmit = async (bookData: BookFormData) => {
    if (selectedBook) {
      await updateBook(selectedBook.id, bookData);
    } else {
      await addBook(bookData);
    }
  };

  const handleConfirmDelete = async () => {
    if (bookToDelete) {
      await deleteBook(bookToDelete.id);
      setShowDeleteModal(false);
      setBookToDelete(null);
    }
  };

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
  };

  const stats = [
    {
      title: 'Total Books',
      value: books.length,
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      title: 'Available',
      value: books.filter(book => book.status === 'Available').length,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      title: 'Issued',
      value: books.filter(book => book.status === 'Issued').length,
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
    {
      title: 'Authors',
      value: new Set(books.map(book => book.author)).size,
      icon: Users,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                Book Management Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage your library collection with ease</p>
            </div>
            <button
              onClick={handleAddBook}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Book
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          filters={filters}
          onFiltersChange={setFilters}
          totalBooks={books.length}
          filteredCount={filteredBooks.length}
        />

        {/* Books Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <LoadingSkeleton rows={10} />
          </div>
        ) : (
          <>
            <BookTable
              books={paginatedBooks}
              onEdit={handleEditBook}
              onDelete={handleDeleteBook}
              loading={loading}
            />

            {/* Pagination */}
            <Pagination
              pagination={updatedPagination}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {/* Modals */}
        {showBookForm && (
          <BookForm
            book={selectedBook}
            onSubmit={handleBookSubmit}
            onClose={() => setShowBookForm(false)}
            loading={loading}
          />
        )}

        {showDeleteModal && bookToDelete && (
          <DeleteConfirmModal
            book={bookToDelete}
            onConfirm={handleConfirmDelete}
            onCancel={() => {
              setShowDeleteModal(false);
              setBookToDelete(null);
            }}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
};