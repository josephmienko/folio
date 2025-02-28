import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout"; // Ensure it's imported
import Blogroll from "./pages/Blogroll";
import ClassifiedPosts from "./pages/ClassifiedPosts";
import Article from "./pages/Article";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
// Removed Switch import as it's not needed

export default function AppRouter() {
  return (
    <Router>
      <MainLayout> {/* ✅ Wrap everything inside MainLayout */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />

          {/* Blog Pages */}
          <Route path="/blog" element={<Blogroll />} />
          <Route path="/blog/:category" element={<ClassifiedPosts />} />
          <Route path="/blog/:category/:slug" element={<Article />} />

          {/* Redirect "All" and "all-categories" to Blogroll */}
          <Route path="/blog/all" element={<Navigate replace to="/blog" />} />
          <Route path="/blog/all-categories" element={<Navigate replace to="/blog" />} />

          {/* 404 - Page Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
