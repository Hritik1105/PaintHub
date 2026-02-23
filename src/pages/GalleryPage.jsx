import { useEffect, useMemo, useState } from 'react';
import ArtworkCard from '../components/ArtworkCard';
import { addToCart, getPaintings, seedPaintings } from '../data/store';

const categories = ['all', 'Painting', 'Sketch', 'Clay'];

export default function GalleryPage() {
  const [paintings, setPaintings] = useState([]);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    seedPaintings();
    setPaintings(getPaintings());
  }, []);

  const filtered = useMemo(() => {
    const search = query.toLowerCase();
    return paintings.filter((painting) => {
      const matchesSearch = painting.title.toLowerCase().includes(search) || painting.tag.toLowerCase().includes(search);
      const matchesCategory = activeCategory === 'all' || painting.tag === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [activeCategory, paintings, query]);

  const handleAddToCart = (artwork) => {
    addToCart({ ...artwork, cartId: Date.now() + Math.random() });
    alert('Added to cart!');
  };

  return (
    <main className="container">
      <section className="section">
        <h2 className="section-title">Gallery</h2>
        <div style={{ marginBottom: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <button
              key={category}
              className="btn-outline"
              type="button"
              onClick={() => setActiveCategory(category)}
              style={{ borderColor: activeCategory === category ? 'var(--accent2)' : undefined }}
            >
              {category}
            </button>
          ))}
        </div>
        <input
          className="input"
          placeholder="Search title or tag..."
          style={{ padding: 10, borderRadius: 8, width: '100%', marginBottom: 12 }}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="grid">
          {filtered.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} showCartAction onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>
    </main>
  );
}
