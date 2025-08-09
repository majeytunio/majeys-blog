// 'use client';

// import React from 'react';

// // Define the Article type for props to ensure type safety
// interface Article {
//   id: string;
//   title: string;
//   description: string;
//   feature_image: string;
//   created_at: string;
// }

// interface ArticleCardProps {
//   article: Article;
// }

// // A client component to render a single article card with client-side interactivity.
// export default function ArticleCard({ article }: ArticleCardProps) {
//   return (
//     <div
//       className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105"
//     >
//       {/* Feature image with a placeholder for error handling */}
//       <div className="relative w-full h-48">
//         <img
//           src={article.feature_image}
//           alt={article.title}
//           className="w-full h-full object-cover transition-opacity duration-300"
//           // The onError handler is now safe to use here because this is a client component
//           onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//             e.currentTarget.src = `https://placehold.co/600x400/1e40af/ffffff?text=Image+Not+Found`;
//             e.currentTarget.onerror = null; // prevents infinite loop
//           }}
//         />
//       </div>
//       <div className="p-6 flex-grow flex flex-col">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//           {article.title}
//         </h2>
//         <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
//           {article.description}
//         </p>
//         <p className="text-gray-500 dark:text-gray-500 text-xs mt-auto">
//           Published: {new Date(article.created_at).toLocaleDateString()}
//         </p>
//       </div>
//     </div>
//   );
// }






'use client';

import React from 'react';
import Link from 'next/link';

// Define the Article type for props to ensure type safety
interface Article {
  id: string;
  title: string;
  description: string;
  feature_image: string;
  created_at: string;
}

interface ArticleCardProps {
  article: Article;
}

// A client component to render a single article card with client-side interactivity.
export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link 
      href={`/articles/${article.id}`} 
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105"
    >
      {/* Feature image with a placeholder for error handling */}
      <div className="relative w-full h-48">
        <img
          src={article.feature_image}
          alt={article.title}
          className="w-full h-full object-cover transition-opacity duration-300"
          // The onError handler is now safe to use here because this is a client component
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = `https://placehold.co/600x400/1e40af/ffffff?text=Image+Not+Found`;
            e.currentTarget.onerror = null; // prevents infinite loop
          }}
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {article.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
          {article.description}
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-xs mt-auto">
          Published: {new Date(article.created_at).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}