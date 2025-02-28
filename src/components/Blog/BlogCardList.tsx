import * as React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import useRemoteStore from '../../hooks/useRemoteStore';
import Grid from '@mui/material/Grid';
import {formatDateMDY} from '../../utils/formatDateMDY';
import Paper from '@mui/material/Paper';
import {Post} from '../../types/Post';
import  BlogCard  from './BlogCard';
import Box from '@mui/material/Box';


export default function BlogCardList({ blogStore }: { blogStore: Post[] }) {
  const filteredBlogs = blogStore;

  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
      <Box sx={{ my: 1, mx: "auto", p: 2 }}>
        {filteredBlogs.length > 0 ? (
          <Grid container spacing={3}>
            {/* First Column - Always has the extra post when odd */}
            <Grid item xs={12} sm={6}>
              {filteredBlogs.slice(0, Math.ceil(filteredBlogs.length / 2)).map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id.toString()}
                  title={post.title}
                  date={formatDateMDY(post.date.toString())}
                  cover={post.cover}
                  abstract={post.abstract}
                  slug={post.slug}
                  tag={post.tag}
                />
              ))}
            </Grid>

            {/* Second Column - Gets the remaining posts */}
            <Grid item xs={12} sm={6}>
              {filteredBlogs.slice(Math.ceil(filteredBlogs.length / 2)).map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id.toString()}
                  title={post.title}
                  date={formatDateMDY(post.date.toString())}
                  cover={post.cover}
                  abstract={post.abstract}
                  slug={post.slug}
                  tag={post.tag}
                />
              ))}
            </Grid>
          </Grid>
        ) : (
          <Typography color="error" sx={{ textAlign: "center" }}>
            ⚠ No posts found for this category.
          </Typography>
        )}
      </Box>
    </Box>
  );
}