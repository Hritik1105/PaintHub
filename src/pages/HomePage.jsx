import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ArtworkCard from '../components/ArtworkCard';
import { addToCart, getPaintings, seedPaintings } from '../data/store';

export default function HomePage() {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    seedPaintings();
    setPaintings(getPaintings().slice(0, 6));
  }, []);

  const handleAddToCart = (artwork) => {
    addToCart({ ...artwork, cartId: Date.now() + Math.random() });
    alert('Added to cart!');
  };

  return (
    <>
      <section className="hero container">
        <div className="hero-card">
          <h1>
            Welcome to{' '}
            <span style={{ background: 'linear-gradient(90deg,var(--accent1),var(--accent2))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              PaintHub
            </span>{' '}
            — A Colorful World of Art
          </h1>
          <p>Sell, discover and order original paintings, sketches and clay art. Join artists across the country and showcase your creativity.</p>
          <div className="hero-ctas">
            <Link className="btn" to="/upload">
              Start Selling
            </Link>
            <Link className="btn-outline" to="/gallery">
              Explore Gallery
            </Link>
          </div>
          <div style={{ marginTop: 18, color: 'var(--muted)' }}>Categories: Painting • Sketch • Clay • DIY</div>
        </div>
        <div className="hero-art">
          <img src="https://i.pinimg.com/1200x/07/08/2f/07082fe5d80b84b78aa8fbae80de3566.jpg" alt="Artist painting" />
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Featured Artworks</h2>
        <div className="grid">
          {paintings.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} showCartAction onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Explore Categories</h2>
        <div className="category-grid">
          <div className="cat-card"><img src="https://i.pinimg.com/736x/dc/6d/e1/dc6de151cff72135e4356c55254eaf4e.jpg" alt="Paintings" /><h3>Paintings</h3></div>
          <div className="cat-card"><img src="https://i.pinimg.com/736x/38/76/ed/3876edb5205d79fdc43d37face2a6621.jpg" alt="Sketch" /><h3>Sketch Paintings</h3></div>
          <div className="cat-card"><img src="https://i.pinimg.com/736x/ca/3c/10/ca3c1040e70df745f9dcc4e3b3d246aa.jpg" alt="Clay" /><h3>Clay Art</h3></div>
          <div className="cat-card"><img src="https://i.pinimg.com/736x/c1/0b/a6/c10ba6523169b07e08229ad86500ac09.jpg" alt="DIY Art" /><h3>DIY Art</h3></div>
          <div className="cat-card"><img src="https://i.pinimg.com/1200x/0e/42/f7/0e42f7034fb73e5c67f144447cdd93eb.jpg" alt="Texture Art" /><h3>Texture Art</h3></div>
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Why PaintHub?</h2>
        <div className="features">
          <div className="feature"><strong>Sell Easily</strong><p className="muted">Upload your art and set a price — buyers find you.</p></div>
          <div className="feature"><strong>Custom Orders</strong><p className="muted">Request custom paintings or clay pieces via the Order page.</p></div>
          <div className="feature"><strong>Creative Community</strong><p className="muted">Join artists and collectors in a colorful marketplace.</p></div>
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Testimonials</h2>
        <div className="testimonial-grid">
          <div className="testimonial">"I sold my first painting in a week — amazing!"<div style={{ marginTop: 8, fontWeight: 700 }}>— Hritik Kumar</div></div>
          <div className="testimonial">"Custom order was delivered on time and perfect."<div style={{ marginTop: 8, fontWeight: 700 }}>—Ishika Yadav</div></div>
          <div className="testimonial">"Perfect platform for clay DIY sellers."<div style={{ marginTop: 8, fontWeight: 700 }}>— Anushka Sahu</div></div>
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Art Tips & DIY</h2>
        <div className="blog-grid">
          <div className="blog-card"><img src="https://i.pinimg.com/1200x/a3/5d/db/a35ddbdecb099db916cddbb926af1f60.jpg" alt="" /><h3 style={{ margin: '8px 0' }}>5 Easy Sketch Ideas</h3><p className="muted">Simple sketch prompts for beginners.</p></div>
          <div className="blog-card"><img src="https://i.pinimg.com/1200x/62/e0/fe/62e0fec3f6fbd964c358e4ffbab2f824.jpg" alt="" /><h3 style={{ margin: '8px 0' }}>Clay DIY Guide</h3><p className="muted">Make beautiful clay pieces with minimal tools.</p></div>
          <div className="blog-card"><img src="https://i.pinimg.com/1200x/98/27/f8/9827f87b24f48da5637c7ce4c7bbcf81.jpg" alt="" /><h3 style={{ margin: '8px 0' }}>Choosing Canvas</h3><p className="muted">Which canvas suits your painting style.</p></div>
        </div>
      </section>

      <section className="section container">
        <div className="cta">
          <h3>Ready to show your art to the world?</h3>
          <Link className="btn" to="/upload">
            Create your listing
          </Link>
        </div>
      </section>

      <section className="section container newsletter" style={{ justifyContent: 'center' }}>
        <input type="email" placeholder="Enter your email to get tips & offers" />
        <button className="btn" type="button">
          Subscribe
        </button>
      </section>
    </>
  );
}
