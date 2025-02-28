import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  slug?: string;
}

const ProjectCard = ({ title, description, image, link, slug }: Project) => {
  return (
    <Card>
      <CardMedia component="img" height="200" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
        <Button href={slug ? `/projects/${slug}` : link} target="_blank" variant="contained" sx={{ mt: 1 }}>
          View Project
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
