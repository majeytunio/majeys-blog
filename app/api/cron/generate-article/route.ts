// app/api/cron/generate-article/route.ts
// This route is triggered by the Vercel cron job to generate and save an article.

import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Define the Supabase client.
// The URL and service role key are pulled from environment variables.
const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Define the API key for the generative model.
const openAiApiKey = process.env.OPENAI_KEY;

if (!openAiApiKey) {
  throw new Error("Missing OpenAI API key.");
}

// Helper function to call the OpenAI API.
async function generateArticleWithOpenAI() {
  // const prompt = `
  // You are an expert article writer. I need you to generate a unique, well-structured, and engaging article.
  // The article should be a single JSON object.
  // The object should have the following properties:
  // - "title": A concise and catchy title for the article (string).
  // - "description": A brief summary of the article (string).
  // - "feature_image": A high-quality Unsplash image URL (string) that can serve as the main image.
  // - "body": An array of objects. Each object in the array represents a part of the article.
  //   - An object with "type": "paragraph" and "content": "The text of the paragraph".
  //   - An object with "type": "image" and "content": "An Unsplash image URL that fits the article content".
  //   - Please include at least one image URL within the body array.
  //   - Each paragraph should be distinct and flow well.

  // Please generate a complete JSON object that follows this structure. The article can be on any random topic.
  // `;


  const prompt = `
    You are an expert article writer. I need you to generate a unique, well-structured, and engaging article.
    The article should be a single JSON object.
    The object should have the following properties:
    - "title": A concise and catchy title for the article (string).
    - "description": A brief summary of the article (string).
    - "feature_image": A high-quality Unsplash image URL (string) that can serve as the main image. **Please check the URL should be the valid URL not 404 URL, working URL from Any free stock footage website.**
    - "body": An array of objects. Each object in the array represents a part of the article.
        - An object with "type": "paragraph" and "content": "The text of the paragraph".
        - An object with "type": "image" and "content": "An Unsplash image URL that fits the article content". **Please check the URL should be the valid URL not 404 URL, working URL from Any free stock footage website.**
        - Please include at least one image URL within the body array.
        - Each paragraph should be distinct and flow well.

    Please generate a complete JSON object that follows this structure. The article can be on any random topic.
    `;

  // Define the API endpoint and payload for the OpenAI API.
  const payload = {
    model: "gpt-4o-mini",
    messages: [{
      role: "user",
      content: prompt,
    }],
    response_format: {
      type: "json_object",
    },
  };

  const apiUrl = `https://api.openai.com/v1/chat/completions`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("OpenAI API Error:", errorBody);
    throw new Error(`OpenAI API request failed with status: ${response.status}`);
  }

  const result = await response.json();
  const jsonText = result?.choices?.[0]?.message?.content;

  if (!jsonText) {
    throw new Error("Could not get JSON text from OpenAI response.");
  }

  return JSON.parse(jsonText);
}

// Main handler for the Vercel cron job.
export async function GET(request: Request) {
  // Check for the Vercel cron job secret for security.
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error('CRON_SECRET is not set in environment variables.');
    return new Response('Server configuration error', { status: 500 });
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    console.warn('Unauthorized request to cron job endpoint.');
    return new Response('Unauthorized', { status: 401 });
  }
  
  try {
    // 1. Generate the article using the OpenAI API.
    const article = await generateArticleWithOpenAI();
    
    // 2. Insert the article into the Supabase table.
    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          title: article.title,
          description: article.description,
          body: article.body,
          feature_image: article.feature_image,
        },
      ]);
    
    if (error) {
      console.error('Supabase insertion error:', error);
      return NextResponse.json({ error: 'Failed to insert article into Supabase.' }, { status: 500 });
    }
    
    console.log('Successfully generated and saved new article:', article.title);
    return NextResponse.json({ message: 'Article generated and saved successfully.', data }, { status: 200 });

  } catch (error) {
    console.error('Error in cron job:', error);
    return NextResponse.json({ error: 'Failed to generate or save article.' }, { status: 500 });
  }
}