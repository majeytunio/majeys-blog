// // 'use client'

// // import { useEffect, useState } from "react"

// // export default function MainPage() {
// //     const [headerData, setHeaderData] = useState(null)
// //     const [loading, setLoading] = useState(true)
// //     const [error, setError] = useState(null)

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 const response = await fetch('/api/main/majey')
// //                 const data = await response.json()

// //                 if (data.success) {
// //                     setHeaderData(data.data.headerParam)
// //                 } else {
// //                     throw new Error(data.error || 'Failed to fetch header data')
// //                 }
// //             } catch (err) {
// //                 setError(err.message)
// //                 console.error('Fetch error:', err)
// //             } finally {
// //                 setLoading(false)
// //             }
// //         }

// //         fetchData()
// //     }, [])
    
// //     if (loading) return <div>Loading...</div>
// //     if (error) return <div>Error: {error}</div>

// //     return (
// //         <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
// //             {/* ARTICLE DATA SHOULD BE PLACE HERE */}
// //         </div>
// //     )
// // }




// 'use client'
// import { useEffect, useState } from "react"
// import Image from "next/image"

// export default function MainPage() {
//     const [article, setArticle] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Make sure this matches your API route
//                 const response = await fetch('/api/main/majey')
                
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`)
//                 }

//                 const data = await response.json()

//                 if (data.success) {
//                     setArticle(data.data) // Store the entire article data
//                 } else {
//                     throw new Error(data.error || 'Article not found')
//                 }
//             } catch (err) {
//                 setError(err.message)
//                 console.error('Fetch error:', err)
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchData()
//     }, [])
    
//     if (loading) {
//         return (
//             <div className="fixed inset-0 flex items-center justify-center z-50">
//                 {/* Semi-transparent overlay */}
//                 <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-[2px]"></div>
                
//                 {/* Loader container */}
//                 <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-80 max-w-full text-center">
//                     {/* Improved spinner */}
//                     <div className="flex justify-center mb-4">
//                     <div className="relative w-16 h-16">
//                         {/* Outer circle */}
//                         <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-600"></div>
//                         {/* Animated arc */}
//                         <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
//                     </div>
//                     </div>
                    
//                     {/* Loading text with animation */}
//                     <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
//                     <span className="inline-block animate-pulse">
//                         Loading
//                         <span className="inline-block ml-1">
//                         <span className="animate-bounce delay-75">.</span>
//                         <span className="animate-bounce delay-150">.</span>
//                         <span className="animate-bounce delay-300">.</span>
//                         </span>
//                     </span>
//                     </p>
                    
//                     {/* Optional progress bar */}
//                     <div className="mt-6 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
//                     <div className="bg-blue-600 h-1.5 rounded-full animate-[progress_2s_ease-in-out_infinite]"></div>
//                     </div>
//                 </div>
//             </div>

//         )
//     }
//     if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>
//     if (!article) return <div className="text-center py-20">No article found</div>

//     return (
//         <div className="font-sans max-w-4xl mx-auto p-6 bg-gray-900">
//             {/* Article Header */}
//             <header className="mb-8">
//                 <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
//                 <div className="flex items-center gap-4 text-orange-300 mb-6">
//                     <span>By {article.author}</span>
//                     <span>•</span>
//                     <span>{article.createdAt}</span>
//                 </div>
//                 {article.headerImage && (
//                     <div className="relative w-full h-96 rounded-lg overflow-hidden mb-6">
//                         <Image
//                             src={article.headerImage}
//                             alt={article.title}
//                             fill
//                             className="object-cover"
//                             priority
//                         />
//                     </div>
//                 )}
//                 <p className="text-xl text-gray-700">{article.shortDesc}</p>
//             </header>

//             {/* Article Content */}
//             <article className="prose lg:prose-xl max-w-none">
//                 <div className="whitespace-pre-line">
//                     <div 
//                         className="prose" // Tailwind Typography for nice formatting
//                         dangerouslySetInnerHTML={{ __html: article.content }}
//                     />
//                     {/* {article.content} */}
//                 </div>
//             </article>
//         </div>
//     )
// }















import ArticlesPage from "../../articles/page";

// Set the revalidation frequency for this page.
// revalidate = 0 means the page is never cached and will always be fresh.
export const revalidate = 0;

// Next.js server component to fetch and display articles.
// This page is rendered on the server, fetching data directly from Supabase.
export default async function MainPage() {
    return (
        <ArticlesPage />
    );
}