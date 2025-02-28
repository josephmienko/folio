import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { Posts } from "../../types/Post";
import BlogCard from "./BlogCard";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';


interface PaginatedPostsProps {
  blogs: Posts[];
  postsPerPage?: number;
}

const PaginatedPosts: React.FC<PaginatedPostsProps> = ({ blogs, postsPerPage = 10 }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const paginatedArticles = blogs.slice((page - 1) * postsPerPage, page * postsPerPage);
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  return (
    <Box>
      <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
        {paginatedArticles.map((article, index) => (
          <Grid key={index} xs={4} sm={4} md={6} item component="div">
            <Typography
              variant="h6"
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/blog/${article.id}`)}
            >
              {article.title}
            </Typography>
            <Typography variant="caption">{article.tag}</Typography>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} />
      </Box>
    </Box>
  );
};

export default PaginatedPosts;
