import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";

export default function Blog() {
  const itemsPerPage = 6;
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PROD;


  useEffect(() => {
    // Fetch blogs
    fetch(`${API_URL}/posts?per_page=100&_embed`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((post) => ({
          id: post.id,
          title: post.title.rendered,
          excerpt: post.excerpt.rendered,
          content: post.content.rendered,
          link: post.link,
          image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://via.placeholder.com/600x400?text=No+Image",
          categories: post._embedded?.["wp:term"]?.[0]?.map((c) => c.name) || [],
          tags: post._embedded?.["wp:term"]?.[1]?.map((t) => t.name) || [],
        }));
        setBlogs(formatted);
      });

    // Fetch categories
    fetch(`${API_URL}/categories?per_page=100`)
      .then((res) => res.json())
      .then((data) => setCategories(data.map((c) => c.name)));

    // Fetch tags
    fetch(`${API_URL}/tags?per_page=100`)
      .then((res) => res.json())
      .then((data) => setTags(data.map((t) => t.name)));
  }, []);

  // Filtering logic
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? b.categories.includes(filterCategory) : true;
    const matchesTag = filterTag ? b.tags.includes(filterTag) : true;
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentItems = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page + scroll on filter change
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchTerm, filterCategory, filterTag]);

  return (
    <div className="container page-container">
      <h1 style={{ marginBottom: "20px" }}>Blog Posts</h1>

      {/* Filters */}
      <div style={{ marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", flex: "1 1 200px" }}
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{ padding: "8px", flex: "1 1 160px" }}
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          style={{ padding: "8px", flex: "1 1 160px" }}
        >
          <option value="">All Tags</option>
          {tags.map((tag, i) => (
            <option key={i} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Blogs Grid */}
      <div className="row">
        {currentItems.length > 0 ? (
          currentItems.map((blog) => (
            <div className="col" key={blog.id}>
            <BlogCard key={blog.id} {...blog} />
            </div>
          ))
        ) : (
          <p>No blogs found for the applied filters.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
