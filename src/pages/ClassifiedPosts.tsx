import * as React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useRemoteStore from "../hooks/useRemoteStore";
import { Post } from "../types/Post";
import CustomBreadcrumbs from "../components/Navigation/Breadcrumbs";
import CategoryTags from "../components/Blog/CategoryTags";
import PaginatedPosts from "../components/Blog/PaginatedPosts";
import { Fade } from "@mui/material";


const formatSlugToCategory = (slug: string) =>
  slug.replace(/-/g, " ").toLowerCase();

const BLOG_URL = `https://raw.githubusercontent.com/${import.meta.env.VITE_PROJECT_GITHUB_ACCOUNT}/${import.meta.env.VITE_PROJECT_GITHUB_REPO}/main/${import.meta.env.VITE_BLOG_GITHUB_FILE}`;

const normalizeText = (text: string) => text.trim().toLowerCase();

export default function ClassifiedPosts() {

  const { category } = useParams();
  const { data: blogs, loading, error } = useRemoteStore<Post[]>(BLOG_URL);
  const [categories, setCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (blogs) {
      // Extract unique categories from blog posts
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

  const readableCategory = formatSlugToCategory(category || "").trim();
  console.log("🔍 URL Category:", category);
  console.log("🔍 Formatted Category for Matching:", readableCategory);

  const filteredBlogs = (blogs || []).filter((blog) => {
    const blogCategory = normalizeText(blog.tag);
    return blogCategory === readableCategory;
  });

  if (!Array.isArray(filteredBlogs) || filteredBlogs.length === 0) {
    console.warn("⚠ No posts found for category:", readableCategory);
  }

  console.log("🛠 Debug: Sending filteredBlogs to BlogCardList", filteredBlogs);

  return (
    <Fade in timeout={1000}>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>

    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        backgroundColor: "background.default",
        padding: 2,
      }}
    >

      {/* 🔹 Category Title */}
   
        <Typography variant="h2" gutterBottom>
          {readableCategory.charAt(0).toUpperCase() + readableCategory.slice(1)} Posts
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

      {/* 🔹 Blog List */}
      <PaginatedPosts blogs={filteredBlogs.map(blog => ({ id: blog.id, title: blog.title, posts: [blog], tag: blog.tag }))} />

    </Box>
</Fade>
  );
}