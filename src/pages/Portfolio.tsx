import useRemoteStore from "../hooks/useRemoteStore";
import ContentList from "../components/ContentList";
import ProjectCard from "../components/Project/ProjectCard";
import { Project } from "../types/Project"; // ✅ Import type

const PROJECT_URL = `https://raw.githubusercontent.com/${import.meta.env.VITE_PROJECT_GITHUB_ACCOUNT}/${import.meta.env.VITE_PROJECT_GITHUB_REPO}/refs/heads/main/${import.meta.env.VITE_PROJECT_GITHUB_FILE}`;

const Portfolio: React.FC = () => {
  const { data: projects, loading, error } = useRemoteStore<Project[]>(PROJECT_URL);

  return (
    <ContentList 
      data={projects} 
      loading={loading} 
      error={error} 
      renderItem={(project: Project) => <ProjectCard {...project} />} 
    />
  );
};

export default Portfolio;
