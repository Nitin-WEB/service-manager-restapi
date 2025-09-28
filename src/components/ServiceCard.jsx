import React from "react";
import "./ServiceCard.css";

export default function ServiceCard({ title, description, price, image }) {
  return (
    <div className="service-card">
      <img src={image} alt={title} className="service-img" />
      <div className="service-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <strong>₹{price}</strong>
      </div>
    </div>
  );
}
