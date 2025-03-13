import React from "react";
import { Helmet } from "react-helmet-async";

interface MetaTagsProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
}

const MetaTags = ({
  title = "Quran App - Read, Reflect, Remember",
  description = "A modern Quran reading application with auto-scroll, bookmarks, and multiple translations. Read the Holy Quran with ease on any device.",
  canonicalUrl,
  ogImage = "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&q=80",
  ogType = "website",
  twitterCard = "summary_large_image",
}: MetaTagsProps) => {
  // Safely get the current URL if canonicalUrl is not provided
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const finalCanonicalUrl = canonicalUrl || currentUrl;
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default MetaTags;
