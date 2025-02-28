export interface Projects {
  projects: Project[];
}


export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
    slug?: string;
  }
  
