// import { createClient } from '@supabase/supabase-js';
// import Image from 'next/image';
// import React from 'react';

// // Define a type for the article structure for type safety.
// interface Article {
//   id: string;
//   title: string;
//   description: string;
//   feature_image: string;
//   created_at: string;
// }

// // Next.js server component to fetch and display articles.
// // This page is rendered on the server, fetching data directly from Supabase.
// export default async function ArticlesPage() {
//   // Define the Supabase client.
//   const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
//   const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE;

//   if (!supabaseUrl || !supabaseServiceRoleKey) {
//     return (
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
//         <p className="text-red-500 text-lg">
//           Error: Supabase environment variables are not set.
//         </p>
//       </div>
//     );
//   }
  
//   const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

//   // Fetch articles from the Supabase 'articles' table.
//   // This query fetches all articles and orders them by 'created_at' in descending order.
//   const { data, error } = await supabase
//     .from('articles')
//     .select('id, title, description, feature_image, created_at')
//     .order('created_at', { ascending: false });

//   if (error) {
//     console.error('Supabase fetch error:', error);
//     return (
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
//         <p className="text-red-500 text-lg">
//           Failed to load articles. Please try again later.
//         </p>
//       </div>
//     );
//   }
  
//   const articles: Article[] = data || [];

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
//           AI-Generated Articles
//         </h1>
//         {articles.length === 0 ? (
//           <div className="text-center p-8">
//             <p className="text-gray-600 dark:text-gray-400 text-xl">
//               No articles found. Generate a new one from the home page!
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {articles.map((article) => (
//               <div
//                 key={article.id}
//                 className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105"
//               >
//                 {/* Feature image with a placeholder for error handling */}
//                 <div className="relative w-full h-48">
//                   <Image
//                     src={article.feature_image}
//                     alt={article.title}
//                     fill
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     style={{ objectFit: 'cover' }}
//                     className="transition-opacity duration-300"
//                     placeholder="blur"
//                     blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8Bw"
//                     onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//                       e.currentTarget.src = `https://placehold.co/600x400/1e40af/ffffff?text=Image+Not+Found`;
//                       e.currentTarget.onerror = null; // prevents infinite loop
//                     }}
//                   />
//                 </div>
//                 <div className="p-6 flex-grow flex flex-col">
//                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                     {article.title}
//                   </h2>
//                   <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
//                     {article.description}
//                   </p>
//                   <p className="text-gray-500 dark:text-gray-500 text-xs mt-auto">
//                     Published: {new Date(article.created_at).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }














import { createClient } from '@supabase/supabase-js';
import React from 'react';
import ArticleCard from './ArticleCard'; // Import the new client component
import Navbar from '../components/Navbar';

// Set the revalidation frequency for this page.
// revalidate = 0 means the page is never cached and will always be fresh.
export const revalidate = 0;


// Define a type for the article structure for type safety.
interface Article {
  id: string;
  title: string;
  description: string;
  feature_image: string;
  created_at: string;
}


// Next.js server component to fetch and display articles.
// This page is rendered on the server, fetching data directly from Supabase.
export default async function ArticlesPage() {
  // Define the Supabase client.
  const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <p className="text-red-500 text-lg">
          Error: Supabase environment variables are not set.
        </p>
      </div>
    );
  }
  
  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  // Fetch articles from the Supabase 'articles' table.
  // This query fetches all articles and orders them by 'created_at' in descending order.
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, description, feature_image, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch error:', error);
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <p className="text-red-500 text-lg">
          Failed to load articles. Please try again later.
        </p>
      </div>
    );
  }
  
  const articles: Article[] = data || [];

  return (
    <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            AI-Generated Articles
            </h1>
            {articles.length === 0 ? (
            <div className="text-center p-8">
                <p className="text-gray-600 dark:text-gray-400 text-xl">
                No articles found. Generate a new one from the home page!
                </p>
            </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                // Use the new client component to render each article card
                <ArticleCard key={article.id} article={article} />
                ))}
            </div>
            )}
        </div>
        </div>
    </>
  );
}