import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FeaturedPosts from "../components/Blog/FeaturedPosts";
import PaginatedPosts from "../components/Blog/PaginatedPosts";
import useRemoteStore from "../hooks/useRemoteStore";
import CategoryTags from "../components/Blog/CategoryTags";
import { Post } from "../types/Post";

import Fade from "@mui/material/Slide";

const BLOG_URL = `https://raw.githubusercontent.com/${import.meta.env.VITE_PROJECT_GITHUB_ACCOUNT}/${import.meta.env.VITE_PROJECT_GITHUB_REPO}/refs/heads/main/${import.meta.env.VITE_BLOG_GITHUB_FILE}`;

const normalizeText = (text: string) => text.trim().toLowerCase();

export default function Blogroll() {
  const { data: blogs, loading, error } = useRemoteStore<Post[]>(BLOG_URL);
  const [categories, setCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (blogs) {
      const uniqueCategories = Array.from(
        new Set(blogs.map((blog) => normalizeText(blog.tag)))
      );
      setCategories(uniqueCategories);
    }
  }, [blogs]);

  if (loading) {
    console.log("🔄 Loading blog data...");
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    console.error("❌ Error loading blogs:", error);
    return <Typography color="error">{error}</Typography>;
  }

  console.log("📜 Full blog data:", blogs);
  console.log("📁 Extracted Categories:", categories);

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        backgroundColor: "background.default",
        padding: 2,
      }}
    >
      <Typography variant="h2" gutterBottom>
        Blog
      </Typography>
      <Typography>Stay in the loop with the latest about our products</Typography>
      </Box>
      {/* 🛠️ Debug Box Wrapping CategoryTags */}
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "background.paper",
          padding: 2,
          borderRadius: 1,
        }}
        onClick={(e) => {
          e.stopPropagation(); // ✅ Stop click from bubbling
          console.log("✅ Click detected inside CategoryTags container");
        }}
      >
        <CategoryTags categories={categories} />
      </Box>

      <FeaturedPosts />f
      <PaginatedPosts
        blogs={(blogs || []).map((blog) => ({
          ...blog,
          posts: [blog],
        }))}
      />
    </Box>
  );
}
