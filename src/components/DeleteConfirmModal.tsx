import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Book } from '../types/book';

interface DeleteConfirmModalProps {
  book: Book;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  book,
  onConfirm,
  onCancel,
  loading,
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (error) {
      // Error handling is done in the context
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-gray-900">Delete Book</h2>
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this book? This action cannot be undone.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-1">{book.title}</h4>
            <p className="text-sm text-gray-600">by {book.author}</p>
            <div className="flex items-center justify-between mt-2 text-sm">
              <span className="text-gray-500">{book.genre} • {book.publishedYear}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                book.status === 'Available'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {book.status}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              {loading ? 'Deleting...' : 'Delete Book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};