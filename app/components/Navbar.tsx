'use client';

import Link from 'next/link';
import React from 'react';

// A client component for the application's navigation bar.
export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                AI Article Generator
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-4 flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/articles"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                All Articles
              </Link>
              <Link
                href="/generate-ai"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Generate AI
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}