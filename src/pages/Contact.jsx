import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const recaptchaRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please verify you are not a robot!");
      return;
    }

    console.log("Form submitted:", formData, "reCAPTCHA value:", captchaValue);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    // Reset reCAPTCHA
    recaptchaRef.current.reset();
    setCaptchaValue(null);
  };

  return (
    <div className="container page-container">
      <h1>Contact Us</h1>

      {submitted && <p style={{ color: "green" }}>Form submitted successfully!</p>}

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px", marginTop: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", minHeight: "100px" }}
          />
        </div>

        {/* reCAPTCHA */}
        <div style={{ marginBottom: "15px" }}>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(value) => setCaptchaValue(value)}
            ref={recaptchaRef}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#1e3a8a",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
