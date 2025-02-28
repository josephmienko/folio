import * as React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

interface BreadcrumbsProps {
  segments?: string[]; // ✅ Explicitly define segments as optional
}

export default function BlogBreadcrumbs({ segments }: BreadcrumbsProps) {
  const location = useLocation();
  const pathSegments = segments || location.pathname.split("/").filter((segment) => segment);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {/* Home Link */}
      <Link component={RouterLink} underline="hover" color="inherit" to="/">
        Home
      </Link>

      {/* Blog Link (Only add once) */}
      {pathSegments.includes("blog") && (
        <Link component={RouterLink} underline="hover" color="inherit" to="/blog">
          Blog
        </Link>
      )}

      {/* Category or Article */}
      {pathSegments
        .filter((segment, index) => !(segment === "blog" && index > 0)) // ✅ Remove duplicate "blog"
        .map((segment, index) => {
          const pathTo = `/${pathSegments.slice(0, index + 1).join("/")}`;
          return index === pathSegments.length - 1 ? (
            <Typography key={pathTo} color="text.primary">
              {decodeURIComponent(segment).replace(/-/g, " ")}
            </Typography>
          ) : (
            <Link key={pathTo} component={RouterLink} underline="hover" color="inherit" to={pathTo}>
              {decodeURIComponent(segment).replace(/-/g, " ")}
            </Link>
          );
        })}
    </Breadcrumbs>
  );
}
