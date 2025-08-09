// import { createClient } from '@supabase/supabase-js';
// import React from 'react';

// // Define a type for the article structure for type safety.
// interface ArticleContent {
//   type: 'paragraph' | 'image';
//   content: string;
// }

// interface Article {
//   id: string;
//   title: string;
//   description: string;
//   feature_image: string;
//   body: ArticleContent[];
//   created_at: string;
// }

// // Next.js server component to fetch and display a single article.
// // It receives the article ID from the URL params.
// export default async function SingleArticlePage({ params }: { params: { id: string } }) {
//   const { id } = params;

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

//   // Fetch a single article from the Supabase 'articles' table by its ID.
//   const { data, error } = await supabase
//     .from('articles')
//     .select('*')
//     .eq('id', id)
//     .single();

//   if (error || !data) {
//     console.error('Supabase fetch error:', error);
//     return (
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
//         <p className="text-red-500 text-lg">
//           Article not found.
//         </p>
//       </div>
//     );
//   }
  
//   const article: Article = data;

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6 md:p-10">
//         <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//           {article.title}
//         </h1>
//         <p className="text-gray-600 dark:text-gray-400 mb-6">
//           {article.description}
//         </p>
//         <p className="text-gray-500 dark:text-gray-500 text-sm mb-6">
//           Published: {new Date(article.created_at).toLocaleDateString()}
//         </p>

//         {article.feature_image && (
//           <div className="w-full h-96 relative mb-8">
//             <img
//               src={article.feature_image}
//               alt={article.title}
//               className="w-full h-full object-cover rounded-lg"
//               onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//                 e.currentTarget.src = `https://placehold.co/1024x768/1e40af/ffffff?text=Image+Not+Found`;
//                 e.currentTarget.onerror = null; // prevents infinite loop
//               }}
//             />
//           </div>
//         )}

//         {article.body.map((part, index) => (
//           part.type === 'paragraph' ? (
//             <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
//               {part.content}
//             </p>
//           ) : part.type === 'image' ? (
//             <div key={index} className="w-full h-96 relative my-8">
//               <img
//                 src={part.content}
//                 alt={`Article image ${index + 1}`}
//                 className="w-full h-full object-cover rounded-lg"
//                 onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//                   e.currentTarget.src = `https://placehold.co/1024x768/1e40af/ffffff?text=Image+Not+Found`;
//                   e.currentTarget.onerror = null;
//                 }}
//               />
//             </div>
//           ) : null
//         ))}
//       </div>
//     </div>
//   );
// }





import { createClient } from '@supabase/supabase-js';
import React from 'react';
import ArticleImage from '../ArticleImage'; // Import the new client component
import Navbar from '../../components/Navbar';

// Define a type for the article structure for type safety.
interface ArticleContent {
  type: 'paragraph' | 'image';
  content: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  feature_image: string;
  body: ArticleContent[];
  created_at: string;
}

// Next.js server component to fetch and display a single article.
// It receives the article ID from the URL params.
export default async function SingleArticlePage({ params }: { params: { id: string } }) {
  const { id } = params;

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

  // Fetch a single article from the Supabase 'articles' table by its ID.
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Supabase fetch error:', error);
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <p className="text-red-500 text-lg">
          Article not found.
        </p>
      </div>
    );
  }
  
  const article: Article = data;

  return (
    <>
      <Navbar /> {/* Add the Navbar component here */}
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6 md:p-10">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
            {article.description}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mb-6">
            Published: {new Date(article.created_at).toLocaleDateString()}
            </p>

            {article.feature_image && (
            <div className="w-full h-96 relative mb-8">
                {/* Use the new client component for the feature image */}
                <ArticleImage
                src={article.feature_image}
                alt={article.title}
                className="w-full h-full object-cover rounded-lg"
                />
            </div>
            )}

            {article.body.map((part, index) => (
            part.type === 'paragraph' ? (
                <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {part.content}
                </p>
            ) : part.type === 'image' ? (
                <div key={index} className="w-full h-96 relative my-8">
                {/* Use the new client component for the body images */}
                <ArticleImage
                    src={part.content}
                    alt={`Article image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                />
                </div>
            ) : null
            ))}
        </div>
        </div>
    </>
  );
}