import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <main className="container">
      <section className="section about-intro">
        <h2 className="section-title">About PaintHub</h2>
        <p>
          PaintHub is your creative marketplace where art comes alive. From vibrant paintings to delicate clay crafts, we connect
          passionate artists with art lovers around the world. Our platform is built to showcase creativity while making art accessible to everyone.
        </p>
      </section>

      <section className="section mission">
        <h2 className="section-title">Our Mission</h2>
        <p>At PaintHub, we believe that every artist deserves a platform to shine.</p>
        <p>Our mission is to empower creators by giving them a digital space to showcase and sell their work while art lovers discover one-of-a-kind pieces.</p>
      </section>

      <section className="section">
        <h2 className="section-title">Why Choose PaintHub?</h2>
        <div className="features">
          <div className="feature"><h3>🌟 Unique Artworks</h3><p>Discover original pieces you won’t find anywhere else.</p></div>
          <div className="feature"><h3>💎 Support Artists</h3><p>Every purchase directly supports independent artists.</p></div>
          <div className="feature"><h3>⚡ Easy Shopping</h3><p>Seamless browsing, cart, and checkout experience.</p></div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">What People Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial">"PaintHub made it so easy to buy authentic art. I love my new painting!"</div>
          <div className="testimonial">"As an artist, I finally have a platform that values my work."</div>
          <div className="testimonial">"The neon-dark theme is stunning. Shopping here feels futuristic."</div>
        </div>
      </section>

      <section className="section cta">
        <h2>Ready to Explore PaintHub?</h2>
        <p>Join our community of artists and art lovers today.</p>
        <Link to="/gallery" className="btn">
          Explore Gallery
        </Link>
      </section>
    </main>
  );
}
