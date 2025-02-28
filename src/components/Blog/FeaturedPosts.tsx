import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import useRemoteStore from "../../hooks/useRemoteStore";
import { Post, getNewestFeaturedPosts } from "../../types/Post";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import LabelImportantRoundedIcon from '@mui/icons-material/LabelImportantRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { ButtonBase, Tooltip } from "@mui/material";
import Image from "../Image"


// Function to generate image source set for responsive loading
function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

const BLOG_URL = `https://raw.githubusercontent.com/${import.meta.env.VITE_PROJECT_GITHUB_ACCOUNT}/${import.meta.env.VITE_PROJECT_GITHUB_REPO}/refs/heads/main/${import.meta.env.VITE_BLOG_GITHUB_FILE}`;

export default function FeaturedPosts() {
  const { data: blogs, loading, error } = useRemoteStore<Post[]>(BLOG_URL);
  const navigate = useNavigate();
  const theme = useTheme();

  // Responsive layout: Check if screen is small
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Get the selected 5 featured posts
  const featuredArticles = getNewestFeaturedPosts(blogs || []);

  return (
    <ImageList
      sx={{
        width: "100%",
        transform: "translateZ(0)", // Performance optimization
      }}
      variant="quilted" // Quilt-style layout
      cols={isMobile ? 1 : 6} // Mobile: 1 col, Desktop: 3 cols
      rowHeight={500} // Row height consistency
      gap={8} // Adjust spacing
    >
      {featuredArticles.map((post, index) => {
        // Define layout rules
        let cols = 1, rows = 1;
        if (!isMobile) {
          if (index < 2) cols = 3; // First two posts span 2 cols
          if (index >= 2) cols = 2; // Last three posts span 1 col
        }

        return (
          <ImageListItem key={post.cover} cols={cols} rows={rows}>
            <ButtonBase
              sx={{ width: "100%", height: "100%" }}
              onClick={() => navigate(`/blog/${post.tag.toLowerCase()}/${post.slug}`)}
              component="div"
              style={{ width: "100%", height: "100%" }}
            >
              <Image
                {...srcset(post.cover, 250, 200, rows, cols)}
                alt={post.title}
                shift="top" distance={100} shiftDuration={320} 
                style={{ 
                  borderRadius: "10px", 
                  boxShadow: "2px 4px 10px rgba(0,0,0,0.2)",
                  width: "100%", height: "100%", objectFit: "cover"
                }}
              />

              {/* Render tooltip & icon only if post is featured */}
              {post.isFeatured && (
                <ImageListItemBar
                  sx={{
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                    gap: 2,
                    pr: 2,
                  }}
                  title={post.title}
                  subtitle={post.abstract}
                  position="top"
                  actionIcon={
                    <Tooltip title="Featured Article">
                      <IconButton sx={{ color: "white" }} aria-label={`star ${post.title}`}>
                        <LabelImportantRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  }
                  actionPosition="right"
                />
              )}
            </ButtonBase>
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}
