import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from  '@mui/material/Box';
import { minHeight, styled } from '@mui/system';
import { Grid2 } from "@mui/material";




const BlogCard = styled(Card)({
  borderRadius: '10px',
});

const BlogCardContainer = ({title, date, cover, abstract, slug, ...otherProps}: {
  title: string;
  date: string;
  cover: string;
  abstract: string;
  slug: string;
  id: string;
  [key: string]: any;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '2rem'
      }}
    >
      <BlogCard {...otherProps}>
        <Card style={{minHeight: 350}}>
 
              <CardContent>
        <Typography gutterBottom variant="h5" component="div" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {abstract}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>

        </Card>
      </BlogCard>
      <Box sx={{ mt: '10px', ml: '10px' }} />
    </Box>
  );
}

export default BlogCardContainer;
