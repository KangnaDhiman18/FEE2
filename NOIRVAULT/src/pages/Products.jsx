import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import Toast from "../components/Toast";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [toast, setToast] = useState("");
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <section className="catalog-page">
      <Toast message={toast} onClose={() => setToast("")} />
      <div className="catalog-hero">
        <div className="eyebrow"><span className="eyebrow-dot" /> THE NOIRVAULT COLLECTION</div>
        <h1>Find your <em>next thing.</em></h1>
        <p>Eight considered essentials. Zero filler. Your everyday, upgraded.</p>
        <div className="catalog-count"><span>0{products.length}</span> OBJECTS IN THE EDIT</div>
      </div>
      <div className="catalog-controls">
        <div className="search-field"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search objects, categories..." aria-label="Search products" />{search && <button onClick={() => setSearch("")} aria-label="Clear search"><X size={15} /></button>}</div>
        <div className="filter-label"><SlidersHorizontal size={15} /> FILTER</div>
        <div className="category-filters">
          {categories.map((item) => <button key={item} className={`filter-chip${category === item ? " selected" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </div>
      <div className="results-line"><span>{filteredProducts.length} OBJECT{filteredProducts.length !== 1 ? "S" : ""} FOUND</span><span>DESIGNED TO STAND OUT <span className="results-star">✳</span></span></div>
      {filteredProducts.length ? (
        <div className="product-grid catalog-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} onAdded={setToast} />)}</div>
      ) : (
        <div className="no-results"><span>⌕</span><h2>Nothing in this orbit.</h2><p>Try another search or reset the category filter.</p><button className="button-primary" onClick={() => { setSearch(""); setCategory("All"); }}>Reset filters</button></div>
      )}
    </section>
  );
}
