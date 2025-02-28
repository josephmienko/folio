import { useParams } from "react-router-dom";
import useRemoteStore from "../hooks/useRemoteStore";
import { Typography, CircularProgress, Box, Avatar } from "@mui/material";
import { Post } from "../types/Project";

const BLOG_URL = `https://raw.githubusercontent.com/${import.meta.env.VITE_PROJECT_GITHUB_ACCOUNT}/${import.meta.env.VITE_PROJECT_GITHUB_REPO}/refs/heads/main/${import.meta.env.VITE_BLOG_GITHUB_FILE}`;

const Article = () => {
  const { slug } = useParams();
  const { data: blogs, loading, error } = useRemoteStore<Post[]>(BLOG_URL);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const blog = blogs?.find((b) => b.slug === slug);

  if (!blog) return <Typography color="error">Blog not found</Typography>;

  return (
    <Box sx={{ maxWidth: "800px", margin: "auto", py: 4 }}>
      <Typography variant="h3">{blog.title}</Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}>
        {blog.authors.map((author, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={author.avatar} alt={author.name} />
            <Typography variant="subtitle1">{author.name}</Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="body1">{blog.body}</Typography>
    </Box>
  );
};

export default Article;
