import { ReactNode } from 'react';

export interface Posts {
  tag: ReactNode;
  id: any;
  title: ReactNode;
  /**
   * An array of `Post` objects representing the posts in the application.
   */
  posts: Post[];
}

export interface Post {
  id: number;
  date: Date; // ISO string format, e.g., "2024-05-15T00:00:00Z"
  tag: "Engineering" | "Statistics" | "Data Science" | "Social Welfare" | "Politics" | "Design"; // Enum-like type for predefined tags
  isFeatured: boolean; // Boolean type for clarity
  title: string;
  slug: string;
  cover: string;
  authors: Authors[]; // Array of authors
  abstract: string; // Short summary
  body: string; // Markdown or plain text content
}

export interface Authors {
  name: string;
  avatar: string;
}

export interface FeaturedPost extends Post {
  isFeatured: true;
}

export interface NewestFeaturedPosts extends FeaturedPost {}

/**
 * Returns a list of the newest 5 featured posts.
 * If there are not enough featured posts, it fills the remaining slots with non-featured posts.
 */
export const getNewestFeaturedPosts = (allPosts: Post[]): FeaturedPost[] => {
  const featured = allPosts.filter((post): post is FeaturedPost => post.isFeatured);
  const nonFeatured = allPosts.filter((post) => !post.isFeatured);

  // Sort by date (newest first)
  const sortedFeatured = featured.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get top 5 featured, filling with non-featured if necessary
  const result = sortedFeatured.length >= 5
    ? sortedFeatured.slice(0, 5)
    : [...sortedFeatured, ...nonFeatured.slice(0, 5 - sortedFeatured.length)];

  return result.map(post => ({ ...post, isFeatured: true })) as FeaturedPost[];
};
// Export statement removed to resolve redeclaration and conflict issues