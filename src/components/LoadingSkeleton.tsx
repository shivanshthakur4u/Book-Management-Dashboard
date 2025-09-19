import React from 'react';

interface LoadingSkeletonProps {
  rows?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ rows = 5 }) => {
  return (
    <div className="animate-pulse">
      {[...Array(rows)].map((_, index) => (
        <div key={index} className="border-b border-gray-200">
          <div className="px-6 py-4 flex items-center space-x-4">
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CardLoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ rows = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[...Array(rows)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-300 rounded w-20"></div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};