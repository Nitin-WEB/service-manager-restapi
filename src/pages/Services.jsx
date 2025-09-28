import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import ServiceCard from "../components/ServiceCard";

export default function Services() {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const [services, setServices] = useState([]);
  const [allCategories, setAllCategories] = useState([]); // <-- store all cats
  const [filterCategory, setFilterCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PROD;
      
  // Fetch services + categories from WP REST API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services
        const res = await fetch(`${API_URL}/services?per_page=100&_embed`);
        const data = await res.json();

        const normalized = data.map((s) => ({
          id: s.id,
          title: s.title.rendered,
          categories: s._embedded?.["wp:term"]?.[0]?.map((c) => c.name) || [],
          price: Number(s.meta?._service_price) || 0,
          image: s._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
        }));
        setServices(normalized);

        // Fetch all categories
        const catsRes = await fetch(`${API_URL}/service_category?per_page=100`);
        const catsData = await catsRes.json();
        setAllCategories(catsData.map((c) => c.name)); // only store names
      } catch (err) {
        console.error("Error fetching services/categories:", err);
      }
    };
    fetchData();
  }, []);

  // Apply filters
  const filteredServices = services.filter((s) => {
    const matchesCategory = filterCategory
      ? s.categories.includes(filterCategory)
      : true;
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMin = minPrice !== "" ? s.price >= Number(minPrice) : true;
    const matchesMax = maxPrice !== "" ? s.price <= Number(maxPrice) : true;
    return matchesCategory && matchesSearch && matchesMin && matchesMax;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const currentItems = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, filteredServices]);

  return (
    <div className="container page-container">
      <h1 style={{ marginBottom: "20px" }}>Our Services</h1>

      {/* Filter Section */}
      <div style={{ marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", flex: "1 1 200px" }}
        />
        <select
          onChange={(e) => setFilterCategory(e.target.value)}
          value={filterCategory}
          style={{ padding: "8px", flex: "1 1 160px" }}
        >
          <option value="">All Categories</option>
          {allCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          style={{ padding: "8px", width: "120px" }}
          min="0"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ padding: "8px", width: "120px" }}
          min="0"
        />
      </div>

      {/* Services Grid */}
      <div className="row">
        {currentItems.length > 0 ? (
          currentItems.map((service) => (
            <div className="col" key={service.id}>
              <ServiceCard {...service} />
            </div>
          ))
        ) : (
          <p>No services found for the applied filters.</p>
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
