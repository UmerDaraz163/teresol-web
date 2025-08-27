// components/BlogPostImage.tsx

'use client';

import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
};

export default function BlogPostImage({ src, alt }: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      priority
      onError={(e) => {
        // This event handler is now safely in a Client Component
        e.currentTarget.src =
          'https://placehold.co/1920x450/eee/ccc?text=Image+Not+Found';
      }}
    />
  );
}
