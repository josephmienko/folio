import { useParams } from "react-router-dom";
import useRemoteStore from "../hooks/useRemoteStore";
import { Typography, CircularProgress } from "@mui/material";
import { Project } from "../types/Project";  // ✅ Import Project type

const PROJECT_URL = `https://raw.githubusercontent.com/${import.meta.env.VITE_PROJECT_GITHUB_ACCOUNT}/${import.meta.env.VITE_PROJECT_GITHUB_REPO}/main/${import.meta.env.VITE_PROJECT_GITHUB_FILE}`;

const ProjectDetails = () => {
  const { slug } = useParams();
  const { data: projects, loading, error } = useRemoteStore<Project[]>(PROJECT_URL);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const project = projects?.find((p) => p.slug === slug);

  if (!project) return <Typography color="error">Project not found</Typography>;

  return (
    <div>
      <Typography variant="h3">{project.title}</Typography>
      <Typography variant="body1">{project.description}</Typography>
    </div>
  );
};

export default ProjectDetails;
