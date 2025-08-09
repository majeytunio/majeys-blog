'use client';

import React from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router'; // For Next.js App Router, use 'next/navigation' instead.


// This is the main page component for the on-demand article generator.
export default function App() {
  // const router = useRouter(); 
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handles the button click to generate a new article.
  const handleGenerateArticle = async () => {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Make a POST request to the new API route.
      const response = await fetch('/api/generate-article-on-demand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate article.');
      }

      const result = await response.json();
      setMessage(result.message);

      // Start the 5-second countdown
      let countdown = 5;
      const timer = setInterval(() => {
        setMessage(`Article generated successfully! Redirecting in ${countdown} seconds...`);
        countdown--;
        if (countdown < 0) {
          clearInterval(timer);
          // Redirect to the main page
          // For Next.js App Router:
          // router.push('/articles'); 
          // For Next.js Pages Router:
          window.location.href = '/articles'; 
        }
      }, 1000);

    } catch (e: any) {
      setError(e.message);
      console.error('Error generating article:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
          <div className="flex justify-center mb-6 text-indigo-600 dark:text-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-edit">
              <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"/>
              <polyline points="14 2 14 8 20 8"/>
              <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Generate AI Article</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Click the button below to generate a new AI-powered article and save it to your Supabase database.
          </p>
          <button
            onClick={handleGenerateArticle}
            disabled={loading}
            className={`
              w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-md hover:shadow-lg'
              }
            `}
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating...</span>
              </span>
            ) : (
              'Generate Article'
            )}
          </button>

          {message && (
            <div className="mt-4 p-4 rounded-md bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 rounded-md bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700">
              Error: {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
}