import React from 'react';
import { Search, Filter } from 'lucide-react';
import { BookFilters } from '../types/book';

const GENRES = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Biography'];
const STATUSES = ['Available', 'Issued'];

interface SearchAndFilterProps {
  filters: BookFilters;
  onFiltersChange: (filters: BookFilters) => void;
  totalBooks: number;
  filteredCount: number;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  filters,
  onFiltersChange,
  totalBooks,
  filteredCount,
}) => {
  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  const handleGenreChange = (genre: string) => {
    onFiltersChange({ ...filters, genre });
  };

  const handleStatusChange = (status: string) => {
    onFiltersChange({ ...filters, status });
  };

  const clearFilters = () => {
    onFiltersChange({ search: '', genre: '', status: '' });
  };

  const hasActiveFilters = filters.search || filters.genre || filters.status;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Genre Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Genre
          </label>
          <div className="relative">
            <select
              value={filters.genre}
              onChange={(e) => handleGenreChange(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Genres</option>
              {GENRES.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Status</option>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full px-4 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 mb-2 sm:mb-0">
          Showing <span className="font-semibold text-gray-900">{filteredCount}</span> of{' '}
          <span className="font-semibold text-gray-900">{totalBooks}</span> books
        </div>
        {hasActiveFilters && (
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
              <Filter className="h-3 w-3 mr-1" />
              Filters Applied
            </span>
          </div>
        )}
      </div>
    </div>
  );
};