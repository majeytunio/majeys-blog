'use client';

import React from 'react';

interface ArticleImageProps {
  src: string;
  alt: string;
  className?: string;
}

// A client component to render an image and handle the onError event.
export default function ArticleImage({ src, alt, className }: ArticleImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      // The onError handler is now safe to use here because this is a client component
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = `https://placehold.co/1024x768/1e40af/ffffff?text=Image+Not+Found`;
        e.currentTarget.onerror = null; // prevents infinite loop
      }}
    />
  );
}