interface ImportMetaEnv {
    readonly VITE_PROJECT_GITHUB_ACCOUNT: string;
    readonly VITE_PROJECT_GITHUB_REPO: string;
    readonly VITE_BLOG_GITHUB_FILE: string;
    readonly VITE_PROJECT_GITHUB_FILE: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
