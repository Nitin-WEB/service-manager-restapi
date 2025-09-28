import React from "react";

export default function Home() {
  return (
    <div>
      <section className="hero-background">
        <div>
          <h1 style={{ fontSize: "3rem" }}>Welcome to Service Manager</h1>
          <p style={{ fontSize: "1.5rem", marginTop: "15px" }}>The portal for Services & Blogs</p>
        </div>
      </section>

      <div className="container" style={{ marginTop: "40px", textAlign: "center" }}>
        <h2>Our Services & Insights</h2>
        <p>Explore our range of services and read interesting blog posts!</p>
        <div className="home-service-card-area" style={{ marginTop: "30px" }}>
            <div className="home-service-card">
              <h3>Services</h3>
              <p>Manage and explore various services we offer.</p>
            </div>
            <div className="home-service-card">
              <h3>Blogs</h3>
              <p>Read our latest articles and insights.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
