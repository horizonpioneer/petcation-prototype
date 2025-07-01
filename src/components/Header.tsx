
import React from 'react';
import { Search, Heart, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                🐾 PetStay
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              숙소 검색
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              여행 가이드
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
              테마 여행
            </a>
          </nav>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <Heart className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
