// app/api/categories/uklife/route.js
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request, { params }) {
  const { slug } = params;
  const { searchParams } = new URL(request.url);

    if(slug === "majey"){
        return NextResponse.json({
            success: true,
            data: {
                id: "majey",
                title: "My First Article",
                content: `
                <p>Hello and welcome to my first article! This is a demonstration of how content can be structured in a blog post.</p>
                
                <h2>Section 1: Introduction</h2>
                <p>This is the introductory paragraph where I explain what the article is about.</p>
                
                <h2>Section 2: Main Content</h2>
                <p>Here's where the meat of the article would go. You can include:</p>
                <ul>
                    <li>Bullet points</li>
                    <li>Code snippets</li>
                    <li>Images</li>
                    <li>Quotes</li>
                </ul>
                
                <h2>Section 3: Conclusion</h2>
                <p>Wrap up your thoughts and provide next steps for the reader.</p>
                `,
                shortDesc: "This is my article",
                author: "Majry Tunio",
                createdAt: "DATE OF CREATION",
                headerImage: "https://tachsol.world/wp-content/uploads/2025/07/online-earning-guide-zero-investment.png",
            },
        });
    }else{
        return NextResponse.json({
            success: false,
            error: "Something went wrong...",
        });
    }
}