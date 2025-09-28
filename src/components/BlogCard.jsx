import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard({ id, title, excerpt, image, categories = [], tags = [] }) {
  return (
    <div className="blog-card">
      <img src={image} alt={title} className="blog-image" />

      <div className="blog-content">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="blog-categories">
            {categories.map((cat, i) => (
              <span key={i} className="badge category-badge">
                {cat}
              </span>
            ))}
          </div>
        )}

        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: excerpt }}></p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="blog-tags">
            {tags.map((tag, i) => (
              <span key={i} className="badge tag-badge">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <Link to={`/blog/${id}`} className="read-more-link">
          <button className="read-btn">Read More</button>
        </Link>
      </div>
    </div>
  );
}
