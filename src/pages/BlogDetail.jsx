import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PROD;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_URL}/posts/${id}?_embed`);
        const data = await res.json();

        const normalized = {
          id: data.id,
          title: data.title.rendered,
          content: data.content.rendered,
          excerpt: data.excerpt.rendered,
          image: data._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
          categories: data._embedded?.["wp:term"]?.[0]?.map((c) => c.name) || [],
          tags: data._embedded?.["wp:term"]?.[1]?.map((t) => t.name) || [],
        };

        setBlog(normalized);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, API_URL]);

  if (loading) {
    return (
      <div className="container page-container">
        <p>Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container page-container">
        <h2>Blog not found</h2>
        <Link to="/blog">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="container page-container">
      <h1>{blog.title}</h1>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          style={{ width: "100%", margin: "20px 0", borderRadius: "8px" }}
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: blog.content }} />

      <Link
        to="/blog"
        style={{ display: "inline-block", marginTop: "20px", color: "#1e3a8a" }}
      >
        ← Back to Blogs
      </Link>
    </div>
  );
}
